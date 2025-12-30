import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useGetEditingNote } from "../model/use-get-editing-note";
import { EditableTitle } from "./editable-title";
import { EditorToolbar } from "@/features/editor/components/editor-toolbar";
import { useWorkspaceEditor } from "../model/workspace-context";

export const WorkspaceHeader = () => {
  const { data: editingNote } = useGetEditingNote();
  const { executeCommand } = useWorkspaceEditor();

  const relativeTime = useTimeAgo(editingNote?.updatedAt ?? "");

  return (
    <div className="absolute z-10 left-0 right-0 top-0 border-b bg-background">
      <div className="relative px-4 py-2">
        <div className="flex mb-3">
          <EditableTitle />
        </div>
        {!!editingNote && (
          <div className="absolute text-sm text-muted-foreground right-2 top-1">
            Synced: {relativeTime}
          </div>
        )}

        {!!editingNote && <EditorToolbar onCommand={executeCommand} />}
      </div>
    </div>
  );
};
