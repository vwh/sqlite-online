import { createContext, useContext, useCallback, useState } from "react";

import type { SqlValue } from "sql.js";

interface PanelContextProps {
  handleRowClick: (
    row: SqlValue[],
    index: number,
    primaryValue: SqlValue
  ) => void;
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

  // Detect if in editing mode (insert or update/delete)
  const isEditing = selectedRowObject !== null || isInserting;

  // Handle row click to toggle edit panel
  const handleRowClick = useCallback(
    (row: SqlValue[], index: number, primaryValue: SqlValue) => {
      setIsInserting(false);
      setSelectedRowObject({ data: row, index: index, primaryValue });
    },
    []
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
