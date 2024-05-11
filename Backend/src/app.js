import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./db/db.js";
import  skillsRoutes from "./routes/skills.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
const app = express();
dotenv.config({
  path: "../.env",
});

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running on port http://localhost:3000");
  });
});

app.use("/api/v1", skillsRoutes);
app.use("/api/v1", projectsRoutes);
