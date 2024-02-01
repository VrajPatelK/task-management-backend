import { Router } from "express";
const router = Router();

import UsersControllers from "../controllers/users.js";
import { generateToken } from "../middlewares/generateToken.js";
import { isAuthenticated } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";

router.post("/login", generateToken, UsersControllers.login);

router.use(isAuthenticated);

router.get("/", isAdmin, UsersControllers.getAllUsers);
router.get("/search/:search", isAdmin, UsersControllers.getAllUsersBySearch);
router.post("/create", isAdmin, UsersControllers.createNewUser);
router.get(
  "/user_type/:user_type",
  isAdmin,
  UsersControllers.getUsersByUserType
);
router.delete("/delete/:userId", isAdmin, UsersControllers.deleteUserById);

router.get("/:userId", UsersControllers.getUserById);
router.put("/edit/:userId", UsersControllers.updateUserById);

export default router;
