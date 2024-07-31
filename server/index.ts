import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  const logRequests: RequestHandler = (req, res, next) => {
    console.log(req.method, req.path, "- body:", req.body);
    next();
  };

  app.use(logRequests);

  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("Uncaught exception:", err);
    return res
      .status(500)
      .send("Oops, an unexpected error occurred, please try again");
  };

  app.use(errHandler);

  app.listen(3000);
})();
