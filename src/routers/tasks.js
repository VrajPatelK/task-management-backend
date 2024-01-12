import { Router } from "express";
import {
  createNewTaskApi,
  getAllTasksApi,
  getTaskByIdApi,
  updateTaskByIdApi,
  deleteTaskByIdApi,
  getAllTasksByUserIdApi,
  getTaskByUserIdApi,
} from "../controllers/tasks.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { isAdminOrAuthorized } from "../middlewares/isAdminOrAuthorized.js";
import { pool } from "../db/credential.js";
import { getTaskById } from "../queries/tasks.js";
const router = Router();

router.use(isAuthenticated);

router.get("/", isAdmin, getAllTasksApi);
router.get("/users/:userId/:taskId", isAdminOrAuthorized, getTaskByUserIdApi);
router.get("/users/:userId", isAdminOrAuthorized, getAllTasksByUserIdApi);
router.get("/:taskId", isAdmin, getTaskByIdApi);
router.post("/create", isAdmin, createNewTaskApi);
router.put(
  "/edit/status/:taskId",
  async (req, res, next) => {
    const records = await pool.query(getTaskById, [req.params.taskId]);
    if (!records.rowCount) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    const task = records.rows.at(0);
    if (
      task.assigned_to !== req.user_details.id &&
      task.created_by !== req.user_details.id
    ) {
      return res.status(401).json({
        message: "unauthorized user!",
      });
    }
    next();
  },
  updateTaskByIdApi
);
router.put("/edit/:taskId", isAdmin, updateTaskByIdApi);
router.delete("/delete/:taskId", isAdmin, deleteTaskByIdApi);

export default router;
