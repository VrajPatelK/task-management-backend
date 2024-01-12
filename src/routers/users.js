import { Router } from "express";
import {
  createNewUserApi,
  getAllUsersApi,
  getUsersByUserTypeApi,
  getUserByIdApi,
  updateUserByIdApi,
  deleteUserByIdApi,
} from "../controllers/users.js";
const router = Router();

router.get("/", getAllUsersApi);
router.get("/:userId", getUserByIdApi);
router.get("/user_type/:user_type", getUsersByUserTypeApi);
router.post("/create", createNewUserApi);
router.put("/edit/:userId", updateUserByIdApi);
router.delete("/delete/:userId", deleteUserByIdApi);

export default router;
