import { useDatabaseWorker } from "@/providers/DatabaseWorkerProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/theme/ModeToggle";

import { DatabaseIcon, SaveIcon, GithubIcon } from "lucide-react";

const TopBar = () => {
  const { handleFileChange, handleDownload } = useDatabaseWorker();

  return (
    <header className="flex items-center justify-between gap-2 border-b px-2 py-1.5 shadow-sm">
      <div className="flex items-center">
        <a
          href="https://github.com/vwh/sqlite-online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/logo.webp"
            alt="Logo"
            className="h-6 w-6"
            aria-hidden="true"
          />
        </a>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <Input
              id="file-upload"
              type="file"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={handleFileChange}
            />
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-medium shadow-sm sm:w-[200px]"
            >
              <DatabaseIcon className="mr-1.5 h-3.5 w-3.5" />
              Open Database
            </Button>
          </label>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs font-medium shadow-sm"
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
      </div>
    </header>
  );
};

export default TopBar;
