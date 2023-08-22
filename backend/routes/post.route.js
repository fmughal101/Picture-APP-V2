import express from "express";
import { db } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await db.collection("Posts").find().toArray());
});

router.get("/liked/:postID", async (req, res) => {
  const { postID } = req.params;
  const { uid } = req.user;

  const post = await db.collection("Posts").findOne({ _id: ObjectId(postID) });

  if (post) {
    const likedby = post.likedby || [];
    res.json({ liked: likedby.includes(uid) });
  } else {
    res.sendStatus(404);
  }
});

router.put("/likeUnlike/:postID", async (req, res) => {
  const { postID } = req.params;
  const { uid } = req.user;

  const post = await db.collection("Posts").findOne({ _id: ObjectId(postID) });

  if (post) {
    const likedby = post.likedby || [];
    const liked = uid && !likedby.includes(uid);

    if (liked) {
      await db.collection("Posts").updateOne(
        { _id: ObjectId(postID) },
        {
          $push: { likedby: uid },
        }
      );
      console.log("Liked");
    } else {
      await db.collection("Posts").updateOne(
        { _id: ObjectId(postID) },
        {
          $pull: { likedby: uid },
        }
      );
      console.log("UnLiked");
    }
    const updatedPost = await db
      .collection("Posts")
      .findOne({ _id: ObjectId(postID) });
    res.json(updatedPost.likedby);
  } else {
    res.sendStatus(404);
  }
});

router.post('/createNewPost', async (req, res) => {
  const { uid } = req.user;
  const { user, imgURL, description } = req.body

  if (uid === null || uid === undefined) return res.sendStatus(401)

  await db.collection("Posts").insertOne({ _id: ObjectId(), uid, user, imgURL, description, likedby: [], comments: []})

  res.send('New Post')

})

router.put("/editPost/:postID", async (req, res) => {
  const { postID } = req.params;
  const { newDescription } = req.body;
  const { uid } = req.user;

  const post = await db.collection("Posts").findOne({ _id: ObjectId(postID) });

  if (uid === undefined) {
    return res.status(401).json({ status: "Please Log in To Preform Theses Actions" });
  }

  if (post && uid) {
    const poster = post.uid;

    if (uid !== poster) {
      res.status(401).json({ status: "May Not Be Orginal Poster" });
    } else {
      await db.collection("Posts").updateOne(
        { _id: ObjectId(postID) },
        {
          $set: { description: newDescription },
        }
      );

      const updatedPost = await db
        .collection("Posts")
        .findOne({ _id: ObjectId(postID) });
      res.send(updatedPost);
    }
  } else {
    res.sendStatus(404);
  }

});

router.post("/comment/:postID", async (req, res) => {
  const { postID } = req.params;
  const { user, comment } = req.body;

  await db.collection("Posts").updateOne(
    { _id: ObjectId(postID) },
    {
      $push: { comments: { user, comment } },
    }
  );

  const post = await db.collection("Posts").findOne({ _id: ObjectId(postID) });

  if (post) {
    res.json(post);
  } else {
    res.send(`Post with postId: ${postID} does not exist`);
  }
});

router.delete("/deletePost/:postID", async (req, res) => {
  const { postID } = req.params;
  const { uid } = req.user;

  const post = await db.collection("Posts").findOne({ _id: ObjectId(postID) });

  if (uid === undefined) {
    return res.status(401).json({ status: "Please Log in To Preform Theses Actions" });
  }

  if (post) {
    const poster = post.uid;

    if (uid !== poster) {
      res.status(401).json({ status: "May Not Be Orginal Poster" });
    } else {
      await db.collection("Posts").deleteOne(
        { _id: ObjectId(postID) }
      );

      res.sendStatus(200);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;
