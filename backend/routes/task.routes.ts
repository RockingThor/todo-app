import express from "express";
import { authMiddleware } from "../src/middleware";
import {
  createTask,
  getAllCompletedTasks,
  getAllTasks,
  getAllTasksByCategoryId,
  getTasksForToday,
  toggleTask,
  updateTask,
} from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.use(authMiddleware);

taskRoutes.route("/").get(getAllTasks);
taskRoutes.route("/create").post(createTask);
taskRoutes.route("/update/:id").put(toggleTask);
taskRoutes
  .route("/tasks-by-categories/:categoryId")
  .get(getAllTasksByCategoryId);
taskRoutes.route("/completed").get(getAllCompletedTasks);
taskRoutes.route("/today").get(getTasksForToday);
taskRoutes.route("/update/:id").put(updateTask);

export default taskRoutes;
