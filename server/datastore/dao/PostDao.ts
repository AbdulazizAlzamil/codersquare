import { Post } from "../../../shared/src/types";

export interface PostDao {
  createPost(post: Post): Promise<void>;
  listPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
}
