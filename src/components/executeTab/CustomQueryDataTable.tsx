import { useDatabaseStore } from "@/store/useDatabaseStore";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Span } from "@/components/ui/span";
import { DatabaseIcon, TableIcon } from "lucide-react";

const CustomQueryDataTable = () => {
  const customQueryObject = useDatabaseStore(
    (state) => state.customQueryObject
  );

  if (!customQueryObject) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <div className="bg-primary/10 rounded-full p-4">
          <DatabaseIcon className="text-primary/70 h-8 w-8" />
        </div>
        <div className="text-center">
          <h3 className="mb-1 font-medium">No Query Results</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Execute a SQL query to view the results here
          </p>
        </div>
      </div>
    );
  }

  if (!customQueryObject.data || customQueryObject.data.length === 0) {
    return (
      <div className="shadow-sm">
        <div className="bg-primary/5 border-b p-3">
          <div className="flex items-center gap-2">
            <TableIcon className="text-primary/70 h-4 w-4" />
            <h3 className="text-sm font-medium">Query Results</h3>
            <span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs">
              {customQueryObject.columns.length} columns
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-primary/5 mb-4 rounded-full p-4">
            <TableIcon className="text-primary/50 h-6 w-6" />
          </div>
          <p className="text-md mb-1 font-medium">Query returned no results</p>
          <p className="text-muted-foreground text-sm">
            Your query executed successfully but returned no data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-sm">
      <div className="bg-primary/5 border-b p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="text-primary/70 h-4 w-4" />
            <h3 className="text-sm font-medium">Query Results</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs">
              {customQueryObject.data.length} rows
            </span>
            <span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs">
              {customQueryObject.columns.length} columns
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5 border-b">
              {customQueryObject.columns.map((column) => (
                <TableHead
                  key={column}
                  className="bg-primary/5 sticky top-0 z-10 p-2 text-xs font-medium"
                >
                  <div className="flex items-center gap-1">
                    <Span className="text-foreground capitalize">{column}</Span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {customQueryObject.data.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-primary/5 border-primary/5 border-t text-xs transition-colors"
              >
                {row.map((value, j) => (
                  <TableCell key={j} className="border-primary/5 border-t p-2">
                    {value !== null ? (
                      <Span className="text-xs">{value}</Span>
                    ) : (
                      <span className="text-muted-foreground bg-primary/5 rounded px-2 py-0.5 text-xs italic">
                        NULL
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomQueryDataTable;
