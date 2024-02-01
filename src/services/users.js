import format from "pg-format";
import UsersQueries from "../queries/users.js";
import { pool } from "../db/credential.js";

async function createNewUser(columns, colNumbers, values) {
  var query = UsersQueries.createNewUser(columns, colNumbers);
  try {
    let records = await pool.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsers() {
  try {
    let records = await pool.query(UsersQueries.getAllUsers);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUsersByUserType(user_type) {
  try {
    let records = await pool.query(UsersQueries.getUsersByUserType, [
      user_type,
    ]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsersBySearch(searchTerms) {
  try {
    var query = format(
      UsersQueries.getAllUsersBySearch,
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

async function getUserById(userId) {
  try {
    let records = await pool.query(UsersQueries.getUserById, [userId]);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateUserById(values, result) {
  var query = UsersQueries.updateUserById(result);
  try {
    let records = await pool.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteUserById(userId) {
  try {
    let users = await pool.query(UsersQueries.deleteUserById, [userId]);
    return users;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

export default {
  createNewUser,
  getAllUsers,
  getUsersByUserType,
  getAllUsersBySearch,
  getUserById,
  updateUserById,
  deleteUserById,
};
