import { Router } from "express";
import {
  createNewTaskApi,
  getAllTasksApi,
  getTaskByIdApi,
  updateTaskByIdApi,
  deleteTaskByIdApi,
  getAllTasksByUserIdApi,
} from "../controllers/tasks.js";
const router = Router();

router.get("/", getAllTasksApi);
router.get("/users/:userId", getAllTasksByUserIdApi);
router.get("/:taskId", getTaskByIdApi);
router.post("/create", createNewTaskApi);
router.put("/edit/:taskId", updateTaskByIdApi);
router.delete("/delete/:taskId", deleteTaskByIdApi);

export default router;
