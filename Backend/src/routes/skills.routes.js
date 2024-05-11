import { upload } from "../../middleware/multer.middleware.js";
import { createSkills,deleteSkills,getSkills,updateSkills } from "../controllers/skills.controllers.js";
import { Router } from "express";
const skillsRoutes = Router()

skillsRoutes.get("/skills",getSkills);
skillsRoutes.post("/skills",upload.single("img"),createSkills);
skillsRoutes.put("/skills/:id",upload.single("img"),updateSkills);
skillsRoutes.delete("/skills/:id",deleteSkills);

export default skillsRoutes