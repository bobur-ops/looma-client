import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function findLastPinnedIndex(notes: readonly { isPinned: boolean }[]) {
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i].isPinned) return i;
  }
  return -1;
}
