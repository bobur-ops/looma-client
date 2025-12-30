import { useTimeAgo } from "@/hooks/useTimeAgo";
import { useGetEditingNote } from "../model/useGetEditingNote";
import { EditableTitle } from "./editable-title";

export const WorkspaceHeader = () => {
  const { data: editingNote } = useGetEditingNote();

  const relativeTime = useTimeAgo(editingNote?.updatedAt ?? "");

  return (
    <div className="absolute z-10 left-0 right-0 top-0 border-b bg-background">
      <div className="px-4 py-2 flex relative">
        <EditableTitle />

        {!!editingNote && (
          <div className="absolute text-sm text-muted-foreground right-2 bottom-1">
            Synced: {relativeTime}
          </div>
        )}
      </div>
    </div>
  );
};
