import { useState, useMemo, useCallback } from "react";
import { useDatabaseStore } from "@/store/useDatabaseStore";

import type { TableSchema } from "@/types";

import TablesSection from "./TablesSection";
import IndexesSection from "./IndexesSection";
import SchemaSearch from "./SchemaSearch";

const SchemaTree = () => {
  const [filter, setFilter] = useState("");
  const tablesSchema = useDatabaseStore((state) => state.tablesSchema);
  const indexesSchema = useDatabaseStore((state) => state.indexesSchema);

  const [expandedTables, setExpandedTables] = useState<string[]>([]);
  const [expandedTableSection, setExpandedTableSection] = useState(true);
  const [expandedIndexSection, setExpandedIndexSection] = useState(true);

  const toggleTable = useCallback((tableName: string) => {
    setExpandedTables((prevExpanded) =>
      prevExpanded.includes(tableName)
        ? prevExpanded.filter((name) => name !== tableName)
        : [...prevExpanded, tableName]
    );
  }, []);

  const toggleTableSection = useCallback(() => {
    setExpandedTableSection((prev) => !prev);
  }, []);

  const toggleIndexSection = useCallback(() => {
    setExpandedIndexSection((prev) => !prev);
  }, []);

  const expandAllTables = useCallback((tablesSchema: TableSchema) => {
    setExpandedTables(Object.keys(tablesSchema));
    setExpandedTableSection(true);
  }, []);

  const collapseAllTables = useCallback(() => {
    setExpandedTables([]);
    setExpandedTableSection(false);
  }, []);

  const filteredTables = useMemo(() => {
    if (!filter) return tablesSchema;

    const filtered: TableSchema = {};

    for (const [tableName, tableData] of Object.entries(tablesSchema)) {
      if (tableName.toLowerCase().includes(filter.toLowerCase())) {
        filtered[tableName] = tableData;
      }
    }

    return filtered;
  }, [tablesSchema, filter]);

  const filteredIndexes = useMemo(() => {
    if (!filter) return indexesSchema;

    return indexesSchema.filter(
      (index) =>
        index.name.toLowerCase().includes(filter.toLowerCase()) ||
        index.tableName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [indexesSchema, filter]);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden">
      <div className="bg-primary/5 border-b p-2">
        <SchemaSearch onFilterChange={setFilter} />
      </div>
      <nav className="flex-1 overflow-auto">
        <TablesSection
          tablesSchema={filteredTables}
          expandedTableSection={expandedTableSection}
          toggleTableSection={toggleTableSection}
          expandAllTables={expandAllTables}
          collapseAllTables={collapseAllTables}
          expandedTables={expandedTables}
          toggleTable={toggleTable}
        />
        {indexesSchema.length > 0 && (
          <IndexesSection
            indexes={filteredIndexes}
            expandedIndexSection={expandedIndexSection}
            toggleIndexSection={toggleIndexSection}
          />
        )}
      </nav>
    </section>
  );
};

export default SchemaTree;
