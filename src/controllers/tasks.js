import TasksServices from "../services/tasks.js";
import { exportKeys, exportKeysForUpdate } from "../helpers/helpers.js";

async function createNewTask(req, res) {
  if (req.body.title) {
    req.body.title = req.body?.title.toLowerCase();
  }
  var keys = Object.keys(req.body);
  var values = Object.values(req.body);
  const { columns, colNumbers } = exportKeys(keys);
  try {
    let tasks = await TasksServices.createNewTask(columns, colNumbers, values);
    return res
      .status(200)
      .json({ message: `tasks inserted : ${tasks?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasks(req, res) {
  try {
    let tasks = await TasksServices.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByStatus(req, res) {
  try {
    const { status } = req.params;
    let tasks = await TasksServices.getAllTasksByStatus(status);
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}
async function getAllTasksByStatusAndUserId(req, res) {
  try {
    const { userId, status } = req.params;
    let tasks = await TasksServices.getAllTasksByStatusAndUserId(
      userId,
      status
    );
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearchAndUserId(req, res) {
  try {
    const { search, userId } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);

    let tasks = await TasksServices.getAllTasksBySearchAndUserId(
      userId,
      searchTerms
    );
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearch(req, res) {
  try {
    const { search } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);
    let tasks = await TasksServices.getAllTasksBySearch(searchTerms);
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskById(req, res) {
  const { taskId } = req.params;
  try {
    let tasks = await TasksServices.getTaskById(taskId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskByUserId(req, res) {
  const { taskId, userId } = req.params;
  try {
    let tasks = await TasksServices.getTaskByUserId(taskId, userId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByUserId(req, res) {
  const { userId } = req.params;
  try {
    let tasks = await TasksServices.getAllTasksByUserId(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateTaskById(req, res) {
  const { taskId } = req.params;
  if (req.body.title) {
    req.body.title = req.body?.title.toLowerCase();
  }
  var keys = Object.keys(req.body);
  var values = Object.values(req.body);
  values.unshift(taskId);
  const result = exportKeysForUpdate(keys);

  try {
    let tasks = await TasksServices.updateTaskById(result, values);
    return res
      .status(200)
      .json({ message: `tasks updated : ${tasks?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteTaskById(req, res) {
  const { taskId } = req.params;
  try {
    let tasks = await TasksServices.deleteTaskById(taskId);
    return res
      .status(200)
      .json({ message: `tasks deleted : ${tasks?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}
export default {
  createNewTask,
  getAllTasks,
  getAllTasksByStatus,
  getAllTasksByStatusAndUserId,
  getAllTasksBySearchAndUserId,
  getTaskById,
  getTaskByUserId,
  getAllTasksByUserId,
  getAllTasksBySearch,
  updateTaskById,
  deleteTaskById,
};
