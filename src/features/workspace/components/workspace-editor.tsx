import Editor from "@/features/editor/components/Editor";
import { usePatchNote } from "@/features/notes/api/mutations";
import { useGetEditingNote } from "../model/useGetEditingNote";
import { useCallback } from "react";
import { useAutoSaveEditor } from "../model/useAutoSaveEditor";
import { Spinner } from "@/components/ui/spinner";

export const WorkspaceEditor = () => {
  const { mutate: patchNote, isPending } = usePatchNote();
  const { data: editingNote } = useGetEditingNote();

  const handleSave = useCallback(
    (params: { noteId: string; version: number; body: string }) => {
      patchNote(params);
    },
    [patchNote]
  );

  const { value, onChange } = useAutoSaveEditor({
    noteId: editingNote?.id,
    noteVersion: editingNote?.version,
    initialBody: editingNote?.body ?? "",
    onSave: handleSave,
  });

  if (!editingNote) return null;

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute z-10 right-2 top-0 flex items-center gap-2 text-muted-foreground">
          <Spinner size={14} /> Saving...
        </div>
      )}
      <Editor value={value} onChange={onChange} />
    </div>
  );
};
