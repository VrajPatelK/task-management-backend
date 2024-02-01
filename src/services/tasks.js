import format from "pg-format";
import TasksQueries from "../queries/tasks.js";
import { pool } from "../db/credential.js";

async function createNewTask(columns, colNumbers, values) {
  var query = TasksQueries.createNewTask(columns, colNumbers);
  try {
    let records = await pool.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasks() {
  try {
    let records = await pool.query(TasksQueries.getAllTasks);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByStatus(status) {
  try {
    let records = await pool.query(TasksQueries.getAllTasksByStatus, [status]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByStatusAndUserId(userId, status) {
  try {
    let records = await pool.query(TasksQueries.getAllTasksByStatusAndUserId, [
      userId,
      status,
    ]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearchAndUserId(userId, searchTerms) {
  try {
    var query = format(
      TasksQueries.getAllTasksBySearchAndUserId,
      searchTerms,
      searchTerms
    );
    let records = await pool.query(query, [userId]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksBySearch(searchTerms) {
  try {
    var query = format(
      TasksQueries.getAllTasksBySearch,
      searchTerms,
      searchTerms
    );
    let records = await pool.query(query);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskById(taskId) {
  try {
    let records = await pool.query(TasksQueries.getTaskById, [taskId]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getTaskByUserId(taskId, userId) {
  try {
    let records = await pool.query(TasksQueries.getTaskByUserId, [
      taskId,
      userId,
    ]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllTasksByUserId(userId) {
  try {
    let records = await pool.query(TasksQueries.getAllTasksByUserId, [userId]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateTaskById(result, values) {
  var query = TasksQueries.updateTaskById(result);
  try {
    let records = await pool.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteTaskById(taskId) {
  try {
    let records = await pool.query(TasksQueries.deleteTaskById, [taskId]);
    return records.rows;
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
