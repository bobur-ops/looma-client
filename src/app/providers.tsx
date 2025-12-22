import { ThemeProvider } from "@/features/theme/components/theme-provider";
import type { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}
