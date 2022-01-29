/**
 * Userオブジェクトの型定義
 */
export interface UserType {
  id: string;
  name: string;
}

/**
 * Articleオブジェクトの型定義
 */
export interface ArticleType {
  id: string;
  title: string;
  content: string;
}

export interface ArticleDetailType extends ArticleType {
  user: {
    id: string;
  };
}
