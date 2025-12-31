import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceEditor } from "./workspace-editor";
import { useAppSelector } from "@/hooks/redux";
import { selectEditingNoteId } from "@/features/notes/model/notes-slice";
import { WorkspaceProvider } from "../model/workspace-context";

export default function Workspace() {
  const noteId = useAppSelector(selectEditingNoteId);

  const content = useMemo(() => {
    if (!noteId) {
      return <div>There is no current editing note</div>;
    }

    return (
      <ScrollArea className="h-full pt-[96px]">
        <WorkspaceHeader />
        <WorkspaceEditor />
      </ScrollArea>
    );
  }, [noteId]);

  return (
    <WorkspaceProvider>
      <main className="h-full relative">{content}</main>
    </WorkspaceProvider>
  );
}
