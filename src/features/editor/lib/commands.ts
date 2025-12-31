import type { EditorView, KeyBinding } from "@codemirror/view";

export const editorCommands = {
  bold: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const before = doc.slice(from - 2, from);
    const after = doc.slice(to, to + 2);

    if (before === "**" && after === "**") {
      view.dispatch({
        changes: [
          { from: from - 2, to: from },
          { from: to, to: to + 2 },
        ],
        selection: {
          anchor: from - 2,
          head: to - 2,
        },
      });
    } else if (from !== to) {
      view.dispatch({
        changes: { from, to, insert: `**${state.sliceDoc(from, to)}**` },
        selection: {
          anchor: from + 2,
          head: to + 2,
        },
      });
    } else {
      view.dispatch({
        changes: { from, insert: "****" },
        selection: { anchor: from + 2 },
      });
    }

    view.focus();
    return true;
  },
  italic: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const before = doc.slice(from - 1, from);
    const after = doc.slice(to, to + 1);

    if (before === "*" && after === "*") {
      view.dispatch({
        changes: [
          {
            from: from - 1,
            to: from,
          },
          {
            from: to,
            to: to + 1,
          },
        ],
        selection: {
          anchor: from - 1,
          head: to - 1,
        },
      });
    } else if (from !== to) {
      view.dispatch({
        changes: { from, to, insert: `*${state.sliceDoc(from, to)}*` },
        selection: {
          anchor: from + 1,
          head: to + 1,
        },
      });
    } else {
      view.dispatch({
        changes: { from, insert: "**" },
        selection: { anchor: from + 1 },
      });
    }

    view.focus();
    return true;
  },
  heading: (view: EditorView) => {
    const { state } = view;
    const { from } = state.selection.main;

    const line = state.doc.lineAt(from);
    const lineText = line.text;

    const match = lineText.match(/^(#{1,6})\s+/);

    let newPrefix = "";
    const removeFrom = line.from;
    let removeTo = line.from;

    if (!match) {
      newPrefix = "# ";
    } else {
      const level = match[1].length;

      if (level < 6) {
        newPrefix = "#".repeat(level + 1) + " ";
      } else {
        newPrefix = "";
      }

      removeTo = line.from + match[0].length;
    }

    view.dispatch({
      changes: [
        ...(match ? [{ from: removeFrom, to: removeTo }] : []),
        ...(newPrefix ? [{ from: line.from, insert: newPrefix }] : []),
      ],
      selection: {
        anchor: from + (newPrefix.length - (match?.[0].length ?? 0)),
      },
    });

    view.focus();
    return true;
  },
  code: (view: EditorView) => {},
  codeBlock: (view: EditorView) => {},
  link: (view: EditorView) => {},
  bulletList: (view: EditorView) => {},
  numberedList: (view: EditorView) => {},
  blockquote: (view: EditorView) => {},
  horizontalRule: (view: EditorView) => {},
};

export type EditorCommand = keyof typeof editorCommands;

export const customKeymap: readonly KeyBinding[] = [
  {
    key: "Mod-b",
    run: (view) => editorCommands.bold(view),
  },
  {
    key: "Mod-i",
    run: (view) => editorCommands.italic(view),
  },
];
