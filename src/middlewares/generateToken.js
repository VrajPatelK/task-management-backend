import jwt from "jsonwebtoken";
import { pool } from "../db/credential.js";
import { getUserByEmail } from "../queries/users.js";
import { config } from "dotenv";
import bcryptjs from "bcryptjs";
import cookie from "cookie";

config();

async function generateToken(req, res, next) {
  const { email, password } = req.body;
  try {
    // fetch user
    const records = await pool.query(getUserByEmail, [email]);

    // verify credentials
    if (!records.rowCount) {
      return res.status(404).json({
        message: "user doesn't found with given credentials!",
      });
    }

    const user = records.rows.at(0);
    var isPasTrue = bcryptjs.compareSync(password, user?.password);
    if (!isPasTrue) {
      return res.status(404).json({
        message: "password doesn't match!",
      });
    }

    // token generate
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    // store token into the cookie
    const authCookie = cookie.serialize("access_token", token, {
      httpOnly: true,
    });
    res.setHeader("authCookie", authCookie);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "token generation failure",
      errorMessage: error.message,
    });
  }
}

export { generateToken };
