export interface NoteListItemInterface {
  id: string;
  title: string;
  isPinned: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NoteDetailsInterface extends NoteListItemInterface {
  body: string;
}
