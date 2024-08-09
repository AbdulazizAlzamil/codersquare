import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "@codersquare/shared/api";
import { db } from "../datastore";
import { ExpressHandler, Post } from "@codersquare/shared/types";
import crypto from "crypto";

export const listPostsHandler: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = async (req, res) => {
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId,
  };

  await db.createPost(post);
  res.sendStatus(201);
};
