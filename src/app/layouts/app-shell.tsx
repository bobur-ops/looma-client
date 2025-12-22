import type { PropsWithChildren } from "react";

export default function AppShell({ children }: PropsWithChildren) {
  return <div className="h-dvh relative">{children}</div>;
}
