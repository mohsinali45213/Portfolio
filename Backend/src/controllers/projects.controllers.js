import Projects from "../models/Projects.models.js";

const createProjects = async (req,res)=>{
  try {
    const project = new Projects(req.body);
    const result = await uploadOnCloudinary(req.file.path)
    project.image = result.url
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log("project is not create",error);
  }
}

const getProjects = async (req,res)=>{
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    console.log("project is not found",error);
  }
}

const updateProjects = async (req,res) => {
  try {
    if(req.file){
      const result = await uploadOnCloudinary(req.file.path)
      req.body.img=result.url;
    }
    const project = await Projects.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(project);
  } catch (error) {
    console.log("project is not updated",error);
  }
}

const deleteProjects = async (req,res) => {
  try {
    const project = await Projects.findByIdAndDelete(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    console.log("project is not deleted",error);
  }
}

export {
  createProjects,
  getProjects,
  updateProjects,
  deleteProjects
}