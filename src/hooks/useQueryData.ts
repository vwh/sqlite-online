import { useState, useEffect, useCallback, useMemo } from "react";
import useSQLiteStore from "@/store/useSQLiteStore";

import { mapQueryResults } from "@/lib/sqlite";
import type { QueryExecResult } from "sql.js";
import type { TableRow } from "@/types";

export function useQueryData(
  tableName: string,
  rowsPerPage: number,
  page: number
) {
  const {
    db,
    setQueryError,
    setIsCustomQuery,
    query,
    unShiftToQueryHistory,
    customQuery,
    setCustomQuery,
    filters,
    totalRows,
    setTotalRows,
    orderBy,
    selectedTable,
    tables
  } = useSQLiteStore();

  const [data, setData] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isQueryLoading, setIsQueryLoading] = useState(true);

  const cleanFilters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== "")
    );
  }, [filters]);

  const filterQuery = useMemo(() => {
    return Object.entries(cleanFilters)
      .map(([key, value]) => `LOWER(${key}) LIKE LOWER('%${value}%')`)
      .join(" AND ");
  }, [cleanFilters]);

  // Fetch data effect
  useEffect(() => {
    if (!db || !tableName) return;

    const fetchData = async () => {
      setIsQueryLoading(true);
      try {
        // Fetch column info
        const columnInfoQuery = `PRAGMA table_info("${tableName}");`;
        const columnInfoResult: QueryExecResult[] = query(columnInfoQuery);
        const columnInfo = columnInfoResult[0].values.map((row) => ({
          name: row[1] as string,
          type: row[2] as string
        }));

        // Optimize blob columns
        const columnSelects = columnInfo
          .map((col) =>
            col.type.toUpperCase() === "BLOB"
              ? `hex(${col.name}) as ${col.name}`
              : col.name
          )
          .join(", ");

        // Count query
        const countQueryString = `SELECT COUNT(*) as count FROM "${tableName}"${
          filterQuery ? ` WHERE ${filterQuery}` : ""
        }`;
        const countResult: QueryExecResult[] = query(countQueryString);
        const newTotalRows = countResult[0].values[0][0] as number;

        setTotalRows(newTotalRows);

        // Main query
        let queryString = `SELECT\n\t${columnSelects}\nFROM "${tableName}"`;
        if (filterQuery) queryString += `\nWHERE ${filterQuery}`;
        if (orderBy.column)
          queryString += `\nORDER BY "${orderBy.column}" ${orderBy.direction}`;
        queryString += `\nLIMIT ${rowsPerPage} OFFSET ${page};`;

        const tableResult: QueryExecResult[] = query(queryString);
        const { data: newData, columns: newColumns } =
          mapQueryResults(tableResult);

        setColumns(newColumns);
        setData(newData);
        setQueryError(null);
        setCustomQuery(queryString);
        unShiftToQueryHistory(queryString);
      } catch (error) {
        if (error instanceof Error) setQueryError(error.message);
      } finally {
        setIsQueryLoading(false);
      }
    };

    fetchData();
  }, [
    db,
    tableName,
    page,
    rowsPerPage,
    filterQuery,
    orderBy,
    query,
    setQueryError,
    setCustomQuery,
    unShiftToQueryHistory,
    setTotalRows
  ]);

  const handleCustomQuery = useCallback(() => {
    if (customQuery.trim() === "") {
      setQueryError(null);
      return;
    }

    setIsQueryLoading(true);
    try {
      const tableName = tables[Number.parseInt(selectedTable)].name;
      const customResult: QueryExecResult[] = query(
        customQuery.replace("@", `"${tableName}"`)
      );
      const { data: newData, columns: newColumns } =
        mapQueryResults(customResult);

      setColumns(newColumns);
      setData(newData);
      setIsCustomQuery(true);
      setQueryError(null);
    } catch (error) {
      if (error instanceof Error) setQueryError(error.message);
    } finally {
      setIsQueryLoading(false);
    }
  }, [
    customQuery,
    query,
    setQueryError,
    setIsCustomQuery,
    tables,
    selectedTable
  ]);

  return {
    data,
    columns,
    customQuery,
    setCustomQuery,
    isQueryLoading,
    handleCustomQuery,
    totalRows
  };
}
