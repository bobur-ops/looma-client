import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const gray_245 = "#928374",
  light1 = "#ebdbb2",
  light4 = "#a89984",
  bright_red = "#fb4934",
  bright_green = "#b8bb26",
  bright_yellow = "#fabd2f",
  bright_blue = "#83a598",
  bright_purple = "#d3869b",
  bright_aqua = "#8ec07c",
  bright_orange = "#fe8019";

const gray = gray_245,
  fg1 = light1,
  fg4 = light4,
  red = bright_red,
  green = bright_green,
  yellow = bright_yellow,
  blue = bright_blue,
  purple = bright_purple,
  aqua = bright_aqua,
  orange = bright_orange;

const invalid = red;

export const gruvboxDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: red },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: aqua,
  },
  { tag: [t.variableName], color: blue },
  { tag: [t.function(t.variableName)], color: green, fontStyle: "bold" },
  { tag: [t.labelName], color: fg1 },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: purple,
  },
  { tag: [t.definition(t.name), t.separator], color: fg1 },
  { tag: [t.brace], color: fg1 },
  {
    tag: [t.annotation],
    color: invalid,
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: purple,
  },
  {
    tag: [t.typeName, t.className],
    color: yellow,
  },
  {
    tag: [t.operator, t.operatorKeyword],
    color: red,
  },
  {
    tag: [t.tagName],
    color: aqua,
    fontStyle: "bold",
  },
  {
    tag: [t.squareBracket],
    color: orange,
  },
  {
    tag: [t.angleBracket],
    color: blue,
  },
  {
    tag: [t.attributeName],
    color: aqua,
  },
  {
    tag: [t.regexp],
    color: aqua,
  },
  {
    tag: [t.quote],
    color: gray,
  },
  { tag: [t.string], color: fg1 },
  {
    tag: t.link,
    color: fg4,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: purple,
  },
  { tag: [t.meta], color: yellow },
  { tag: [t.comment], color: gray, fontStyle: "italic" },
  { tag: t.strong, fontWeight: "bold", color: orange },
  { tag: t.emphasis, fontStyle: "italic", color: green },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.heading, fontWeight: "bold", color: green },
  { tag: [t.heading1, t.heading2], fontWeight: "bold", color: green },
  {
    tag: [t.heading3, t.heading4],
    fontWeight: "bold",
    color: yellow,
  },
  {
    tag: [t.heading5, t.heading6],
    color: yellow,
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: purple },
  {
    tag: [t.processingInstruction, t.inserted],
    color: bright_blue,
  },
  {
    tag: [t.contentSeparator],
    color: red,
  },
  { tag: t.invalid, color: orange, borderBottom: `1px dotted ${invalid}` },
]);
