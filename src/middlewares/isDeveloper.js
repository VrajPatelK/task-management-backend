import jwt from "jsonwebtoken";
import cookie from "cookie";
import { config } from "dotenv";
config();

async function isDeveloper(req, res, next) {
  try {
    const user_details = req.body?.user_details;

    if (user_details.user_type !== process.env.DEVELOPER_ROLE) {
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
