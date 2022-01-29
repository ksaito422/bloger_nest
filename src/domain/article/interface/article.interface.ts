export interface IArticle {
  id: string;
  user_id: string;
  title: string;
  content: string;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}
