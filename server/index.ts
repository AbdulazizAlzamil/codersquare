import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";

const app = express();
app.use(express.json());

const logRequests: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};

app.use(logRequests);

app.get("/v1/posts", listPostsHandler);
app.post("/v1/posts", createPostHandler);

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Uncaught exception:", err);
  return res
    .status(500)
    .send("0ops, an unexpected error occurred, please try again");
};

app.use(errHandler);

app.listen(3000);
