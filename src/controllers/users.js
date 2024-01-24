import { pool } from "../db/credential.js";
import bcryptjs from "bcryptjs";

import {
  createNewUser,
  getAllUsers,
  getUsersByUserType,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsersBySearch,
} from "../queries/users.js";
import { exportKeys, exportKeysForUpdate } from "../helpers/helpers.js";
import format from "pg-format";

async function createNewUserApi(req, res) {
  var keys = Object.keys(req.body);
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password);
  }
  var values = Object.values(req.body);

  const result = exportKeys(keys);
  var query = createNewUser(result.columns, result.colNumbers);
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

async function getAllUsersApi(req, res) {
  try {
    let records = await pool.query(getAllUsers);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUsersByUserTypeApi(req, res) {
  try {
    var { user_type } = req.params;
    if (
      user_type !== process.env.ADMIN_ROLE &&
      user_type !== process.env.DEVELOPER_ROLE
    ) {
      return res.status(404).json({ message: "user type doesn't found" });
    }
    let records = await pool.query(getUsersByUserType, [user_type]);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsersBySearchApi(req, res) {
  try {
    const { search } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);

    var query = format(getAllUsersBySearch, searchTerms, searchTerms);
    let records = await pool.query(query);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUserByIdApi(req, res) {
  const { userId } = req.params;
  try {
    let records = await pool.query(getUserById, [userId]);
    if (!records.rowCount) {
      return res.status(404).json({ message: "user doesn't found!" });
    }
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateUserByIdApi(req, res) {
  const { userId } = req.params;
  var keys = Object.keys(req.body);
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password);
  }
  var values = Object.values(req.body);
  values.unshift(userId);

  const result = exportKeysForUpdate(keys);
  var query = updateUserById(result);

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

async function deleteUserByIdApi(req, res) {
  const { userId } = req.params;
  try {
    let records = await pool.query(deleteUserById, [userId]);
    return res
      .status(200)
      .json({ message: `records deleted : ${records.rowCount}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function loginApi(req, res) {
  try {
    //
    return res.status(200).json({
      message: "signed in!",
      user: req.body,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

export {
  createNewUserApi,
  getAllUsersApi,
  getUsersByUserTypeApi,
  getAllUsersBySearchApi,
  getUserByIdApi,
  updateUserByIdApi,
  deleteUserByIdApi,
  loginApi,
};
