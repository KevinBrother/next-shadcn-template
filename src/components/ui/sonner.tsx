"use client";

import { useTheme } from "next-themes";
import { ExternalToast, Toaster as Sonner, ToasterProps, toast } from "sonner";

type titleT = (() => React.ReactNode) | React.ReactNode;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

const quickMsg = {
  success: (message: titleT | React.ReactNode, data?: ExternalToast) =>
    toast.success(message, { position: "top-center", ...data }),
  error: (message: titleT | React.ReactNode, data?: ExternalToast) =>
    toast.error(message, { position: "top-center", ...data }),
  info: (message: titleT | React.ReactNode, data?: ExternalToast) =>
    toast.info(message, { position: "top-center", ...data }),
  warning: (message: titleT | React.ReactNode, data?: ExternalToast) =>
    toast.warning(message, { position: "top-center", ...data }),
  loading: (message: titleT | React.ReactNode, data?: ExternalToast) =>
    toast.loading(message, { position: "top-center", ...data }),
};

export * from "sonner";
export { Toaster, quickMsg };
