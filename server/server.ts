import express from "express";
import asyncHandler from "express-async-handler";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";
import { initDb } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { logRequests } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.use(logRequests);

  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(signInHandler));

  app.use(errHandler);

  app.listen(3000);
})();
