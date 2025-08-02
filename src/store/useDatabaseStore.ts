import { create } from "zustand";

import type { TableSchema, IndexSchema, Filters, Sorters } from "@/types";
import type { SqlValue } from "sql.js";

interface DatabaseState {
  tablesSchema: TableSchema;
  indexesSchema: IndexSchema[];
  currentTable: string | null;
  data: SqlValue[][] | null;
  columns: string[] | null;
  maxSize: number;
  isDatabaseLoading: boolean;
  isDataLoading: boolean;
  errorMessage: string | null;
  filters: Filters;
  sorters: Sorters;
  limit: number;
  offset: number;
  customQuery?: string;
  customQueryObject: {
    data: SqlValue[][];
    columns: string[];
  } | null;
  geminiApiKey: string | null;
  isAiLoading: boolean;
}

interface DatabaseActions {
  setTablesSchema: (schema: TableSchema) => void;
  setIndexesSchema: (schema: IndexSchema[]) => void;
  setCurrentTable: (table: string | null) => void;
  setData: (data: SqlValue[][] | null) => void;
  setColumns: (columns: string[] | null) => void;
  setMaxSize: (size: number) => void;
  setIsDatabaseLoading: (loading: boolean) => void;
  setIsDataLoading: (loading: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  setFilters: (filters: Filters) => void;
  setSorters: (sorters: Sorters) => void;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  setCustomQuery: (query: string) => void;
  setCustomQueryObject: (
    obj: { data: SqlValue[][]; columns: string[] } | null
  ) => void;
  setGeminiApiKey: (key: string | null) => void;
  setIsAiLoading: (loading: boolean) => void;
  resetPagination: () => void;
}

type DatabaseStore = DatabaseState & DatabaseActions;

export const useDatabaseStore = create<DatabaseStore>((set) => ({
  // --- State ---
  tablesSchema: {} as TableSchema,
  indexesSchema: [],
  currentTable: null,
  data: null,
  columns: null,
  maxSize: 1,
  isDatabaseLoading: false,
  isDataLoading: false,
  errorMessage: null,
  filters: null,
  sorters: null,
  limit: 50,
  offset: 0,
  customQuery: undefined,
  customQueryObject: null,
  geminiApiKey:
    typeof window !== "undefined" ? localStorage.getItem("geminiApiKey") : null,
  isAiLoading: false,

  // --- Actions ---
  setTablesSchema: (schema) => set({ tablesSchema: schema }),
  setIndexesSchema: (schema) => set({ indexesSchema: schema }),
  setCurrentTable: (table) => set({ currentTable: table }),
  setData: (data) => set({ data }),
  setColumns: (columns) => set({ columns }),
  setMaxSize: (size) => set({ maxSize: size }),
  setIsDatabaseLoading: (loading) => set({ isDatabaseLoading: loading }),
  setIsDataLoading: (loading) => set({ isDataLoading: loading }),
  setErrorMessage: (message) => set({ errorMessage: message }),
  setFilters: (filters) => set({ filters }),
  setSorters: (sorters) => set({ sorters }),
  setLimit: (limit) => set({ limit }),
  setOffset: (offset) => set({ offset }),
  setCustomQuery: (query) => set({ customQuery: query }),
  setCustomQueryObject: (obj) => set({ customQueryObject: obj }),
  setGeminiApiKey: (key) => {
    set({ geminiApiKey: key });
    if (key) {
      localStorage.setItem("geminiApiKey", key);
    } else {
      localStorage.removeItem("geminiApiKey");
    }
  },
  setIsAiLoading: (loading) => set({ isAiLoading: loading }),
  resetPagination: () => set({ offset: 0 })
}));
