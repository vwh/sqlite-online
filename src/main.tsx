import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppToaster from "@/components/common/Toaster/Toaster";
import ThemeProvider from "@/providers/theme/ThemeProvider.tsx";
import DatabaseWorkerProvider from "@/providers/worker/WorkerProvider.tsx";
import PanelProvider from "@/providers/panel/PanelProvider";

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
