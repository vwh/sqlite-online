import { create } from "zustand";
import { debounce } from "lodash";
import type { SqlValue } from "sql.js";

interface PanelState {
  schemaPanelSize: number;
  dataPanelSize: number;

  editValues: string[];
  selectedRow: { data: SqlValue[]; index: number } | null;
  isInserting: boolean;
  isMobile: boolean;

  setSchemaPanelSize: (size: number) => void;
  setDataPanelSize: (size: number) => void;

  setEditValues: (values: string[]) => void;
  setSelectedRow: (row: { data: SqlValue[]; index: number } | null) => void;
  setIsInserting: (inserting: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
  resetEditSection: () => void;
}

export const usePanelStore = create<PanelState>((set) => {
  const debouncedSetSchemaPanelSize = debounce((size: number) => {
    set({ schemaPanelSize: size });
  }, 200);

  const debouncedSetDataPanelSize = debounce((size: number) => {
    set({ dataPanelSize: size });
  }, 200);

  return {
    schemaPanelSize: 25,
    dataPanelSize: 75,

    editValues: [],
    selectedRow: null,
    isInserting: false,
    isMobile: window.matchMedia("(max-width: 768px)").matches,

    setSchemaPanelSize: debouncedSetSchemaPanelSize,
    setDataPanelSize: debouncedSetDataPanelSize,

    setEditValues: (values) => set({ editValues: values }),
    setSelectedRow: (row) => set({ selectedRow: row }),
    setIsInserting: (inserting) => set({ isInserting: inserting }),
    setIsMobile: (isMobile) => set({ isMobile }),

    resetEditSection: () =>
      set(() => {
        const updates: Partial<PanelState> = {
          isInserting: false,
          selectedRow: null
        };
        return updates;
      })
  };
});
