import { useEffect, useMemo, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  placeholder as cmPlaceholder,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { editorHighlightStyle } from "../lib/highlight";
import { theme } from "../lib/theme";

type EditorProps = {
  value: string;
  onChange?: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export default function Editor({
  value,
  className,
  onChange,
  placeholder,
  readOnly,
}: EditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const extensions = useMemo(() => {
    return [
      lineNumbers(),
      highlightActiveLine(),
      history(),
      keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
      markdown({ codeLanguages: languages }),
      editorHighlightStyle,
      cmPlaceholder(placeholder || "Start writing..."),
      EditorView.lineWrapping,
      EditorView.editable.of(!readOnly),
      EditorView.contentAttributes.of({
        "aria-label": "Markdown editor",
        "data-placeholder": placeholder || "Start writing...",
      }),
      EditorView.updateListener.of((v) => {
        if (!v.docChanged) return;
        const next = v.state.doc.toString();
        onChange?.(next);
      }),
      EditorView.theme(theme),
    ];
  }, [onChange, placeholder, readOnly]);

  useEffect(() => {
    if (!hostRef.current) return;
    if (viewRef.current) return;

    const state = EditorState.create({
      doc: value ?? "",
      extensions,
    });

    const view = new EditorView({
      state,
      parent: hostRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [extensions]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (value === current) return;

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value ?? "" },
    });
  }, [value]);

  return (
    <div className={["h-full", "overflow-hidden", className ?? ""].join(" ")}>
      <div ref={hostRef} />
    </div>
  );
}
