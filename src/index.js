// pkgs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "colors";

// routers
import user_routers from "./routers/users.js";
import task_routers from "./routers/tasks.js";

dotenv.config();
const app = express();
const PORT = Number(process.env.SERVER_PORT);

// middlewares
app.use(
  cors({
    origin: process.env.REACT_APP_DOMAIN,
  })
);
app.use(express.json());
app.use("/api/v1/users/", user_routers);
app.use("/api/v1/tasks/", task_routers);

// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "hello from server" });
// });

// server
app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`.bgGreen.bold);
});
