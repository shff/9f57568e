export interface Comment {
  id: string;
  author: string;
  text: string;
  projectId: number;
  parentId?: string;
}
