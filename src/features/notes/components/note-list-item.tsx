import { cn } from "@/lib/utils";
import type { NoteListItemInterface } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Pin, Trash2 } from "lucide-react";

type Props = {
  data: NoteListItemInterface;
  isActive: boolean;
  onSelect: (id: string) => void;
  onPatchPinned: (noteId: string, version: number, isPinned: boolean) => void;
  onDelete: (noteId: string) => void;
};

export const NoteListItem = ({
  data,
  isActive,
  onSelect,
  onPatchPinned,
  onDelete,
}: Props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          role="button"
          onClick={() => onSelect(data.id)}
          tabIndex={0}
          className={cn(
            "select-none bg-background border-b flex gap-2 px-2 py-2",
            "hover:brightness-110",
            {
              "bg-muted": data.isPinned,
              "bg-accent": isActive,
            }
          )}
        >
          <span
            className={cn("w-full line-clamp-2 flex-1", {
              "text-muted-foreground": !data.title,
            })}
          >
            {data.title || "No title"}
          </span>

          {data.isPinned && (
            <Pin className="text-muted-foreground size-4 rotate-45" />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            onPatchPinned(data.id, data.version, !data.isPinned);
          }}
        >
          <Pin />
          {data.isPinned ? "Unpin" : "Pin"}
        </ContextMenuItem>
        <ContextMenuItem
          variant="destructive"
          onClick={() => onDelete(data.id)}
        >
          <Trash2 />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const NoteListItemSkeleton = () => {
  return (
    <div className="flex justify-center items-center p-2 py-4 border-b">
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
