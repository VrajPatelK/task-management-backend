import { config } from "dotenv";
config();

async function isAuthorized(req, res, next) {
  try {
    const user_details = req.body?.user_details;
    const { userId } = req.params;

    if (user_details.id !== parseInt(userId)) {
      return res.status(401).json({
        message: "unauthorized user !",
      });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
}

export { isAuthorized };
