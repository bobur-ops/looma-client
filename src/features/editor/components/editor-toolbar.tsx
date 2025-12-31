import { Button } from "@/components/ui/button";
import type { EditorCommand } from "../lib/commands";
import { Bold, Heading, Italic } from "lucide-react";

type EditorToolbarProps = {
  onCommand: (command: EditorCommand) => void;
};

export const EditorToolbar = ({ onCommand }: EditorToolbarProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Button
        onClick={() => onCommand("bold")}
        size={"icon"}
        variant={"outline"}
      >
        <Bold className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("italic")}
        size={"icon"}
        variant={"outline"}
      >
        <Italic className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("heading")}
        size={"icon"}
        variant={"outline"}
      >
        <Heading className="size-5" />
      </Button>
    </div>
  );
};
