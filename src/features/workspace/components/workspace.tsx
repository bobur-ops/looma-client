import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceEditor } from "./workspace-editor";
import { useGetEditingNote } from "../model/useGetEditingNote";

export default function Workspace() {
  const { data: note } = useGetEditingNote();

  const content = useMemo(() => {
    const version = note?.version;
    return (
      <ScrollArea className="h-full pt-12">
        <WorkspaceHeader />
        Version - {version}
        <WorkspaceEditor />
      </ScrollArea>
    );
  }, [note]);

  return <main className="h-full relative">{content}</main>;
}
