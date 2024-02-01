// IMPORTS
import { CONSTANTS } from "../helpers/constants.js";

async function isDeveloper(req, res, next) {
  try {
    const user_details = req?.user_details;

    if (user_details.user_type !== CONSTANTS.DEVELOPER_ROLE) {
      return res.status(401).json({
        message: "unauthorized user!",
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

export { isDeveloper };
