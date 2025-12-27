import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceEditor } from "./workspace-editor";
import { useGetEditingNote } from "../model/useGetEditingNote";

export default function Workspace() {
  useGetEditingNote();

  const content = useMemo(() => {
    return (
      <ScrollArea className="h-full pt-12">
        <WorkspaceHeader />
        <WorkspaceEditor />
      </ScrollArea>
    );
  }, []);

  return <main className="h-full relative">{content}</main>;
}
