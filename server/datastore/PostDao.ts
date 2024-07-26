import { Post } from "../types";

export interface PostDao {
  createPost(post: Post): void;
  listPosts(): Post[];
  getPost(id: string): Post | undefined;
  deletePost(id: string): void;
}
