import express from "express";
import { randomUUID } from "node:crypto";

import redis from "../config/redis.js"

import connectToDatabase from "../database/db.js";
const router = express.Router();

const pool = await connectToDatabase();

router.get("/", async (req, res) => {

  try {
    const cacheKey = "tasks:all";
    const cachedTasks = await redis.get(cacheKey);

    if (cachedTasks) {
      console.log("Redis HIT");

      return res.json(JSON.parse(cachedTasks));
    }

    console.log("Redis MISS");


    const [rows] = await pool.query("SELECT * FROM todos;");


    await redis.set(
      cacheKey,
      JSON.stringify(rows),
      {
        EX: 60
      }
    );

    res.send(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error"
    });
  }

});

// aaaa2222 - 2222 - 2222 - 2222 - 222222222222;

router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `task:${id}`;

    const cachedTask = await redis.get(cacheKey);

    if (cachedTask) {
      console.log("Redis HIT");

      return res.json(JSON.parse(cachedTask));
    }

    console.log("Redis MISS");

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    const task = rows[0];

    await redis.set(
      cacheKey,
      JSON.stringify(task),
      {
        EX: 60
      }
    );

    res.json(task);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error"
    });
  }
});

router.post("/tasks", async (req, res) => {
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

    await redis.del("tasks:all");

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
