import { useDatabaseWorker } from "@/providers/DatabaseWorkerProvider";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import { usePanelManager } from "@/providers/PanelProvider";

import { Button } from "@/components/ui/button";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderOutputIcon,
  PlusIcon
} from "lucide-react";

const PaginationControls = () => {
  const { handlePageChange, handleExport } = useDatabaseWorker();
  const { isInserting, handleInsert } = usePanelManager();
  const offset = useDatabaseStore((state) => state.offset);
  const limit = useDatabaseStore((state) => state.limit);
  const maxSize = useDatabaseStore((state) => state.maxSize);
  const isDataLoading = useDatabaseStore((state) => state.isDataLoading);

  return (
    <footer
      className="bg-background flex w-full items-center justify-between border-t shadow-sm"
      id="paginationControls"
    >
      <section className="bg-primary/10 flex h-full grow items-center gap-2 p-1">
        <div className="flex items-center rounded-md border shadow-sm">
          <Button
            onClick={() => handlePageChange("first")}
            disabled={offset === 0 || isDataLoading || !maxSize}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-l-md rounded-r-none border-r"
            title="Go to first page"
          >
            <ChevronFirstIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handlePageChange("prev")}
            disabled={offset === 0 || isDataLoading || !maxSize}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-none border-r"
            title="Go to previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center px-3 text-xs font-medium">
            {maxSize ? (
              <span>
                {offset + 1}
                <span className="text-primary/50 mx-1">-</span>
                {offset + limit > maxSize ? maxSize : offset + limit}
                <span className="text-primary/50 mx-1">of</span>
                {maxSize}
              </span>
            ) : (
              <span>No data</span>
            )}
          </div>
          <Button
            onClick={() => handlePageChange("next")}
            disabled={offset + limit >= maxSize || isDataLoading || !maxSize}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-none border-l"
            title="Go to next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => handlePageChange("last")}
            disabled={offset + limit >= maxSize || isDataLoading || !maxSize}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-l-none rounded-r-md border-l"
            title="Go to last page"
          >
            <ChevronLastIcon className="h-4 w-4" />
          </Button>
        </div>
      </section>
      <section className="bg-primary/10 hidden h-full items-center gap-1 p-2 md:flex">
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs font-medium shadow-sm"
          onClick={handleInsert}
          disabled={isInserting || !maxSize}
        >
          <PlusIcon className="mr-2 h-3.5 w-3.5" />
          Insert row
        </Button>
        <Button
          onClick={() => handleExport("current")}
          size="sm"
          variant="outline"
          className="h-8 text-xs font-medium shadow-sm"
          title="Export current data as CSV"
        >
          <FolderOutputIcon className="mr-2 h-3.5 w-3.5" />
          Export data
        </Button>
      </section>
    </footer>
  );
};

export default PaginationControls;
