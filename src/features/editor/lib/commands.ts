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
  code: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const before = doc.slice(from - 1, from);
    const after = doc.slice(to, to + 1);

    if (before === "`" && after === "`") {
      view.dispatch({
        changes: [
          { from: from - 1, to: from },
          { from: to, to: to + 1 },
        ],
        selection: {
          anchor: from - 1,
          head: to - 1,
        },
      });
    } else if (from !== to) {
      view.dispatch({
        changes: {
          from,
          to,
          insert: `\`${state.sliceDoc(from, to)}\``,
        },
        selection: {
          anchor: from + 1,
          head: to + 1,
        },
      });
    } else {
      view.dispatch({
        changes: { from, insert: "``" },
        selection: { anchor: from + 1 },
      });
    }

    view.focus();
    return true;
  },
  codeBlock: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc;

    const startLine = doc.lineAt(from);
    const endLine = doc.lineAt(to);

    const beforeLine = doc.lineAt(Math.max(1, startLine.from - 1));
    const afterLine = doc.lineAt(Math.min(doc.length, endLine.to + 1));

    const isWrapped =
      beforeLine.text.startsWith("```") && afterLine.text.startsWith("```");

    if (isWrapped) {
      // unwrap fenced block
      view.dispatch({
        changes: [
          { from: beforeLine.from, to: beforeLine.to + 1 },
          { from: afterLine.from - 4, to: afterLine.to },
        ],
        selection: {
          anchor: from - (beforeLine.to - beforeLine.from + 1),
          head: to - (beforeLine.to - beforeLine.from + 1),
        },
      });
    } else {
      // wrap selection or current line(s)
      const insertFrom = startLine.from;
      const insertTo = endLine.to;

      const selectedText = state.sliceDoc(insertFrom, insertTo);

      view.dispatch({
        changes: {
          from: insertFrom,
          to: insertTo,
          insert: `\`\`\`\n${selectedText}\n\`\`\``,
        },
        selection: {
          anchor: insertFrom + 4,
          head: insertFrom + 4 + selectedText.length,
        },
      });
    }

    view.focus();
    return true;
  },

  link: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const after = doc.slice(to, to + 1);

    // Try to detect existing [text](url)
    const linkRegex = /\[([^\]]*)\]\(([^)]*)\)$/;
    const beforeText = doc.slice(0, from);
    const match = beforeText.match(linkRegex);

    if (match && after === ")") {
      const fullMatch = match[0];
      const text = match[1];

      const start = from - fullMatch.length;
      const end = to + 1;

      view.dispatch({
        changes: {
          from: start,
          to: end,
          insert: text,
        },
        selection: {
          anchor: start,
          head: start + text.length,
        },
      });
    }
    // wrap selection
    else if (from !== to) {
      view.dispatch({
        changes: {
          from,
          to,
          insert: `[${state.sliceDoc(from, to)}](url)`,
        },
        selection: {
          anchor: to + 3,
          head: to + 6,
        },
      });
    }
    // empty link
    else {
      view.dispatch({
        changes: {
          from,
          insert: "[](url)",
        },
        selection: {
          anchor: from + 1,
          head: from + 1,
        },
      });
    }

    view.focus();
    return true;
  },

  bulletList: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc;

    const startLine = doc.lineAt(from);
    const endLine = doc.lineAt(to);

    const changes = [];
    let offset = 0;

    for (let lineNo = startLine.number; lineNo <= endLine.number; lineNo++) {
      const line = doc.line(lineNo);
      const text = line.text;

      if (text.startsWith("- ")) {
        // remove bullet
        changes.push({
          from: line.from,
          to: line.from + 2,
        });
        offset -= 2;
      } else {
        // add bullet
        changes.push({
          from: line.from,
          insert: "- ",
        });
        offset += 2;
      }
    }

    view.dispatch({
      changes,
      selection: {
        anchor: from + (from === to ? offset : 0),
        head: to + offset,
      },
    });

    view.focus();
    return true;
  },

  numberedList: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc;

    const startLine = doc.lineAt(from);
    const endLine = doc.lineAt(to);

    const changes = [];
    let added = 0;
    let number = 1;

    for (let lineNo = startLine.number; lineNo <= endLine.number; lineNo++) {
      const line = doc.line(lineNo);
      const match = line.text.match(/^(\d+)\.\s+/);

      if (match) {
        const len = match[0].length;
        changes.push({
          from: line.from,
          to: line.from + len,
        });
        added -= len;
      } else {
        const insert = `${number}. `;
        changes.push({
          from: line.from,
          insert,
        });
        added += insert.length;
      }

      number++;
    }

    view.dispatch({
      changes,
      selection: {
        anchor: from + (from === to ? added : 0),
        head: to + added,
      },
    });

    view.focus();
    return true;
  },

  blockquote: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc;

    const startLine = doc.lineAt(from);
    const endLine = doc.lineAt(to);

    const changes = [];
    let added = 0;

    for (let lineNo = startLine.number; lineNo <= endLine.number; lineNo++) {
      const line = doc.line(lineNo);

      if (line.text.startsWith("> ")) {
        changes.push({
          from: line.from,
          to: line.from + 2,
        });
        added -= 2;
      } else {
        changes.push({
          from: line.from,
          insert: "> ",
        });
        added += 2;
      }
    }

    view.dispatch({
      changes,
      selection: {
        anchor: from + (from === to ? added : 0),
        head: to + added,
      },
    });

    view.focus();
    return true;
  },

  horizontalRule: (view: EditorView) => {
    const { state } = view;
    const { from } = state.selection.main;
    const doc = state.doc;

    const line = doc.lineAt(from);
    const insertPos = line.to;

    view.dispatch({
      changes: {
        from: insertPos,
        insert: `\n---\n`,
      },
      selection: {
        anchor: insertPos + 5,
      },
    });

    view.focus();
    return true;
  },
  strikeThrough: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const before = doc.slice(from - 2, from);
    const after = doc.slice(to, to + 2);

    if (before === "~~" && after === "~~") {
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
        changes: {
          from,
          to,
          insert: `~~${state.sliceDoc(from, to)}~~`,
        },
        selection: {
          anchor: from + 2,
          head: to + 2,
        },
      });
    } else {
      view.dispatch({
        changes: { from, insert: "~~~~" },
        selection: { anchor: from + 2 },
      });
    }

    view.focus();
    return true;
  },

  checkbox: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc;

    const startLine = doc.lineAt(from);
    const endLine = doc.lineAt(to);

    const changes = [];
    let added = 0;

    for (let lineNo = startLine.number; lineNo <= endLine.number; lineNo++) {
      const line = doc.line(lineNo);
      const text = line.text;

      if (text.startsWith("- [ ] ")) {
        changes.push({
          from: line.from,
          to: line.from + 6,
          insert: "- [x] ",
        });
        // same length, cursor doesn't move
      } else if (text.startsWith("- [x] ")) {
        changes.push({
          from: line.from,
          to: line.from + 6,
          insert: "- [ ] ",
        });
        // same length
      } else {
        changes.push({
          from: line.from,
          insert: "- [ ] ",
        });
        added += 6;
      }
    }

    view.dispatch({
      changes,
      selection: {
        anchor: from + (from === to ? added : 0),
        head: to + added,
      },
    });

    view.focus();
    return true;
  },

  inlineImage: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;

    if (from !== to) {
      view.dispatch({
        changes: {
          from,
          to,
          insert: `![${state.sliceDoc(from, to)}](url)`,
        },
        selection: {
          anchor: to + 4,
          head: to + 7,
        },
      });
    } else {
      view.dispatch({
        changes: {
          from,
          insert: "![alt](url)",
        },
        selection: {
          anchor: from + 2,
          head: from + 5,
        },
      });
    }

    view.focus();
    return true;
  },

  tableHelper: (view: EditorView) => {
    const { state } = view;
    const { from } = state.selection.main;
    const doc = state.doc;

    const line = doc.lineAt(from);
    const insertPos = line.to;

    const table = `
| Column 1 | Column 2 |
|----------|----------|
|          |          |
`;

    view.dispatch({
      changes: {
        from: insertPos,
        insert: table,
      },
      selection: {
        anchor: insertPos + table.indexOf("Column 1"),
        head: insertPos + table.indexOf("Column 1") + 8,
      },
    });

    view.focus();
    return true;
  },

  highlight: (view: EditorView) => {
    const { state } = view;
    const { from, to } = state.selection.main;
    const doc = state.doc.toString();

    const before = doc.slice(from - 2, from);
    const after = doc.slice(to, to + 2);

    if (before === "==" && after === "==") {
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
        changes: {
          from,
          to,
          insert: `==${state.sliceDoc(from, to)}==`,
        },
        selection: {
          anchor: from + 2,
          head: to + 2,
        },
      });
    } else {
      view.dispatch({
        changes: { from, insert: "====" },
        selection: { anchor: from + 2 },
      });
    }

    view.focus();
    return true;
  },
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
