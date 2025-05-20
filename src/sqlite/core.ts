import initSqlJs from "sql.js";

import DEMO_DB from "./demo-db";

import type { Database, SqlJsStatic, SqlValue } from "sql.js";
import type {
  Filters,
  IndexSchema,
  Sorters,
  TableSchema,
  TableSchemaRow
} from "@/types";

export default class Sqlite {
  // Static SQL.js instance
  static readonly sqlJsStatic?: SqlJsStatic;
  // Database instance
  private readonly db: Database;

  public firstTable: string | null = null;
  public tablesSchema: TableSchema = {};
  public indexesSchema: IndexSchema[] = [];

  private constructor(db: Database, isFile = false) {
    this.db = db;
    // Check if user is opening a file or creating a new database.
    if (!isFile) {
      // The demo database
      this.db.exec(DEMO_DB);
    }
    this.getDatabaseSchema();
  }

  // Initialize SQL.js
  private static async initSQLjs(): Promise<SqlJsStatic> {
    if (Sqlite.sqlJsStatic) return Sqlite.sqlJsStatic;
    return await initSqlJs({
      locateFile: (file) => `/wasm/${file}`
    });
  }

  // Initialize a new database
  public static async create(): Promise<Sqlite> {
    const SQL = await Sqlite.initSQLjs();
    const db = new SQL.Database();
    return new Sqlite(db, false);
  }

  // Initialize a new database from a file
  public static async open(file: Uint8Array): Promise<Sqlite> {
    const SQL = await Sqlite.initSQLjs();
    const db = new SQL.Database(file);
    return new Sqlite(db, true);
  }

  // Execute a SQL statement
  public exec(sql: string) {
    sql = sql.replace(/COLLATE\s+unicase/gi, "COLLATE NOCASE");

    const results = this.db.exec(sql);
    const upperSql = sql.toUpperCase();
    // If the statement requires schema updates
    let doTablesChanged = false;

    // Update tables if the SQL statement is a CREATE TABLE statement.
    if (isStructureChangeable(upperSql)) {
      this.getDatabaseSchema(); // Update schema after creating a new table.
      doTablesChanged = true;
    }

    return [results, doTablesChanged] as const;
  }

  // Return the database as bytes
  // Used for downloading the database
  public download() {
    return this.db.export();
  }

  // Get the information of a table
  // This includes the columns, primary key, default values, ...
  private getTableInfo(tableName: string) {
    const [pragmaTableInfoResults] = this.exec(
      `PRAGMA table_info("${tableName}")`
    );
    const [pragmaForeignKeysResults] = this.exec(
      `PRAGMA foreign_key_list("${tableName}")`
    );

    const foreignKeys: Record<string, boolean> = {};
    if (pragmaForeignKeysResults.length > 0) {
      for (const row of pragmaForeignKeysResults[0].values) {
        foreignKeys[row[3] as string] = true; // Get the 'from'
      }
    }

    let primaryKey = "_rowid_";
    const tableSchema: TableSchemaRow[] = [];
    if (pragmaTableInfoResults.length > 0) {
      for (const row of pragmaTableInfoResults[0].values) {
        const [cid, name, type, notnull, dflt_value, pk] = row;
        if (pk === 1) primaryKey = name as string;
        tableSchema.push({
          name: (name as string) || "Unknown",
          cid: cid as number,
          type: (type as string) || "Unknown",
          dflt_value: dflt_value as string,
          IsNullable: (notnull as number) === 0,
          isPrimaryKey: (pk as number) === 1,
          isForeignKey: foreignKeys[name as string] ?? false
        });
      }
    } else {
      console.error("No table info found");
    }

    return [tableSchema, primaryKey] as const;
  }

  // Get the schema of the database
  // This includes tables, indexes, and foreign keys
  private getDatabaseSchema() {
    // Reset the schema
    this.tablesSchema = {};
    this.indexesSchema = [];
    this.firstTable = null;

    const [results] = this.exec(
      "SELECT type, name, tbl_name FROM sqlite_master WHERE name != 'sqlite_sequence'"
    );

    if (results.length === 0) return;

    for (const row of results[0].values) {
      const [type, name, tableName] = row;
      if (type === "table") {
        const [tableSchema, primaryKey] = this.getTableInfo(
          tableName as string
        );
        this.tablesSchema[tableName as string] = {
          schema: tableSchema,
          primaryKey
        };
      } else if (type === "index") {
        this.indexesSchema.push({
          name: name as string,
          tableName: tableName as string
        });
      }
    }

    this.firstTable = Object.keys(this.tablesSchema)[0];
  }

  // Get the max size of the requested table
  // Used for pagination
  private getMaxSizeOfTable(tableName: string, filters?: Filters) {
    const [results] = this.exec(`
      SELECT COUNT(*) FROM "${tableName}" 
      ${buildWhereClause(filters)}
    `);

    if (results.length === 0) return 0;

    return Math.ceil(results[0].values[0][0] as number);
  }

  // Get the data for the requested table
  // Applies filters and sorters to the data
  public getTableData(
    table: string,
    limit: number,
    offset: number,
    filters?: Filters,
    sorters?: Sorters
  ) {
    const [results] = this.exec(`
      SELECT ${this.tablesSchema[table].primaryKey}, * FROM "${table}" 
      ${buildWhereClause(filters)} 
      ${buildOrderByClause(sorters)} 
      LIMIT ${limit} OFFSET ${offset}
    `);

    // If the table is empty return an empty array
    if (results.length === 0) return [];

    const maxSize = this.getMaxSizeOfTable(table, filters);
    return [results, maxSize] as const;
  }

  // Get the primary key of a table
  private getPrimaryKey(table: string): string {
    const tableSchema = this.tablesSchema[table];
    if (!tableSchema) {
      throw new Error(`Table "${table}" not found.`);
    }

    return tableSchema.primaryKey;
  }

  // Update a row in a table
  public update(
    table: string,
    columns: string[],
    values: SqlValue[],
    id: SqlValue
  ) {
    try {
      const primaryKey = this.getPrimaryKey(table);

      // Construct the SET clause
      const setClause = columns.map((column) => `"${column}" = ?`).join(", ");

      // The WHERE clause is based on the primary key
      const query = `UPDATE "${table}" SET ${setClause} WHERE "${primaryKey}" = ?`;

      // Update values make '' -> NULL
      values = values.map((value) => (value === "" ? null : value));

      // Prepare and execute the query
      const stmt = this.db.prepare(query);
      stmt.run([...values, id]); // Primary key is the last parameter
      stmt.free();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error while updating table ${table}: ${error.message}`
        );
      } else {
        throw new Error(`Error while updating table ${table}: ${error}`);
      }
    }
  }

  // Delete a row from a table
  public delete(table: string, id: SqlValue) {
    try {
      const primaryKey = this.getPrimaryKey(table);
      const query = `DELETE FROM "${table}" WHERE "${primaryKey}" = ?`;

      const stmt = this.db.prepare(query);
      stmt.run([id]);
      stmt.free();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error while deleting from table ${table}: ${error.message}`
        );
      } else {
        throw new Error(`Error while deleting from table ${table}: ${error}`);
      }
    }
  }

  // Insert a row into a table
  public insert(table: string, columns: string[], values: SqlValue[]) {
    try {
      // Filter out empty values and their corresponding columns
      const filteredEntries = columns
        .map((col, index) => ({ col, val: values[index] }))
        .filter((entry) => entry.val !== "");

      // If there are no valid columns/values, avoid executing an empty INSERT
      if (filteredEntries.length === 0) {
        throw new Error("No valid values provided for insertion.");
      }

      const filteredColumns = filteredEntries.map((entry) => entry.col);
      const filteredValues = filteredEntries.map((entry) => entry.val);

      const query = `INSERT INTO "${table}" (${filteredColumns.join(", ")}) VALUES (${filteredColumns.map(() => "?").join(", ")})`;

      const stmt = this.db.prepare(query);
      stmt.run([...filteredValues]);
      stmt.free();
    } catch (error) {
      throw new Error(`Error while inserting into table ${table}: ${error}`);
    }
  }

  // Used for exporting data as CSV
  public export({
    table,
    offset,
    limit,
    filters,
    sorters,
    customQuery
  }: {
    table?: string;
    offset?: number;
    limit?: number;
    filters?: Filters;
    sorters?: Sorters;
    customQuery?: string;
  }) {
    let query = customQuery;
    if (!query) {
      query = `SELECT * FROM "${table}" ${buildWhereClause(
        filters
      )} ${buildOrderByClause(sorters)}`;
      if (offset && limit) query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const [results] = this.exec(query);
    return results;
  }
}

// Check if the SQL statement is a structure changeable statement
function isStructureChangeable(sql: string) {
  const match = RegExp(/^\s*(CREATE|DROP|ALTER)\s/i).exec(sql);
  return match !== null;
}

// Build the WHERE clause for a SQL statement
function buildWhereClause(filters?: Filters) {
  if (!filters) return "";

  const filtersArray = Object.entries(filters)
    .map(([column, value]) => `${column} LIKE '%${value}%' ESCAPE '\\'`)
    .join(" AND ");
  return `WHERE ${filtersArray}`;
}

// Build the ORDER BY clause for a SQL statement
function buildOrderByClause(sorters?: Sorters) {
  if (!sorters) return "";

  const sortersArray = Object.entries(sorters)
    .map(([column, order]) => `${column} ${order}`)
    .join(", ");
  return `ORDER BY ${sortersArray}`;
}

// Convert an array of objects to a CSV string
export function arrayToCSV(columns: string[], rows: SqlValue[][]) {
  const header = columns.map((col) => `"${col}"`).join(",");
  const csvRows = rows.map((row) =>
    columns.map((col) => `"${row[columns.indexOf(col)]}"`).join(",")
  );
  return [header, ...csvRows].join("\n");
}

export class CustomQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomQueryError";
  }
}
