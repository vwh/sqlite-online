import { useCallback, useEffect, useState } from "react";
import { useDatabaseWorker } from "@/providers/DatabaseWorkerProvider";

import { toast } from "sonner";

import { DatabaseIcon } from "lucide-react";

interface FileDropHandlerProps {
  children: React.ReactNode;
}

function FileDropHandler({ children }: FileDropHandlerProps) {
  const { handleFileUpload } = useDatabaseWorker();

  const [isDragging, setIsDragging] = useState(false);

  // Handle when user drags over the drop zone
  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  // Handle when user leaves the drop zone
  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  // Handle when user drops file
  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      try {
        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) {
          toast.error("No file detected");
          return;
        }

        const file = files[0];
        handleFileUpload(file);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to process file";
        toast.error(`Failed to process file: ${errorMessage}`);
      }
    },
    [handleFileUpload]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleDragOver, handleDragLeave, handleDrop]);

  return (
    <>
      {children}
      {isDragging && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
          <div className="border-primary/60 bg-background/95 animate-in fade-in zoom-in-95 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 shadow-lg transition-transform duration-200">
            <div className="bg-primary/10 mb-6 flex items-center justify-center rounded-full p-5">
              <DatabaseIcon className="text-primary h-12 w-12" />
            </div>

            <h3 className="mb-2 text-xl font-medium">Drop SQLite Database</h3>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              Release to load your database file
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export default FileDropHandler;
