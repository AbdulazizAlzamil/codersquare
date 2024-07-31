import { Like, Post, User, Comment } from "../../types";
import { Datastore } from "../index";
import { open as sqliteOpen, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

export class SqlDatastore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });

    this.db.run("PRAGMA foreign_key = ON;");

    await this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });

    return this;
  }

  async createUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts(id, title, url, postedAt, userId) VALUES(?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
  }

  async listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>("SELECT * FROM posts");
  }

  async getPost(id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }

  async deletePost(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createComment(comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async listComments(postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

  async deleteComment(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createLike(like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
