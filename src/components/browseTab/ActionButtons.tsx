import { useDatabaseStore } from "@/store/useDatabaseStore";
import useDatabaseWorker from "@/hooks/useWorker";

import type { Filters, Sorters } from "@/types";

import { Button } from "@/components/ui/button";
import ActionsDropdown from "./ActionsDropdown";

import { FilterXIcon, FolderOutputIcon, ListRestartIcon } from "lucide-react";

interface ActionButtonsProps {
  filters: Filters;
  sorters: Sorters;
}

function ActionButtons({ filters, sorters }: Readonly<ActionButtonsProps>) {
  const setFilters = useDatabaseStore((state) => state.setFilters);
  const setSorters = useDatabaseStore((state) => state.setSorters);
  const { handleExport } = useDatabaseWorker();

  return (
    <>
      <div className="hidden items-center gap-1 md:flex">
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          onClick={() => setFilters(null)}
          disabled={filters == null}
          title="Clear applied filters"
        >
          <FilterXIcon className="mr-1 h-3 w-3" />
          Clear filters
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          onClick={() => setSorters(null)}
          disabled={sorters == null}
          title="Reset sorting"
        >
          <ListRestartIcon className="mr-1 h-3 w-3" />
          Reset sorting
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs"
          onClick={() => handleExport("table")}
          title="Export the current table as CSV"
        >
          <FolderOutputIcon className="mr-1 h-3 w-3" />
          Export table
        </Button>
      </div>
      <div className="md:hidden">
        <ActionsDropdown
          setFilters={setFilters}
          setSorters={setSorters}
          filters={filters}
          sorters={sorters}
          handleExport={handleExport}
        />
      </div>
    </>
  );
}

export default ActionButtons;
