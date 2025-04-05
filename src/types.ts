import { QueryExecResult, SqlValue } from "sql.js";

export type TableSchema = {
  [tableName: string]: {
    primaryKey: "_rowid_" | string;
    schema: TableSchemaRow[];
  };
};

export type TableSchemaRow = {
  name: string; // Column name
  cid: number;
  type: string | null;
  dflt_value: string;
  IsNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
};

export type IndexSchema = {
  name: string;
  tableName: string;
};

export type Sorters = Record<string, "asc" | "desc">;
export type Filters = Record<string, string>;

export type EditTypes = "insert" | "update" | "delete";
export type exportTypes = "table" | "current" | "custom";

// --- WORKER MESSAGES --- //
export interface InitEvent {
  action: "init";
  payload: undefined;
}

export interface OpenFileEvent {
  action: "openFile";
  payload: {
    file: ArrayBuffer;
  };
}

export interface RefreshEvent {
  action: "refresh";
  payload: {
    currentTable: string;
    limit: number;
    offset: number;
    filters: Filters;
    sorters: Sorters;
  };
}

export interface ExecEvent {
  action: "exec";
  payload: {
    query: string;
    currentTable: string;
    limit: number;
    offset: number;
    filters: Filters;
    sorters: Sorters;
  };
}

export interface GetTableDataEvent {
  action: "getTableData";
  payload: {
    currentTable: string;
    limit: number;
    offset: number;
    filters: Filters;
    sorters: Sorters;
  };
}

export interface DownloadEvent {
  action: "download";
  payload: undefined;
}

export interface UpdateEvent {
  action: "update";
  payload: {
    table: string;
    columns: string[];
    values: SqlValue[];
    primaryValue: SqlValue;
  };
}

export interface DeleteEvent {
  action: "delete";
  payload: {
    table: string;
    primaryValue: SqlValue;
  };
}

export interface InsertEvent {
  action: "insert";
  payload: {
    table: string;
    columns: string[];
    values: SqlValue[];
  };
}

export interface ExportEvent {
  action: "export";
  payload: {
    table: string;
    filters: Filters;
    sorters: Sorters;
    limit: number;
    offset: number;
    customQuery: string;
    exportType: exportTypes;
  };
}

export type WorkerEvent =
  | InitEvent
  | OpenFileEvent
  | RefreshEvent
  | ExecEvent
  | GetTableDataEvent
  | DownloadEvent
  | UpdateEvent
  | DeleteEvent
  | InsertEvent
  | ExportEvent;

// --- WORKER RESPONSE --- //
export interface InitCompleteResponse {
  action: "initComplete";
  payload: {
    tableSchema: TableSchema;
    indexSchema: IndexSchema[];
    currentTable: string;
  };
}

export interface QueryCompleteResponse {
  action: "queryComplete";
  payload: {
    results?: QueryExecResult[];
    maxSize: number;
  };
}

export interface CustomQueryCompleteResponse {
  action: "customQueryComplete";
  payload: {
    results: QueryExecResult[];
  };
}

export interface UpdateInstanceResponse {
  action: "updateInstance";
  payload: {
    tableSchema: TableSchema;
    indexSchema: IndexSchema[];
  };
}

export interface UpdateCompleteResponse {
  action: "updateComplete";
  payload: {
    type: EditTypes;
  };
}

export interface InsertCompleteResponse {
  action: "insertComplete";
}

export interface DownloadCompleteResponse {
  action: "downloadComplete";
  payload: {
    bytes: ArrayBuffer;
  };
}

export interface ExportCompleteResponse {
  action: "exportComplete";
  payload: {
    results: string;
  };
}

export interface QueryErrorResponse {
  action: "queryError";
  payload: {
    error: {
      message: string;
      isCustomQueryError: boolean;
    };
  };
}

// Union type for all possible worker responses
export type WorkerResponseEvent =
  | InitCompleteResponse
  | QueryCompleteResponse
  | CustomQueryCompleteResponse
  | UpdateInstanceResponse
  | UpdateCompleteResponse
  | InsertCompleteResponse
  | DownloadCompleteResponse
  | ExportCompleteResponse
  | QueryErrorResponse;
