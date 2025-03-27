import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState
} from "react";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import { usePanelStore } from "@/store/usePanelStore";
import { usePanelManager } from "./PanelProvider";

import { toast } from "sonner";

import type {
  CustomQueryCompleteResponse,
  DownloadCompleteResponse,
  EditTypes,
  ExportCompleteResponse,
  exportTypes,
  InitCompleteResponse,
  QueryCompleteResponse,
  QueryErrorResponse,
  Sorters,
  UpdateCompleteResponse,
  UpdateInstanceResponse,
  WorkerResponseEvent
} from "@/types";

interface DatabaseWorkerContextProps {
  workerRef: React.MutableRefObject<Worker | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownload: () => void;
  handleTableChange: (selectedTable: string) => void;
  handleQueryFilter: (column: string, value: string) => void;
  handleQuerySorter: (column: string) => void;
  handlePageChange: (type: "next" | "prev" | "first" | "last" | number) => void;
  handleExport: (exportType: exportTypes) => void;
  handleQueryExecute: () => void;
  handleEditSubmit: (type: EditTypes) => void;
}

const DatabaseWorkerContext = createContext<
  DatabaseWorkerContextProps | undefined
>(undefined);

interface DatabaseWorkerProviderProps {
  children: React.ReactNode;
}

export const DatabaseWorkerProvider = ({
  children
}: DatabaseWorkerProviderProps) => {
  const workerRef = useRef<Worker | null>(null);

  // Database Store
  const setTablesSchema = useDatabaseStore((state) => state.setTablesSchema);
  const setIndexesSchema = useDatabaseStore((state) => state.setIndexesSchema);
  const setCurrentTable = useDatabaseStore((state) => state.setCurrentTable);
  const setData = useDatabaseStore((state) => state.setData);
  const setColumns = useDatabaseStore((state) => state.setColumns);
  const setMaxSize = useDatabaseStore((state) => state.setMaxSize);
  const setIsDatabaseLoading = useDatabaseStore(
    (state) => state.setIsDatabaseLoading
  );
  const setIsDataLoading = useDatabaseStore((state) => state.setIsDataLoading);
  const setErrorMessage = useDatabaseStore((state) => state.setErrorMessage);
  const filters = useDatabaseStore((state) => state.filters);
  const sorters = useDatabaseStore((state) => state.sorters);
  const limit = useDatabaseStore((state) => state.limit);
  const offset = useDatabaseStore((state) => state.offset);
  const currentTable = useDatabaseStore((state) => state.currentTable);
  const maxSize = useDatabaseStore((state) => state.maxSize);
  const setOffset = useDatabaseStore((state) => state.setOffset);
  const setFilters = useDatabaseStore((state) => state.setFilters);
  const setSorters = useDatabaseStore((state) => state.setSorters);
  const setLimit = useDatabaseStore((state) => state.setLimit);
  const resetPagination = useDatabaseStore((state) => state.resetPagination);
  const setCustomQueryObject = useDatabaseStore(
    (state) => state.setCustomQueryObject
  );
  const customQuery = useDatabaseStore((state) => state.customQuery);
  const tablesSchema = useDatabaseStore((state) => state.tablesSchema);

  const {
    selectedRowObject,
    setSelectedRowObject,
    setIsInserting,
    handleCloseEdit
  } = usePanelManager();

  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);

  // Initialize worker and send initial "init" message
  useEffect(() => {
    // Create a new worker
    workerRef.current = new Worker(
      new URL("./../lib/sqlite/sqliteWorker.ts", import.meta.url),
      { type: "module" }
    );

    // Listen for messages from the worker
    workerRef.current.onmessage = (
      event: MessageEvent<WorkerResponseEvent>
    ) => {
      const workerEvent = event.data;
      const { action } = workerEvent;

      // When the worker is initialized
      if (action === "initComplete") {
        const { payload } = workerEvent as InitCompleteResponse;

        setTablesSchema(payload.tableSchema);
        setIndexesSchema(payload.indexSchema);
        setCurrentTable(payload.currentTable);
        setColumns(
          payload.tableSchema[payload.currentTable].schema.map(
            (column: { name: string }) => column.name
          )
        );
        setFilters(null);
        setSorters(null);
        setSelectedRowObject(null);
        setIsInserting(false);
        setOffset(0);
        setIsDatabaseLoading(false);
      }
      // When the query is executed and returns results
      else if (action === "queryComplete") {
        const { payload } = workerEvent as QueryCompleteResponse;

        setMaxSize(payload.maxSize);

        const results = payload.results;
        if (!results) {
          setData(null);
          return;
        }

        const data = results[0]?.values || [];
        // To be able to cache the columns
        if (data.length !== 0) {
          setData(data);
        } else {
          setData(null);
        }

        setIsDataLoading(false);
      }
      // When the custom query is executed and returns results
      else if (action === "customQueryComplete") {
        const { payload } = workerEvent as CustomQueryCompleteResponse;

        const results = payload.results;
        if (!results) {
          setData(null);
          return;
        }

        const data = results[0]?.values || [];
        if (data.length !== 0) {
          setCustomQueryObject({
            data: data,
            columns: results[0]?.columns || []
          });
        } else {
          setCustomQueryObject(null);
        }

        setIsDataLoading(false);
        setErrorMessage(null);
      }
      // When the database is updated and requires a new schema
      else if (action === "updateInstance") {
        const { payload } = workerEvent as UpdateInstanceResponse;

        setTablesSchema(payload.tableSchema);
        setIndexesSchema(payload.indexSchema);
        setIsDataLoading(false);
        setErrorMessage(null);

        toast.success("Database schema updated successfully");
      }
      // When a row is updated
      else if (action === "updateComplete") {
        const { payload } = workerEvent as UpdateCompleteResponse;

        setErrorMessage(null);
        handleCloseEdit();

        toast.success(`Row ${payload.type} successfully`);
      }
      // When a row is inserted
      else if (action === "insertComplete") {
        setErrorMessage(null);
        handleCloseEdit();

        toast.success("Row inserted successfully");
      }
      // When the database is downloaded
      else if (action === "downloadComplete") {
        const { payload } = workerEvent as DownloadCompleteResponse;

        const blob = new Blob([payload.bytes], {
          type: "application/octet-stream"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "database.sqlite";
        link.click();

        toast.success("Database downloaded successfully");
      }
      // When the database is exported
      else if (action === "exportComplete") {
        const { payload } = workerEvent as ExportCompleteResponse;

        const blob = new Blob([payload.results], {
          type: "text/csv"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "export.csv";
        link.click();

        toast.success("Database exported successfully");
      }
      // When the worker encounters an error
      else if (action === "queryError") {
        const { payload } = workerEvent as QueryErrorResponse;

        console.error("Worker error:", payload.error);

        setIsDataLoading(false);

        if (payload.error.isCustomQueryError) {
          setErrorMessage(payload.error.message);
        } else {
          toast.error(payload.error.message);
        }
      } else {
        console.warn("Unknown action:", action);
      }
    };

    setIsDatabaseLoading(true);

    // Request the worker to initialize the demo database
    workerRef.current.postMessage({ action: "init" });

    return () => {
      workerRef.current?.terminate();
    };
  }, [
    setColumns,
    setOffset,
    setIsDatabaseLoading,
    setTablesSchema,
    setCurrentTable,
    setIndexesSchema,
    setCustomQueryObject,
    setData,
    setMaxSize,
    setIsDataLoading,
    setErrorMessage,
    setFilters,
    setSorters,
    setSelectedRowObject,
    handleCloseEdit,
    setIsInserting
  ]);

  // When fetching data, ask the worker for new data
  useEffect(() => {
    if (!currentTable) return;
    const handler = setTimeout(() => {
      if (!workerRef.current) {
        toast.error("Worker is not initialized");
        return;
      }

      setIsDataLoading(true);

      // Limit of the data depends on the hight of the table on the screen
      let limit = 50;
      const tableHeaderHight = document
        .getElementById("tableHeader")
        ?.getBoundingClientRect().height;
      const dataSectionHight = document
        .getElementById("dataSection")
        ?.getBoundingClientRect().height;
      const tableCellHight = document
        .getElementById("tableCell")
        ?.getBoundingClientRect().height;
      const paginationControlsHight = document
        .getElementById("paginationControls")
        ?.getBoundingClientRect().height;
      if (isFirstTimeLoading) {
        setIsFirstTimeLoading(false);
        if (dataSectionHight && paginationControlsHight) {
          // 51.5 is hight of tableHeader and 33 is hight of tableRow
          // They are hardcoded because they not loaded yet
          limit = Math.floor(
            (dataSectionHight - paginationControlsHight - 51.5) / 33
          );
        }
      } else {
        if (
          tableHeaderHight &&
          dataSectionHight &&
          paginationControlsHight &&
          tableCellHight
        )
          limit = Math.floor(
            (dataSectionHight - tableHeaderHight - paginationControlsHight) /
              tableCellHight
          );
      }

      setLimit(limit);

      // Request data from the worker
      workerRef.current.postMessage({
        action: "getTableData",
        payload: { currentTable, filters, sorters, limit, offset }
      });
    }, 100);

    return () => clearTimeout(handler);
  }, [
    currentTable,
    filters,
    sorters,
    isFirstTimeLoading,
    offset,
    setLimit,
    setIsDataLoading
  ]);

  // Handle file upload by sending the file to the worker
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        toast.error("No file selected");
        return;
      }

      toast.info("Opening database");

      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        if (!workerRef.current) {
          toast.error("Worker is not initialized");
          return;
        }

        // Send the file to the worker to initialize the database
        workerRef.current.postMessage({
          action: "openFile",
          payload: { file: arrayBuffer }
        });
      };
      reader.readAsArrayBuffer(file);
    },
    []
  );

  // Handle when user downloads the database
  const handleDownload = useCallback(() => {
    if (!workerRef.current) {
      toast.error("Worker is not initialized");
      return;
    }

    // Request the worker to export and download the database
    workerRef.current.postMessage({ action: "download" });
  }, []);

  // Handle when user changes the table
  const handleTableChange = useCallback(
    (selectedTable: string) => {
      setFilters(null);
      setSorters(null);
      resetPagination();
      setMaxSize(0);
      setSelectedRowObject(null);
      setIsInserting(false);
      setCurrentTable(selectedTable);
      setColumns(tablesSchema[selectedTable].schema.map((col) => col.name));
    },
    [
      setFilters,
      setSorters,
      resetPagination,
      setMaxSize,
      setCurrentTable,
      setSelectedRowObject,
      setIsInserting,
      tablesSchema,
      setColumns
    ]
  );

  // Handle when user updates the filter
  const handleQueryFilter = useCallback(
    (column: string, value: string) => {
      const currentFilters = useDatabaseStore.getState().filters || {};
      const newFilters = { ...currentFilters, [column]: value };

      setFilters(newFilters);
      resetPagination();
    },
    [setFilters, resetPagination]
  );

  // Handle when user updates the sorter
  const handleQuerySorter = useCallback(
    (column: string) => {
      const isMutableColumns = false; // TODO: in settings tab user can change this
      const currentSorters = useDatabaseStore.getState().sorters || {};
      const currentSortOrder = currentSorters[column] || "asc";
      const newSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      const newSorters = isMutableColumns
        ? { ...currentSorters, [column]: newSortOrder }
        : { [column]: newSortOrder };

      setSorters(newSorters as Sorters);
    },
    [setSorters]
  );

  // Handles when user changes the page
  const handlePageChange = useCallback(
    (type: "next" | "prev" | "first" | "last" | number) => {
      const currentOffset = useDatabaseStore.getState().offset;

      // use currentOffset instead of prev
      if (typeof type === "number") {
        setOffset(type);
      } else if (type === "next") {
        setOffset(currentOffset + limit);
      } else if (type === "prev") {
        setOffset(currentOffset - limit);
      } else if (type === "first") {
        setOffset(0);
      } else if (type === "last") {
        setOffset(maxSize - limit);
      }

      setSelectedRowObject(null);
    },
    [maxSize, limit, setOffset, setSelectedRowObject]
  );

  // Handle when user exports the data
  const handleExport = useCallback(
    (exportType: exportTypes) => {
      if (!workerRef.current) {
        toast.error("Worker is not initialized");
        return;
      }

      // Request the worker to export the data
      workerRef.current.postMessage({
        action: "export",
        payload: {
          table: currentTable,
          offset,
          limit,
          filters,
          sorters,
          exportType: exportType
        }
      });
    },
    [currentTable, filters, sorters, offset, limit]
  );

  // Handle SQL statement execution by sending it to the worker
  const handleQueryExecute = useCallback(() => {
    if (!workerRef.current) {
      toast.error("Worker is not initialized");
      return;
    }

    const query = customQuery;
    if (!query) return;

    // Remove SQL comments before processing
    const cleanedQuery = query
      .replace(/--.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "");
    // Split the query into multiple statements
    const statements = cleanedQuery
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt !== "");

    for (const stmt of statements) {
      setIsDataLoading(true);

      // Request the worker to execute the query
      workerRef.current.postMessage({
        action: "exec",
        payload: {
          query: stmt,
          currentTable,
          filters,
          sorters,
          limit,
          offset
        }
      });
    }
  }, [
    currentTable,
    filters,
    sorters,
    limit,
    offset,
    setIsDataLoading,
    customQuery
  ]);

  // Handle when user submits the edit form
  const handleEditSubmit = useCallback(
    (type: EditTypes) => {
      if (!workerRef.current) {
        toast.error("Worker is not initialized");
        return;
      }

      setIsDataLoading(true);

      // Request the worker to make the changes
      workerRef.current.postMessage({
        action: type,
        payload: {
          table: currentTable,
          columns: useDatabaseStore.getState().columns,
          values: usePanelStore.getState().editValues,
          primaryValue: selectedRowObject?.primaryValue
        }
      });

      // Request the worker to refresh the current viewed data
      workerRef.current.postMessage({
        action: "refresh",
        payload: {
          currentTable: currentTable,
          offset,
          limit,
          filters,
          sorters
        }
      });
    },
    [
      currentTable,
      filters,
      sorters,
      offset,
      limit,
      setIsDataLoading,
      selectedRowObject
    ]
  );

  const value = {
    workerRef,
    handleFileChange,
    handleDownload,
    handleTableChange,
    handleQueryFilter,
    handleQuerySorter,
    handlePageChange,
    handleExport,
    handleQueryExecute,
    handleEditSubmit
  };

  return (
    <DatabaseWorkerContext.Provider value={value}>
      {children}
    </DatabaseWorkerContext.Provider>
  );
};

export const useDatabaseWorker = () => {
  const context = useContext(DatabaseWorkerContext);

  if (context === undefined)
    throw new Error(
      "useDatabaseWorker must be used within a DatabaseWorkerProvider"
    );

  return context;
};
