import { syntaxHighlighting } from "@codemirror/language";
import { oneDarkHighlightStyle } from "./themes/oneDark";

export const editorHighlightStyle = [
  syntaxHighlighting(oneDarkHighlightStyle, { fallback: true }),
];
