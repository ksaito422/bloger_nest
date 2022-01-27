export interface Article {
  id: string;
  title: string;
  content: string;
}

export interface ArticleFindOne extends Article {
  user: {
    id: string;
  };
}
