// IMPORTS
import { CONSTANTS } from "../helpers/constants.js";

async function isAdminOrAuthorized(req, res, next) {
  try {
    const user_details = req?.user_details;
    const { userId } = req.params;

    if (
      user_details.user_type !== CONSTANTS.ADMIN_ROLE &&
      user_details.id !== parseInt(userId)
    ) {
      return res.status(401).json({
        message: "unauthorized user type or. user !",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
}

export { isAdminOrAuthorized };
