import { useDatabaseStore } from "@/store/useDatabaseStore";
import { createContext, useContext, useCallback, useState } from "react";

import type { SqlValue } from "sql.js";

interface PanelContextProps {
  handleRowClick: (row: SqlValue[], index: number) => void;
  handleInsert: () => void;
  isEditing: boolean;
  selectedRowObject: {
    data: SqlValue[];
    index: number;
    primaryValue: SqlValue;
  } | null;
  isInserting: boolean;
  setIsInserting: (value: boolean) => void;
  setSelectedRowObject: (
    value: { data: SqlValue[]; index: number; primaryValue: SqlValue } | null
  ) => void;
  handleCloseEdit: () => void;
}

const PanelContext = createContext<PanelContextProps | undefined>(undefined);

interface PanelProviderProps {
  children: React.ReactNode;
}

export const PanelProvider = ({ children }: PanelProviderProps) => {
  const [selectedRowObject, setSelectedRowObject] = useState<{
    data: SqlValue[];
    index: number;
    primaryValue: SqlValue;
  } | null>(null);
  const [isInserting, setIsInserting] = useState(false);

  // Detect if in editing mode
  const isEditing = selectedRowObject !== null || isInserting;

  const { columns, tablesSchema, currentTable, offset } = useDatabaseStore(
    (state) => state
  );

  // Handle row click to toggle edit panel
  const handleRowClick = useCallback(
    (row: SqlValue[], index: number) => {
      let primaryValue = `${offset + 1 + index}` as SqlValue; // the default rowid if no primary key exists
      if (tablesSchema[currentTable!].primaryKey !== "__rowid__") {
        for (const col of tablesSchema[currentTable!].schema) {
          if (col.isPrimaryKey) {
            const i = columns?.findIndex((column) => column === col.name);
            if (i !== undefined) primaryValue = row[i];
          }
        }
      }

      setIsInserting(false);
      setSelectedRowObject({ data: row, index: index, primaryValue });
    },
    [columns, tablesSchema, currentTable, offset]
  );

  // Handle insert row button click
  const handleInsert = useCallback(() => {
    setSelectedRowObject(null);
    setIsInserting(true);
  }, []);

  // Handle closing edit panel
  const handleCloseEdit = useCallback(() => {
    setIsInserting(false);
    setSelectedRowObject(null);
  }, []);

  const value = {
    handleRowClick,
    handleInsert,
    isEditing,
    selectedRowObject,
    isInserting,
    setIsInserting,
    setSelectedRowObject,
    handleCloseEdit
  };

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};

export const usePanelManager = () => {
  const context = useContext(PanelContext);

  if (context === undefined) {
    throw new Error("usePanelManager must be used within a PanelProvider");
  }

  return context;
};
