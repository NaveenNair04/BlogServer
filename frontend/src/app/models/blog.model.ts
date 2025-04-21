export interface Blog {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt?: Date;
  likesCount?: number;
  isLiked?: boolean;
}
