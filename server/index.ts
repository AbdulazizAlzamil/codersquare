import express, { RequestHandler } from "express";
import { db } from "./datastore";

const app = express();
app.use(express.json());

app.listen(3000);

const logRequests: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};

app.use(logRequests);

app.get("/posts", (req, res) => {
  res.send({ posts: db.listPosts() });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.createPost(post);
  res.sendStatus(201);
});
