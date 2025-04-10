import { QueryExecResult } from "sql.js";
import Sqlite, { CustomQueryError, arrayToCSV } from "./sqlite";

import type { WorkerEvent } from "@/types";

// Global variable to store the database instance
let instance: Sqlite | null = null;

self.onmessage = async (event: MessageEvent<WorkerEvent>) => {
  const { action, payload } = event.data;

  // Create a new database instance
  if (action === "init") {
    instance = await Sqlite.create();

    // Send the initialization response to the main thread
    self.postMessage({
      action: "initComplete",
      payload: {
        tableSchema: instance.tablesSchema,
        indexSchema: instance.indexesSchema,
        currentTable: instance.firstTable
      }
    });

    return;
  }

  // Check if the database instance is initialized
  if (instance === null) {
    // Send the error response to the main thread
    self.postMessage({
      action: "queryError",
      payload: {
        error: {
          message: "Database is not initialized",
          isCustomQueryError: false
        }
      }
    });

    return;
  }

  try {
    // Updates the instance from user-uploaded file
    switch (action) {
      case "openFile": {
        instance = await Sqlite.open(new Uint8Array(payload.file));

        // Send the initialization response to the main thread
        self.postMessage({
          action: "initComplete",
          payload: {
            tableSchema: instance.tablesSchema,
            indexSchema: instance.indexesSchema,
            currentTable: instance.firstTable
          }
        });

        break;
      }
      // Refreshes the current table data
      // Gets the table data for the current table/table-options
      case "refresh":
      case "getTableData": {
        const { currentTable, limit, offset, filters, sorters } = payload;

        const [results, maxSize] = instance.getTableData(
          currentTable,
          limit,
          offset,
          filters,
          sorters
        );

        // Send the refresh response to the main thread
        self.postMessage({
          action: "queryComplete",
          payload: { results, maxSize }
        });

        break;
      }
      // Executes a custom query
      // User for user-typed queries
      case "exec": {
        try {
          const { query, currentTable, limit, offset, filters, sorters } =
            payload;

          const [results, doTablesChanged] = instance.exec(query);

          // Check if tables changed (user created/deleted/altered table)
          if (doTablesChanged) {
            // Send the update response to the main thread
            self.postMessage({
              action: "updateInstance",
              payload: {
                tableSchema: instance.tablesSchema,
                indexSchema: instance.indexesSchema
              }
            });
          } else {
            // Check if custom query returned results
            // To render the table data
            if (results.length > 0) {
              // Send the custom query response to the main thread
              self.postMessage({
                action: "customQueryComplete",
                payload: { results }
              });
            }
            // If not return the table data
            // Insert, Update, Delete, ...
            else {
              const [results, maxSize] = instance.getTableData(
                currentTable,
                limit,
                offset,
                filters,
                sorters
              );

              // Send the table data response to the main thread
              self.postMessage({
                action: "queryComplete",
                payload: { results, maxSize }
              });
            }
          }
        } catch (error) {
          // If the query throws an error
          // User for error messages
          if (error instanceof Error) {
            throw new CustomQueryError(error.message);
          }
        }

        break;
      }
      // Downloads the database as bytes
      case "download": {
        const bytes = instance.download();

        // Send the download(bytes) response to the main thread
        self.postMessage({
          action: "downloadComplete",
          payload: { bytes }
        });

        break;
      }
      // Updates the values of a row in a table
      case "update": {
        const { table, columns, values, primaryValue } = payload;

        instance.update(table, columns, values, primaryValue);

        // Send the update response to the main thread
        self.postMessage({
          action: "updateComplete",
          payload: { type: "updated" }
        });

        break;
      }
      // Deletes a row from a table
      case "delete": {
        const { table, primaryValue } = payload;

        instance.delete(table, primaryValue);

        // Send the delete response to the main thread
        self.postMessage({
          action: "updateComplete",
          payload: { type: "deleted" }
        });

        break;
      }
      // Inserts a row into a table
      case "insert": {
        const { table, columns, values } = payload;

        instance.insert(table, columns, values);

        // Send the insert response to the main thread
        self.postMessage({
          action: "insertComplete"
        });

        break;
      }
      // Exports as CSV
      // It have 2 types of exports (table, current data)
      // Current data is the current page of data
      case "export": {
        const {
          table,
          filters,
          sorters,
          limit,
          offset,
          exportType,
          customQuery
        } = payload;

        let results: QueryExecResult[];
        if (exportType === "table") {
          results = instance.export({ table });
        } else if (exportType === "current") {
          results = instance.export({ table, limit, offset, filters, sorters });
        } else if (exportType === "custom") {
          results = instance.export({ customQuery });
        } else {
          throw new Error("Unknown export type");
        }

        const csvResults = arrayToCSV(results[0].columns, results[0].values);

        // Send the export response to the main thread
        self.postMessage({
          action: "exportComplete",
          payload: { results: csvResults }
        });

        break;
      }
      // Other unhandled actions
      default:
        console.warn("Unknown worker action:", action);
    }
  } catch (error) {
    if (error instanceof Error) {
      // Send the error response to the main thread
      self.postMessage({
        action: "queryError",
        payload: {
          error: {
            message: error.message,
            isCustomQueryError: error instanceof CustomQueryError
          }
        }
      });
    } else {
      // Send the error response to the main thread
      self.postMessage({
        action: "queryError",
        payload: {
          error: { message: "Unknown error", isCustomQueryError: false }
        }
      });
    }
  }
};
