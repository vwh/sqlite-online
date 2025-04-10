import { memo } from "react";
import { useDatabaseWorker } from "@/providers/DatabaseWorkerProvider";
import { useDatabaseStore } from "@/store/useDatabaseStore";

import {
  ArrowDownNarrowWideIcon,
  ArrowUpDownIcon,
  ArrowUpNarrowWideIcon
} from "lucide-react";

const SorterButton = memo(({ column }: { column: string }) => {
  const sorters = useDatabaseStore((state) => state.sorters);
  const { handleQuerySorter } = useDatabaseWorker();

  if (sorters?.[column]) {
    if (sorters[column] === "asc") {
      return (
        <button
          title="Sort column in descending order"
          type="button"
          aria-label="Sort descending"
          className="cursor-pointer"
          onClick={() => handleQuerySorter(column)}
        >
          <ArrowDownNarrowWideIcon className="h-3 w-3" />
        </button>
      );
    } else {
      return (
        <button
          title="Sort column in ascending order"
          type="button"
          aria-label="Sort ascending"
          className="cursor-pointer"
          onClick={() => handleQuerySorter(column)}
        >
          <ArrowUpNarrowWideIcon className="h-3 w-3" />
        </button>
      );
    }
  }

  return (
    <button
      title="Sort column in ascending order"
      type="button"
      aria-label="Sort column"
      className="cursor-pointer"
      onClick={() => handleQuerySorter(column)}
    >
      <ArrowUpDownIcon className="h-3 w-3" />
    </button>
  );
});

export default SorterButton;
