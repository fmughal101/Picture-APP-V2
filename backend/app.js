import express from "express";
import PostRouter from "./routes/post.route.js";
import UserRouter from "./routes/user.route.js";
import fs from "fs";
import admin from "firebase-admin";
import { connectToDB } from "./db.js";

const app = express();

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.json());
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (err) {
      res.sendStatus(400);
      return;
    }
  }

  req.user = req.user || {};
  next();
});
app.use("/api/posts", PostRouter);
app.use("/api/users", UserRouter);
app.use("/*", (req, res, next) => res.sendStatus(404));

connectToDB(() => {
  console.log("Connected To Database");
  app.listen(8080, () => {
    console.log("Server Started On Port 8080");
  });
});
