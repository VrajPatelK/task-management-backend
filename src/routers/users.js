import { Router } from "express";
import {
  createNewUserApi,
  getAllUsersApi,
  getUsersByUserTypeApi,
  getUserByIdApi,
  updateUserByIdApi,
  deleteUserByIdApi,
  loginApi,
  getAllUsersBySearchApi,
} from "../controllers/users.js";
const router = Router();

import { generateToken } from "../middlewares/generateToken.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";

router.post("/login", generateToken, loginApi);

router.use(isAuthenticated);

router.get("/", isAdmin, getAllUsersApi);
router.get("/search/:search", isAdmin, getAllUsersBySearchApi);
router.post("/create", isAdmin, createNewUserApi);
router.get("/user_type/:user_type", isAdmin, getUsersByUserTypeApi);
router.delete("/delete/:userId", isAdmin, deleteUserByIdApi);

router.get("/:userId", getUserByIdApi);
router.put("/edit/:userId", updateUserByIdApi);

export default router;
