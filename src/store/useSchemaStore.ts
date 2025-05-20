import { create } from "zustand";

interface SchemaState {
  expandedTables: string[];
  expandedIndexSection: boolean;
  toggleTable: (tableName: string) => void;
  setExpandedTables: (tables: string[]) => void;
  toggleExpandedIndexSection: () => void;
  setExpandedIndexSection: (value: boolean) => void;
}

export const useSchemaStore = create<SchemaState>((set) => ({
  expandedTables: [],
  expandedIndexSection: true,
  toggleTable: (tableName) =>
    set((state) => ({
      expandedTables: state.expandedTables.includes(tableName)
        ? state.expandedTables.filter((name) => name !== tableName)
        : [...state.expandedTables, tableName]
    })),
  setExpandedTables: (tables) => set({ expandedTables: tables }),
  toggleExpandedIndexSection: () =>
    set((state) => ({ expandedIndexSection: !state.expandedIndexSection })),
  setExpandedIndexSection: (value) =>
    set(() => ({ expandedIndexSection: value }))
}));
