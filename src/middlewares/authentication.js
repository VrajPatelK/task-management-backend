import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

async function isAuthenticated(req, res, next) {
  try {
    // get token from cookie
    const access_token = req.headers.token;

    // verify token
    const isVerified = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
    // if signature in wrong the automatically throw error and
    // we can't move on (means next() will not get execution)
    // so, no need to check "isVerified?"
    req.user_details = isVerified;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
}

export { isAuthenticated };
