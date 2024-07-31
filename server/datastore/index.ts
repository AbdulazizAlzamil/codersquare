import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
import { PostDao } from "./dao/PostDao";
import { UserDao } from "./dao/UserDao";
import { SqlDatastore } from "./sql";
// import { InMemoryDatastore } from "./memorydb";

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDatastore().openDb();
}
