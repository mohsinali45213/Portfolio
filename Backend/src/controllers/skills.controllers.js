import Skills from "../models/Skills.models.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";

const createSkills = async (req,res)=>{
  try {
    const skill = new Skills(req.body);
    const result = await uploadOnCloudinary(req.file.path)
    skill.img = result.url
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.log("skill is not create",error);
  }
}

const getSkills = async (req,res)=>{
  try {
    const skills = await Skills.find();
    res.status(200).json(skills);
  } catch (error) {
    console.log("skill is not get",error);
  }
}

const updateSkills =async (req,res)=>{
  try {
    console.log(req.params.id);
    if(req.file){
      const result = await uploadOnCloudinary(req.file.path)
      req.body.img=result.url;
    }
    const skill =await Skills.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(skill);
  } catch (error) {
    console.log("skill is not update",error);
  }
}

const deleteSkills = async(req,res)=>{
  try {
    const skill = await Skills.findByIdAndDelete(req.params.id);
    res.status(200).json(skill);
  } catch (error) {
    console.log("skill is not delete",error);
  }
}

export {
  createSkills,
  getSkills,
  updateSkills,
  deleteSkills
}