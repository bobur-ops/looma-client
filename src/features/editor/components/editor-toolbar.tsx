import { Button } from "@/components/ui/button";
import type { EditorCommand } from "../lib/commands";
import {
  Bold,
  Code,
  CodeXml,
  Heading,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  SquareCheck,
  Strikethrough,
  Table,
} from "lucide-react";

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
        onClick={() => onCommand("strikeThrough")}
        size={"icon"}
        variant={"outline"}
      >
        <Strikethrough className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("highlight")}
        size={"icon"}
        variant={"outline"}
      >
        <Highlighter className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("code")}
        size={"icon"}
        variant={"outline"}
      >
        <Code className="size-5" />
      </Button>

      <div className="h-9 w-px bg-accent mx-2" />

      <Button
        onClick={() => onCommand("heading")}
        size={"icon"}
        variant={"outline"}
      >
        <Heading className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("horizontalRule")}
        size={"icon"}
        variant={"outline"}
      >
        <Minus className="size-5" />
      </Button>

      <div className="h-9 w-px bg-accent mx-2" />

      <Button
        onClick={() => onCommand("bulletList")}
        size={"icon"}
        variant={"outline"}
      >
        <List className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("numberedList")}
        size={"icon"}
        variant={"outline"}
      >
        <ListOrdered className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("checkbox")}
        size={"icon"}
        variant={"outline"}
      >
        <SquareCheck className="size-5" />
      </Button>

      <div className="h-9 w-px bg-accent mx-2" />
      <Button
        onClick={() => onCommand("blockquote")}
        size={"icon"}
        variant={"outline"}
      >
        <Quote className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("codeBlock")}
        size={"icon"}
        variant={"outline"}
      >
        <CodeXml className="size-5" />
      </Button>
      <Button
        onClick={() => onCommand("tableHelper")}
        size={"icon"}
        variant={"outline"}
      >
        <Table className="size-5" />
      </Button>

      <div className="h-9 w-px bg-accent mx-2" />

      <Button
        onClick={() => onCommand("link")}
        size={"icon"}
        variant={"outline"}
      >
        <Link className="size-5" />
      </Button>

      <Button
        onClick={() => onCommand("inlineImage")}
        size={"icon"}
        variant={"outline"}
      >
        <Image className="size-5" />
      </Button>
    </div>
  );
};
