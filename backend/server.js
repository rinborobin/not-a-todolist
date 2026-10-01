import connectToDatabase from "./database/db.js";
import taskRoutes from "./routes/taskRoute.js";
import userRoutes from "./routes/userRoute.js";

import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    const database = await connectToDatabase();
    app.locals.database = database;

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exitCode = 1;
  }
}

startServer();
