export type FileType = 'pdf' | 'image' | 'document' | 'code' | 'audio' | 'archive';

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploadedAt: string;
  url?: string;
  pages?: number;
  dimensions?: string;
  description?: string;
}
