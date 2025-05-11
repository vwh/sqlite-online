import useDatabaseWorker from "@/hooks/useWorker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/theme/ModeToggle";

import { DatabaseIcon, SaveIcon, GithubIcon } from "lucide-react";

function TopBar() {
  const { handleFileChange, handleDownload } = useDatabaseWorker();

  return (
    <header className="flex items-center justify-between gap-2 border-b px-1 py-1.5">
      <div className="flex items-center gap-1">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer transition-opacity hover:opacity-80"
        >
          <Input
            id="file-upload"
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileChange}
          />
          <Button
            size="sm"
            variant="outline"
            className="border-foreground/25 pointer-events-none h-8 cursor-pointer px-3 text-xs font-medium sm:w-[200px]"
          >
            <DatabaseIcon className="mr-1.5 h-3.5 w-3.5" />
            Open Database
          </Button>
        </label>
        <Button
          size="sm"
          variant="outline"
          className="border-foreground/25 h-8 px-3 text-xs font-medium"
          onClick={handleDownload}
          title="Save the database"
        >
          <SaveIcon className="mr-1.5 h-3.5 w-3.5" />
          Save Database
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <a
          href="https://github.com/vwh/sqlite-online"
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Button
            size="icon"
            variant="ghost"
            className="hidden h-8 w-8 sm:flex"
            title="View Source Code on GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </Button>
        </a>

        <ModeToggle />
      </div>
    </header>
  );
}

export default TopBar;
