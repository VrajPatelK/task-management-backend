import { Router } from "express";
import {
  createNewTaskApi,
  getAllTasksApi,
  getTaskByIdApi,
  updateTaskByIdApi,
  deleteTaskByIdApi,
  getAllTasksByUserIdApi,
} from "../controllers/tasks.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { isAuthorized } from "../middlewares/authorization.js";
const router = Router();

router.use(isAuthenticated);

router.get("/", isAdmin, getAllTasksApi);
router.get("/users/:userId", isAuthorized, getAllTasksByUserIdApi);
router.get("/:taskId", getTaskByIdApi);
router.post("/create", isAdmin, createNewTaskApi);
router.put("/edit/:taskId", updateTaskByIdApi);
router.delete("/delete/:taskId", isAdmin, deleteTaskByIdApi);

export default router;
