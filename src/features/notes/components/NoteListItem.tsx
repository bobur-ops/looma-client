import { cn } from "@/lib/utils";
import type { NoteListItemInterface } from "../types";

type Props = {
  data: NoteListItemInterface;
};

export const NoteListItem = ({ data }: Props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="select-none border-b p-2 hover:bg-muted active:bg-accent"
    >
      <span className={cn({ "text-muted-foreground": !data.title })}>
        {data.title || "New Note"}
      </span>
    </div>
  );
};
