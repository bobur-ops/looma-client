export interface NoteListItemInterface {
  id: string;
  title: string;
  isPinned: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteDetailsInterface extends NoteListItemInterface {
  body: string;
}
