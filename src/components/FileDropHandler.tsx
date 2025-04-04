import { useCallback, useEffect, useState } from "react";

import { toast } from "sonner";

import { Upload } from "lucide-react";
import { useDatabaseWorker } from "@/providers/DatabaseWorkerProvider";

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
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="border-primary bg-background flex h-64 w-96 flex-col items-center justify-center rounded border-2 border-dashed p-6">
            <Upload className="text-primary mb-4 h-12 w-12" />
            <h3 className="text-xl font-medium">Drop Database Here</h3>
          </div>
        </section>
      )}
    </>
  );
}

export default FileDropHandler;
