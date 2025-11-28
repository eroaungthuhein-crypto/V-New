export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
}

export type Category = 'Economy' | 'Travel' | 'Culture' | 'Technology' | 'General';

export interface GeneratedNewsResponse {
  title: string;
  content: string;
  category: string;
  excerpt: string;
}