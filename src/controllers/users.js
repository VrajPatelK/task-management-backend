import { pool } from "../db/credential.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import {
  createNewUser,
  createNewUserWithProfileImg,
  getAllUsers,
  getUsersByUserType,
  getUserById,
  updateUserById,
  updateUserWithProfileImgById,
  deleteUserById,
  getUserByEmail,
} from "../queries/users.js";

async function createNewUserApi(req, res) {
  const { email, username, password, user_type } = req.body;
  const profile_img = req.body.profile_img;
  let records = [];
  try {
    if (!profile_img) {
      records = await pool.query(createNewUser, [
        username,
        email,
        bcryptjs.hashSync(password),
        user_type,
      ]);
    } else {
      records = await pool.query(createNewUserWithProfileImg, [
        username,
        email,
        bcryptjs.hashSync(password),
        user_type,
        profile_img,
      ]);
    }
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

async function getUserByIdApi(req, res) {
  const { userId } = req.params;
  try {
    let records = await pool.query(getUserById, [userId]);
    return res.status(200).json(records.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateUserByIdApi(req, res) {
  const { userId } = req.params;
  const { username, email, password, user_type } = req.body;
  const profile_img = req.body.profile_img;
  let records = [];

  try {
    if (!profile_img) {
      records = await pool.query(updateUserById, [
        userId,
        username,
        email,
        bcryptjs.hashSync(password),
        user_type,
      ]);
    } else {
      records = await pool.query(updateUserWithProfileImgById, [
        userId,
        username,
        email,
        bcryptjs.hashSync(password),
        user_type,
        profile_img,
      ]);
    }
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
  getUserByIdApi,
  updateUserByIdApi,
  deleteUserByIdApi,
  loginApi,
};
