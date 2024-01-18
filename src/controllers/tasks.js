import { pool } from "../db/credential.js";

import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  getAllTasksByUserId,
  updateTaskById,
  getAllTasksByStatus,
  getAllTasksBySearch,
  getAllTasksByStatusAndUserId,
  getAllTasksBySearchAndUserId,
} from "../queries/tasks.js";
import { exportKeys, exportKeysForUpdate } from "../helpers/helpers.js";
import format from "pg-format";

async function createNewTaskApi(req, res) {
  if (req.body.title) {
    req.body.title = req.body?.title.toLowerCase();
  }
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
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByStatusApi(req, res) {
  try {
    const { status } = req.params;
    let records = await pool.query(getAllTasksByStatus, [status]);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}
async function getAllTasksByStatusAndUserIdApi(req, res) {
  try {
    const { userId, status } = req.params;
    let records = await pool.query(getAllTasksByStatusAndUserId, [
      userId,
      status,
    ]);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearchAndUserIdApi(req, res) {
  try {
    const { search, userId } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);

    var query = format(getAllTasksBySearchAndUserId, searchTerms, searchTerms);
    let records = await pool.query(query, [userId]);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearchApi(req, res) {
  try {
    const { search } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);

    var query = format(getAllTasksBySearch, searchTerms, searchTerms);
    let records = await pool.query(query);
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
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateTaskByIdApi(req, res) {
  const { taskId } = req.params;
  if (req.body.title) {
    req.body.title = req.body?.title.toLowerCase();
  }
  var keys = Object.keys(req.body);
  var values = Object.values(req.body);
  values.unshift(taskId);

  const result = exportKeysForUpdate(keys);
  var query = updateTaskById(result);

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
  getAllTasksByStatusApi,
  getAllTasksByStatusAndUserIdApi,
  getAllTasksBySearchAndUserIdApi,
  getTaskByIdApi,
  getTaskByUserIdApi,
  getAllTasksByUserIdApi,
  getAllTasksBySearchApi,
  updateTaskByIdApi,
  deleteTaskByIdApi,
};
