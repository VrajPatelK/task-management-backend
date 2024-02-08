// PKGS
import express from "express";
import { config } from "dotenv";
import cors from "cors";
config();

// IMPORTS
import DB from "./db/credential.js";

// ROUTERS
import user_routers from "./v1/routers/users.js";
import task_routers from "./v1/routers/tasks.js";

// INITIALIZATIONS
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// MIDDLEWARES
app.use(
  cors({
    origin: process.env.REACT_APP_DOMAIN,
  })
);
app.use(express.json());
app.use("/api/v1/users/", user_routers);
app.use("/api/v1/tasks/", task_routers);

// SERVER
app.listen(PORT, async () => {
  try {
    await DB.connect();
    console.log(`server runs on http://localhost:${PORT}`);
  } catch (error) {
    console.log(`server crashed on http://localhost:${PORT}`);
    await DB.end();
  }
});
