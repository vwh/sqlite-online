import { useDatabaseStore } from "./store/useDatabaseStore";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopBar from "./components/TopBar";
import StructureTab from "@/components/structureTab/StructureTab";
import BrowseTab from "@/components/browseTab/BrowseTab";
import ExecuteTab from "@/components/executeTab/ExecuteTab";

import FileDropHandler from "./components/FileDropHandler";

import {
  CodeIcon,
  DatabaseIcon,
  LoaderCircleIcon,
  TableIcon
} from "lucide-react";

export default function App() {
  const isDatabaseLoading = useDatabaseStore(
    (state) => state.isDatabaseLoading
  );

  return (
    <FileDropHandler>
      <main className="bg-primary/5 flex h-screen flex-col overflow-hidden">
        <TopBar />
        <Tabs defaultValue="data" className="flex flex-1 flex-col">
          <TabsList className="bg-primary/5 mt-2 h-9 w-full justify-start rounded-none border-b">
            <TabsTrigger
              id="structure"
              key="structure"
              disabled={isDatabaseLoading}
              value="structure"
              className="data-[state=active]: data-[state=active]:border-primary h-8 rounded-none text-xs"
            >
              <DatabaseIcon className="hidden h-4 w-4 md:block" />
              Database Structure
            </TabsTrigger>
            <TabsTrigger
              id="data"
              key="data"
              disabled={isDatabaseLoading}
              value="data"
              className="data-[state=active]: data-[state=active]:border-primary h-8 rounded-none text-xs"
            >
              <TableIcon className="hidden h-4 w-4 md:block" />
              <span>Browse Data</span>
            </TabsTrigger>
            <TabsTrigger
              disabled={isDatabaseLoading}
              id="execute"
              key="execute"
              value="execute"
              className="data-[state=active]: data-[state=active]:border-primary h-8 rounded-none text-xs"
            >
              <CodeIcon className="hidden h-4 w-4 md:block" />
              Execute SQL
            </TabsTrigger>
          </TabsList>

          <div className="max-h-custom-dvh flex-1 overflow-hidden">
            <TabsContent value="data" className="m-0 h-full border-none p-0">
              {isDatabaseLoading ? (
                <LoadingIndicator message="Loading Database" />
              ) : (
                <BrowseTab />
              )}
            </TabsContent>
            <TabsContent
              value="structure"
              className="m-0 h-full border-none p-0"
            >
              <StructureTab />
            </TabsContent>
            <TabsContent
              value="execute"
              className="m-0 h-full border border-none p-0"
            >
              <ExecuteTab />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </FileDropHandler>
  );
}

const LoadingIndicator = ({ message }: { message: string }) => (
  <div className="flex h-full flex-col items-center justify-center gap-4">
    <div className="bg-primary/10 rounded-full p-4">
      <LoaderCircleIcon className="text-primary h-8 w-8 animate-spin" />
    </div>
    <div className="flex flex-col items-center">
      <span className="text-xl font-medium">{message}</span>
      <span className="text-muted-foreground text-sm">
        Please wait while the database is initializing
      </span>
    </div>
  </div>
);
