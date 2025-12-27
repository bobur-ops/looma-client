// import { useQueryClient } from "@tanstack/react-query";
import { useGetEditingNote } from "../model/useGetEditingNote";
import { usePatchNote } from "@/features/notes/api/mutations";
import { useEffect, useState } from "react";

export const EditableTitle = () => {
  const { data: note } = useGetEditingNote();
  // const queryClient = useQueryClient();
  const patchNote = usePatchNote();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (note?.title !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(note.title);
    }
  }, [note?.title]);

  return (
    <div>
      <input
        className="focus-visible:ring-0 min-w-[500px] text-2xl"
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
