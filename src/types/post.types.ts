export type PostAuthor = {
  id?: string;
  name: string;
  email: string;
  image: string | null;
};

export type PostLike = {
  userId: string;
};

export type PostComment = {
  id: string;
  content: string;
  createdAt: string;
  author: PostAuthor;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;


  image?: string | null;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  likes: PostLike[];
  comments: PostComment[];
  _count: {
    likes: number;
    comments: number;
  };
};

export type PostsResponse = {
  message: string;
  success: boolean;
  data: Post[];
};

export type CreatePostResponse = {
  message: string;
  success: boolean;
  data: Post;
};

export type CreateCommentResponse = {
  message: string;
  success: boolean;
};

export type DeleteCommentParams = {
  postId: string;
  commentId: string;
};

export type PostCardProps = {
  post: Post;
};
