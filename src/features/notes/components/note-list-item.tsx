import { cn } from "@/lib/utils";
import type { NoteListItemInterface } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: NoteListItemInterface;
  onSelect: (id: string) => void;
  isActive: boolean;
};

export const NoteListItem = ({ data, onSelect, isActive }: Props) => {
  return (
    <div
      role="button"
      onClick={() => onSelect(data.id)}
      tabIndex={0}
      data-active={isActive}
      className={cn(
        "select-none border-b flex items-center px-2 h-10",
        "hover:bg-muted active:bg-accent",
        "data-[active=true]:bg-accent"
      )}
    >
      <span
        className={cn("truncate w-full whitespace-nowrap", {
          "text-muted-foreground": !data.title,
        })}
      >
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
