import { pool } from "../db/credential.js";

import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  getAllTasksByUserId,
  updateTaskById,
} from "../queries/tasks.js";
import { exportKeys, exportKeysForUpdate } from "../helpers/helpers.js";

async function createNewTaskApi(req, res) {
  var keys = Object.keys(req.body);
  var values = Object.values(req.body);

  const result = exportKeys(keys);
  var query = createNewTask(result.columns, result.colNumbers);

  try {
    let records = await pool.query(query, values);
    return res
      .status(200)
      .json({ message: `records inserted : ${records?.rowCount}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksApi(req, res) {
  try {
    let records = await pool.query(getAllTasks);
    if (!records.rowCount) {
      return res.status(404).json({
        message: "resource does not found!",
      });
    }
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskByIdApi(req, res) {
  const { taskId } = req.params;
  try {
    let records = await pool.query(getTaskById, [taskId]);
    if (!records.rowCount) {
      return res.status(404).json({
        message: "resource does not found!",
      });
    }
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskByUserIdApi(req, res) {
  const { taskId, userId } = req.params;
  try {
    let records = await pool.query(getTaskByUserId, [taskId, userId]);
    if (!records.rowCount) {
      return res.status(404).json({
        message: "resource does not found!",
      });
    }
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByUserIdApi(req, res) {
  const { userId } = req.params;
  try {
    let records = await pool.query(getAllTasksByUserId, [userId]);
    if (!records.rowCount) {
      return res.status(404).json({
        message: "resource does not found!",
      });
    }
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateTaskByIdApi(req, res) {
  const { taskId } = req.params;

  var keys = Object.keys(req.body);
  var values = Object.values(req.body);
  values.unshift(taskId);

  const result = exportKeysForUpdate(keys);
  var query = updateTaskById(result);
  console.log(keys);

  try {
    let records = await pool.query(query, values);
    return res
      .status(200)
      .json({ message: `records updated : ${records.rowCount}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteTaskByIdApi(req, res) {
  const { taskId } = req.params;
  try {
    let records = await pool.query(deleteTaskById, [taskId]);
    return res
      .status(200)
      .json({ message: `records deleted : ${records.rowCount}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}
export {
  createNewTaskApi,
  getAllTasksApi,
  getTaskByIdApi,
  getTaskByUserIdApi,
  getAllTasksByUserIdApi,
  updateTaskByIdApi,
  deleteTaskByIdApi,
};
