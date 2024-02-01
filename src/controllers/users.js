// PKGS
import bcryptjs from "bcryptjs";

// IMPORTS
import UserServices from "../services/users.js";
import { exportKeys, exportKeysForUpdate } from "../helpers/helpers.js";
import { CONSTANTS } from "../helpers/constants.js";

async function createNewUser(req, res) {
  var keys = Object.keys(req.body);
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password);
  }
  const { columns, colNumbers } = exportKeys(keys);
  var values = Object.values(req.body);

  try {
    let users = await UserServices.createNewUser(columns, colNumbers, values);
    return res
      .status(200)
      .json({ message: `records inserted : ${users?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    let users = await UserServices.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUsersByUserType(req, res) {
  try {
    var { user_type } = req.params;
    if (
      user_type !== CONSTANTS.ADMIN_ROLE &&
      user_type !== CONSTANTS.DEVELOPER_ROLE
    ) {
      return res.status(404).json({ message: "user type doesn't found" });
    }
    let users = await UserServices.getUsersByUserType(user_type);
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getAllUsersBySearch(req, res) {
  try {
    const { search } = req.params;
    var searchTerms = search
      ?.toLowerCase()
      .trim()
      .split(" ")
      .map((term) => `%${term}%`);

    let users = await UserServices.getAllUsersBySearch(searchTerms);
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function getUserById(req, res) {
  const { userId } = req.params;
  try {
    let users = await UserServices.getUserById(userId);
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function updateUserById(req, res) {
  const { userId } = req.params;
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password);
  }

  var keys = Object.keys(req.body);
  var values = Object.values(req.body);
  values.unshift(userId);

  const result = exportKeysForUpdate(keys);
  try {
    let users = await UserServices.updateUserById(values, result);
    return res
      .status(200)
      .json({ message: `records updated : ${users?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function deleteUserById(req, res) {
  const { userId } = req.params;
  try {
    let users = await UserServices.deleteUserById(userId);
    return res
      .status(200)
      .json({ message: `records deleted : ${users?.length}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", errorMessage: error.message });
  }
}

async function login(req, res) {
  try {
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

export default {
  createNewUser,
  getAllUsers,
  getUsersByUserType,
  getAllUsersBySearch,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
};
