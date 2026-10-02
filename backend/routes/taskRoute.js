import express from "express";
import { randomUUID } from "node:crypto";

import connectToDatabase from "../database/db.js";
const router = express.Router();

const pool = await connectToDatabase();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM todos;");

  res.send(rows);
});

// aaaa2222 - 2222 - 2222 - 2222 - 222222222222;

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

  if (rows.length === 0) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(rows[0]);
});
//one
router.post("/create-task", async (req, res) => {
  try {
    const { title, description, is_completed } = req.body;

    const id = randomUUID();

    const user_id = "33333333-3333-3333-3333-333333333333";

    await pool.query(
      `INSERT INTO todos
            (id, user_id, title, description, is_completed)
            VALUES (?, ?, ?, ?, ?)`,
      [id, user_id, title, description, is_completed],
    );

    res.status(201).json({
      id,
      title,
      description,
      is_completed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create todo",
      error: error.message,
    });
  }
});
export default router;