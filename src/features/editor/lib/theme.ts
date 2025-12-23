export const theme = {
  "&": {
    fontSize: "16px",
    caretColor: "#e5e7eb",
    fontFamily: "JetBrains Mono, ui-monospace",
    fontWeight: "400",
  },
  ".cm-content": {
    fontFamily: "JetBrains Mono, ui-monospace",
    padding: "4px 12px",
    minHeight: "100%",
    caretColor: "inherit",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    border: "none",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 8px 0 12px",
    opacity: "1",
    color: "var(--muted-foreground)",
    fontFamily: "JetBrains Mono, ui-monospace",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: "3ch",
  },
  ".cm-content[data-placeholder]:empty:before": {
    content: "attr(data-placeholder)",
    opacity: "0.45",
    pointerEvents: "none",
  },
  ".cm-activeLine": {
    backgroundColor: "var(--muted)",
  },
  ".cm-line": {
    padding: "0",
  },
};
