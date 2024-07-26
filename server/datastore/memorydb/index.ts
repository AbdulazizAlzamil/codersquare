import { User, Post, Comment, Like } from "../../types";
import { Datastore } from "../index";

export class InMemoryDatastore implements Datastore {
  private users: User[] = [];
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private likes: Like[] = [];

  createUser(user: User): void {
    this.users.push(user);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  createPost(post: Post): void {
    this.posts.push(post);
  }

  listPosts(): Post[] {
    return this.posts;
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }

  deletePost(id: string): void {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return;
    }
    this.posts.splice(postIndex, 1);
  }

  createComment(comment: Comment): void {
    this.comments.push(comment);
  }

  listComments(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId);
  }

  deleteComment(id: string): void {
    const commentIndex = this.comments.findIndex((c) => c.id === id);
    if (commentIndex === -1) {
      return;
    }
    this.comments.splice(commentIndex, 1);
  }

  createLike(like: Like): void {
    this.likes.push(like);
  }
}
