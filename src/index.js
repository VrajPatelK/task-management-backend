// ***** PKGS *****
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "colors";

// ***** IMPORTS *****
import DB from "./db/credential.js";

// ***** ROUTERS *****
import user_routers from "./routers/users.js";
import task_routers from "./routers/tasks.js";

// ***** INITIALIZATIONS *****
dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// ***** MIDDLEWARES *****
app.use(
  cors({
    origin: process.env.REACT_APP_DOMAIN,
  })
);
app.use(express.json());
app.use("/api/v1/users/", user_routers);
app.use("/api/v1/tasks/", task_routers);

// ***** SERVER *****
app.listen(PORT, async () => {
  try {
    await DB.connect();
    console.log(`SERVER RUNS ON http://localhost:${PORT}`.bgGreen.bold);
  } catch (error) {
    console.log(`SERVER CRASHED http://localhost:${PORT}`.bgRed.bold);
    await DB.end();
  }
});
