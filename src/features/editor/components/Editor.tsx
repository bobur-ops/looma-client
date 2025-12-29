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

  // Always call the latest onChange without rebuilding extensions.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Prevent “external value effect” from reacting to our own typing.
  const applyingExternalRef = useRef(false);

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
        if (applyingExternalRef.current) return;

        const next = v.state.doc.toString();
        onChangeRef.current?.(next);
      }),
      EditorView.theme(theme),
    ];
  }, [placeholder, readOnly]);

  // Create the editor once.
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
    // extensions are safe here because we only create once anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply external value changes without nuking selection unless needed.
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const current = view.state.doc.toString();
    const next = value ?? "";

    if (next === current) return;

    applyingExternalRef.current = true;
    try {
      const sel = view.state.selection.main; // keep cursor if possible

      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: next },
        selection: { anchor: Math.min(sel.anchor, next.length) },
        scrollIntoView: true,
      });
    } finally {
      applyingExternalRef.current = false;
    }
  }, [value]);

  return (
    <div className={["h-full", "overflow-hidden", className ?? ""].join(" ")}>
      <div ref={hostRef} />
    </div>
  );
}
