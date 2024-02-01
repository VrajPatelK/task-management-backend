import { Router } from "express";
const router = Router();
import { pool } from "../db/credential.js";

import TasksControllers from "../controllers/tasks.js";
import TasksQueries from "../queries/tasks.js";

import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { isAdminOrAuthorized } from "../middlewares/isAdminOrAuthorized.js";

router.use(isAuthenticated);

router.get("/", isAdmin, TasksControllers.getAllTasks);
router.get("/status/:status", isAdmin, TasksControllers.getAllTasksByStatus);
router.get("/search/:search", isAdmin, TasksControllers.getAllTasksBySearch);
router.get(
  "/users/:userId/status/:status",
  isAdminOrAuthorized,
  TasksControllers.getAllTasksByStatusAndUserId
);
router.get(
  "/users/:userId/search/:search",
  isAdminOrAuthorized,
  TasksControllers.getAllTasksBySearchAndUserId
);
router.get(
  "/users/:userId/:taskId",
  isAdminOrAuthorized,
  TasksControllers.getTaskByUserId
);
router.get(
  "/users/:userId",
  isAdminOrAuthorized,
  TasksControllers.getAllTasksByUserId
);
router.get("/:taskId", isAdmin, TasksControllers.getTaskById);
router.post("/create", isAdmin, TasksControllers.createNewTask);
router.put(
  "/edit/status/:taskId",
  async (req, res, next) => {
    const records = await pool.query(TasksQueries.getTaskById, [
      req.params.taskId,
    ]);
    if (!records.rowCount) {
      return res.status(404).json({ message: "resource does not found" });
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
  TasksControllers.updateTaskById
);
router.put("/edit/:taskId", isAdmin, TasksControllers.updateTaskById);
router.delete("/delete/:taskId", isAdmin, TasksControllers.deleteTaskById);

export default router;
