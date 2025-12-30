import type { EditorCommand } from "../lib/commands";
import { Bold, Italic } from "lucide-react";

type EditorToolbarProps = {
  onCommand: (command: EditorCommand) => void;
};

export const EditorToolbar = ({ onCommand }: EditorToolbarProps) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => onCommand("bold")}
        className="text-muted-foreground hover:text-primary-foreground cursor-pointer transition-all"
      >
        <Bold />
      </button>
      <button
        onClick={() => onCommand("italic")}
        className="text-muted-foreground hover:text-primary-foreground cursor-pointer transition-all"
      >
        <Italic />
      </button>
    </div>
  );
};
