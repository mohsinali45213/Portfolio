import { upload } from "../../middleware/multer.middleware.js";
import { createProjects,deleteProjects,getProjects,updateProjects } from "../controllers/projects.controllers.js";
import { Router } from "express";
const projectsRoutes = Router()

projectsRoutes.post("/projects",upload.single('img'),createProjects);
projectsRoutes.get("/projects",getProjects);
projectsRoutes.put("/projects/:id",upload.single('img'),updateProjects);
projectsRoutes.delete("/projects/:id",deleteProjects);

export default projectsRoutes;