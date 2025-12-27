import { cn } from "@/lib/utils";
import type { NoteListItemInterface } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: NoteListItemInterface;
};

export const NoteListItem = ({ data }: Props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="select-none border-b flex items-center px-2 hover:bg-muted active:bg-accent h-10"
    >
      <span className={cn({ "text-muted-foreground": !data.title })}>
        {data.title || "No title"}
      </span>
    </div>
  );
};

export const NoteListItemSkeleton = () => {
  return (
    <div className="h-10 flex justify-center items-center p-2 border-b">
      <Skeleton className="h-3 w-full" />
    </div>
  );
};
