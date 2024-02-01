// PKGS
import format from "pg-format";

// IMPORTS
import UsersQueries from "../queries/users.js";
import DB from "../db/credential.js";

async function createNewUser(columns, colNumbers, values) {
  var query = UsersQueries.createNewUser(columns, colNumbers);
  try {
    let records = await DB.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsers() {
  try {
    let records = await DB.query(UsersQueries.getAllUsers);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUsersByUserType(user_type) {
  try {
    let records = await DB.query(UsersQueries.getUsersByUserType, [user_type]);
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
    let records = await DB.query(query);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUserById(userId) {
  try {
    let records = await DB.query(UsersQueries.getUserById, [userId]);
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
    let records = await DB.query(query, values);
    return records.rows;
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteUserById(userId) {
  try {
    let users = await DB.query(UsersQueries.deleteUserById, [userId]);
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
