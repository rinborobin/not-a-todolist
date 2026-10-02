import express from "express";
import { randomUUID } from "node:crypto";

import connectToDatabase from "../database/db.js";
const router = express.Router();

const pool = await connectToDatabase();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users;");

  res.send(rows);
});

export default router;
