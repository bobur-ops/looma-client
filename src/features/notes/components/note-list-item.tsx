import { cn } from "@/lib/utils";
import type { NoteListItemInterface } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  data: NoteListItemInterface;
  isActive: boolean;
  onSelect: (id: string) => void;
  onPatchPinned: (noteId: string, version: number, isPinned: boolean) => void;
};

export const NoteListItem = ({
  data,
  isActive,
  onSelect,
  onPatchPinned,
}: Props) => {
  return (
    <div
      role="button"
      onClick={() => onSelect(data.id)}
      tabIndex={0}
      className={cn(
        "select-none bg-background border-b flex items-center px-2 py-2",
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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            size={"icon-sm"}
            variant={"ghost"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              onPatchPinned(data.id, data.version, !data.isPinned);
            }}
          >
            {data.isPinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const NoteListItemSkeleton = () => {
  return (
    <div className="flex justify-center items-center p-2 py-4 border-b">
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
