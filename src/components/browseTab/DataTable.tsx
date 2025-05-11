import { useMemo } from "react";
import { useDatabaseStore } from "@/store/useDatabaseStore";
import useDatabaseWorker from "@/hooks/useWorker";
import usePanelManager from "@/hooks/usePanel";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Span } from "@/components/ui/span";
import ColumnIcon from "@/components/table/ColumnIcon";
import FilterInput from "@/components/table/FilterInput";
import Badge from "@/components/ui/badge";
import SorterButton from "../table/SorterButton";

import { DatabaseIcon, FilterXIcon } from "lucide-react";

function DataTable() {
  const data = useDatabaseStore((state) => state.data);
  const columns = useDatabaseStore((state) => state.columns);
  const currentTable = useDatabaseStore((state) => state.currentTable);
  const tablesSchema = useDatabaseStore((state) => state.tablesSchema);
  const filters = useDatabaseStore((state) => state.filters);
  const setFilters = useDatabaseStore((state) => state.setFilters);

  const { handleQueryFilter } = useDatabaseWorker();
  const { handleRowClick } = usePanelManager();

  const emptyDataContent = useMemo(
    () => (
      <div className="flex h-full flex-col items-center justify-center gap-1 px-4">
        {filters ? (
          <>
            <div className="text-center">
              <h3 className="mb-1 font-medium">No Data To Show</h3>
              <p className="text-muted-foreground max-w-md text-sm">
                The current filters did not return any results
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => setFilters(null)}
            >
              <FilterXIcon className="mr-1 h-3 w-3" />
              Clear filters
            </Button>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
            <div className="bg-primary/10 rounded-full p-4">
              <DatabaseIcon className="text-primary/70 h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="mb-1 font-medium">No Data To Show</h3>
              <p className="text-muted-foreground max-w-md text-sm">
                This table does not have any data to display
              </p>
            </div>
          </div>
        )}
      </div>
    ),
    [filters, setFilters]
  );

  const memoizedFilterInput = useMemo(() => {
    return (columns || []).map((column) => (
      <FilterInput
        key={column}
        column={column}
        value={filters?.[column] ?? ""}
        onChange={handleQueryFilter}
      />
    ));
  }, [columns, filters, handleQueryFilter]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary/5">
          {columns && currentTable ? (
            columns.map((column, index) => (
              <TableHead key={column} className="p-1 text-xs">
                <div className="flex items-center gap-1 py-[1.5px]">
                  <SorterButton column={column} />
                  <Span className="text-foreground font-medium capitalize">
                    {column}
                  </Span>
                  <ColumnIcon
                    columnSchema={tablesSchema[currentTable].schema[index]}
                  />
                </div>
                {memoizedFilterInput?.[index]}
              </TableHead>
            ))
          ) : (
            <TableHead>
              <p className="text-xs">No columns found</p>
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((row, i) => {
            const displayData = row.slice(1);
            return (
              <TableRow
                key={i}
                onClick={() => handleRowClick(displayData, i, row[0])}
                className="hover:bg-primary/5 focus:bg-primary/5 cursor-pointer text-xs"
              >
                {displayData.map((value, j) => (
                  <TableCell key={j} className="border-primary/5 border-t p-2">
                    {value === null ? (
                      <Badge>
                        {value === null ? "NULL" : JSON.stringify(value)}
                      </Badge>
                    ) : (
                      <>
                        {tablesSchema[currentTable!].schema[j]?.type ===
                        "BLOB" ? (
                          <Badge>BLOB</Badge>
                        ) : (
                          <Span className="text-xs">{value}</Span>
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns?.length ?? 1}
              className="h-32 text-center"
            >
              {emptyDataContent}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DataTable;
