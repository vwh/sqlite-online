import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppToaster } from "@/components/Toaster.tsx";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { DatabaseWorkerProvider } from "@/providers/DatabaseWorkerProvider";
import { PanelProvider } from "@/providers/PanelProvider";

import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <PanelProvider>
        <DatabaseWorkerProvider>
          <App />
        </DatabaseWorkerProvider>
      </PanelProvider>
      <AppToaster />
    </ThemeProvider>
  </StrictMode>
);
