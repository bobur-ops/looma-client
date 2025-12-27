import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetNotesQuery } from "../api/queries";
import { useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { NoteListItem } from "./NoteListItem";

export const NoteList = () => {
  const { data, isFetching } = useGetNotesQuery();

  const notes = useMemo(() => {
    if (!data) return <div>No Data Yet</div>;

    return data.data.map((note) => <NoteListItem key={note.id} data={note} />);
  }, [data]);

  return (
    <div className="h-full relative pt-11">
      <NoteListHeader isFetching={isFetching} />
      <ScrollArea className="flex-1 h-full">
        <section>{notes}</section>
      </ScrollArea>
    </div>
  );
};

type NoteListHeaderProps = {
  isFetching: boolean;
};

const NoteListHeader = ({ isFetching }: NoteListHeaderProps) => {
  const headerText = useMemo(() => {
    if (isFetching)
      return (
        <div className="flex gap-2 items-center">
          <Spinner /> <span>Updating...</span>
        </div>
      );

    return "Notes";
  }, [isFetching]);

  return (
    <div className="absolute left-0 top-0 right-0 border-b h-11 flex justify-center items-center">
      <h2 className="font-medium">{headerText}</h2>
    </div>
  );
};
