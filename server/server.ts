import express from "express";
import asyncHandler from "express-async-handler";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";
import { initDb } from "./datastore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { errHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import { authMiddleware } from "./middleware/authMiddleware";
import cors from "cors";

(async () => {
  await initDb();
  dotenv.config();

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(loggerMiddleware);

  // Public endpoints
  app.get("/api/v1/healthz", (req, res) => res.send({ status: "OK" }));
  app.post("/api/v1/signup", asyncHandler(signUpHandler));
  app.post("/api/v1/signin", asyncHandler(signInHandler));

  app.use(authMiddleware);

  // Private endpoints
  app.get("/api/v1/posts", asyncHandler(listPostsHandler));
  app.post("/api/v1/posts", asyncHandler(createPostHandler));

  app.use(errHandler);

  // app.listen(process.env.PORT || 3000);
  app.listen(3000);
})();
