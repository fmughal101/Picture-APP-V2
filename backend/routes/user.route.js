import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/userInfo", async (req, res) => {
  const { uid } = req.user
  const user = await db.collection("users").findOne({ userId: uid })
  res.json(user)
})

router.post("/createNewUser/:uid", async (req, res) => {
  const { uid } = req.params
  const { userName } = req.body;
  
  const response = await db
    .collection("users")
    .insertOne({ user: userName, userId: uid }, { unique: true });
    console.log(response);

  res.json(response)
    
});

export default router;
