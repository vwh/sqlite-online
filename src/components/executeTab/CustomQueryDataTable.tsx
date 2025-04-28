import { useDatabaseStore } from "@/store/useDatabaseStore";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Span } from "@/components/ui/span";
import Badge from "@/components/ui/badge";

import { DatabaseIcon, TableIcon } from "lucide-react";

const ROW_HEIGHT = 36;

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
      <div className="h-full shadow-sm">
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
    <div className="flex h-full w-full flex-col shadow-sm">
      <div className="bg-primary/5 flex-shrink-0 border-b p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TableIcon className="text-primary/70 h-4 w-4" />
            <Span className="mr-2 text-sm font-medium text-nowrap">
              Query Results
            </Span>
          </div>
          <div className="flex items-center gap-2">
            <Span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs text-nowrap">
              {customQueryObject.data.length} rows
            </Span>
            <Span className="bg-primary/10 rounded-full px-2 py-0.5 text-xs text-nowrap">
              {customQueryObject.columns.length} columns
            </Span>
          </div>
        </div>
      </div>

      <div className="h-0 min-h-0 flex-grow overflow-hidden">
        <AutoSizer>
          {({ height, width }) => (
            <div style={{ height, width }}>
              {/* Table Header */}
              <div
                className="bg-primary/5 sticky top-0 z-10 flex border-b"
                style={{ width }}
              >
                {customQueryObject.columns.map((column) => {
                  const columnWidth = 100 / customQueryObject.columns.length;
                  return (
                    <div
                      key={column}
                      className="p-2 text-xs font-medium text-ellipsis whitespace-nowrap"
                      style={{
                        width: `${columnWidth}%`,

                        flexShrink: 0
                      }}
                    >
                      <Span className="text-foreground capitalize">
                        {column}
                      </Span>
                    </div>
                  );
                })}
              </div>

              {/* Virtualized Rows */}
              <List
                height={height - ROW_HEIGHT}
                width={width}
                itemCount={customQueryObject.data.length}
                itemSize={ROW_HEIGHT}
                overscanCount={5}
              >
                {({ index, style }) => {
                  const row = customQueryObject.data[index];
                  return (
                    <div
                      style={{ ...style, display: "flex", width }}
                      key={index}
                    >
                      {row.map((value, cellIndex) => {
                        const columnWidth =
                          100 / customQueryObject.columns.length;
                        return (
                          <div
                            key={cellIndex}
                            className="border-primary/5 overflow-hidden border-t p-2 text-ellipsis whitespace-nowrap"
                            style={{
                              width: `${columnWidth}%`,
                              minWidth: "100px",
                              flexShrink: 0
                            }}
                          >
                            {value !== null ? (
                              <Span className="text-xs">{String(value)}</Span>
                            ) : (
                              <Badge>NULL</Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </List>
            </div>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

export default CustomQueryDataTable;
