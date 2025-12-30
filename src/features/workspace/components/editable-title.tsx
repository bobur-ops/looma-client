import { useGetEditingNote } from "../model/useGetEditingNote";
import { usePatchNote } from "@/features/notes/api/mutations";
import { useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { selectIsNoteDirty } from "../model/workspace-slice";
import { cn } from "@/lib/utils";

export const EditableTitle = () => {
  const { data: note } = useGetEditingNote();
  const patchNote = usePatchNote();
  const [title, setTitle] = useState("");
  const isDirty = useAppSelector(selectIsNoteDirty(note?.id ?? ""));

  useEffect(() => {
    if (note?.title !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(note.title);
    }
  }, [note?.title]);

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        className={cn("focus-visible:ring-0 min-w-[500px] w-full text-2xl", {
          "italic text-primary": isDirty,
        })}
        placeholder="Edit title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => {
          if (!note) return;
          patchNote.mutate({
            noteId: note.id,
            version: note.version,
            title,
          });
        }}
      />
    </div>
  );
};
