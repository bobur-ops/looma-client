import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetNotesQuery } from "../api/queries";
import { useMemo } from "react";
import { Spinner } from "@/components/ui/spinner";
import { NoteListItem, NoteListItemSkeleton } from "./NoteListItem";
import Empty from "@/components/ui/empty";

export const NoteList = () => {
  const { data, isFetching, isLoading } = useGetNotesQuery();

  const notes = useMemo(() => {
    const list = data?.data || [];

    if (isLoading) {
      return Array.from({ length: 10 }).map((_, index) => (
        <NoteListItemSkeleton key={index} />
      ));
    }

    if (!list.length && !isLoading)
      return (
        <div className="p-5">
          <Empty />
        </div>
      );

    return list.map((note) => <NoteListItem key={note.id} data={note} />);
  }, [data]);

  return (
    <div className="h-full relative pt-12">
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
          <Spinner size={16} /> <span>Updating...</span>
        </div>
      );

    return "Notes";
  }, [isFetching]);

  return (
    <div className="absolute left-0 top-0 right-0 border-b h-12 flex justify-center items-center">
      <h2>{headerText}</h2>
    </div>
  );
};
