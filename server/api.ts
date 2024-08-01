import { Post, User, Comment, JwtObject } from "./types";

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}

export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

export type DeletePostRequest = { postId: string };
export type DeletePostResponse = {};

export type GetPostRequest = { postId: string };
export interface GetPostResponse {
  post: Post;
}

// Comment APIs
export type CreateCommentRequest = Pick<Comment, "comment">;
export interface CreateCommentResponse {}

export type CountCommentsRequest = { postId: string };
export type CountCommentsResponse = { count: number };

export interface ListCommentsResponse {
  comments: Comment[];
}

export type DeleteCommentResponse = {};

// Like APIs
export interface ListLikesResponse {
  likes: Number;
}

// User APIs
export type SignUpRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "username" | "password"
>;
export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}
export type SignInResponse = {
  user: Pick<User, "email" | "firstName" | "lastName" | "username" | "id">;
  jwt: string;
};
