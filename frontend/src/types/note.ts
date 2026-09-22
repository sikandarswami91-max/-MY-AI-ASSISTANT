export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}
