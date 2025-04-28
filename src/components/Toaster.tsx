import React from "react";
import { toast, Toaster } from "sonner";

import { CheckCircle2Icon, InfoIcon, AlertCircleIcon } from "lucide-react";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "custom-toast",
        duration: 2000,
        style: {
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)"
        }
      }}
    />
  );
}

export function toastSuccess(message: string | React.ReactNode, options = {}) {
  if (typeof message === "string") {
    return toast(
      <div className="flex items-center gap-2">
        <CheckCircle2Icon className="h-5 w-5 text-green-500" />
        <div className="flex-1 capitalize">{message}</div>
      </div>,
      {
        style: {
          borderLeft: "4px solid #22c55e",
          background: "var(--background)"
        },
        ...options
      }
    );
  } else {
    return toast(message, {
      style: {
        borderLeft: "4px solid #22c55e",
        background: "var(--background)"
      },
      ...options
    });
  }
}

export function toastError(message: string | React.ReactNode, options = {}) {
  if (typeof message === "string") {
    return toast(
      <div className="flex items-center gap-2">
        <AlertCircleIcon className="h-5 w-5 text-red-500" />
        <div className="flex-1 capitalize">{message}</div>
      </div>,
      {
        style: {
          borderLeft: "4px solid #ef4444",
          background: "var(--background)"
        },
        ...options
      }
    );
  } else {
    return toast(message, {
      style: {
        borderLeft: "4px solid #ef4444",
        background: "var(--background)"
      },
      ...options
    });
  }
}

export function toastInfo(message: string | React.ReactNode, options = {}) {
  if (typeof message === "string") {
    return toast(
      <div className="flex items-center gap-2">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <div className="flex-1 capitalize">{message}</div>
      </div>,
      {
        style: {
          borderLeft: "4px solid #3b82f6",
          background: "var(--background)"
        },
        ...options
      }
    );
  } else {
    return toast(message, {
      style: {
        borderLeft: "4px solid #3b82f6",
        background: "var(--background)"
      },
      ...options
    });
  }
}

// export function toastLoading(message: string) {
//   return toast(
//     <div className="flex items-center gap-2">
//       <div className="flex-1 capitalize">{message}</div>
//     </div>,
//     {
//       style: {
//         borderLeft: "4px solid var(--primary)",
//         background: "var(--background)"
//       }
//     }
//   );
// }
