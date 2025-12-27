import { useGetNoteByIdQuery } from "@/features/notes/api/queries";
import { selectEditingNoteId } from "@/features/notes/model/slice";
import { useAppSelector } from "@/hooks/redux";

export const useGetEditingNote = () => {
  const editingNoteId = useAppSelector(selectEditingNoteId);
  const result = useGetNoteByIdQuery(editingNoteId);

  return result;
};
