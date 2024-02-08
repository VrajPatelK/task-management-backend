// PKGS
import { Router } from "express";

// CONTROLLERS
import TasksControllers from "../../controllers/tasks.js";

// MIDDLEWARES
import { isAdmin } from "../../middlewares/isAdmin.js";
import { isAuthenticated } from "../../middlewares/authentication.js";
import { isAdminOrAuthorized } from "../../middlewares/isAdminOrAuthorized.js";
import { authForStatus } from "../../middlewares/authForStatus.js";

// INITIALIZATION
const router = Router();

// ROUTERS
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
  authForStatus,
  TasksControllers.updateTaskById
);
router.put("/edit/:taskId", isAdmin, TasksControllers.updateTaskById);
router.delete("/delete/:taskId", isAdmin, TasksControllers.deleteTaskById);

export default router;
