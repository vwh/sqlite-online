import { create } from "zustand";
import { debounce } from "lodash";

interface PanelState {
  schemaPanelSize: number;
  dataPanelSize: number;

  editValues: string[];
  isInserting: boolean;

  setSchemaPanelSize: (size: number) => void;
  setDataPanelSize: (size: number) => void;

  setEditValues: (values: string[]) => void;
  setIsInserting: (inserting: boolean) => void;
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
    isInserting: false,

    setSchemaPanelSize: debouncedSetSchemaPanelSize,
    setDataPanelSize: debouncedSetDataPanelSize,

    setEditValues: (values) => set({ editValues: values }),
    setIsInserting: (inserting) => set({ isInserting: inserting })
  };
});
