import mongoose from "mongoose";

const projectsSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  liveUrl:{
    type:String,
  },
  sourceUrl:{
    type:String
  }
})

const Projects = mongoose.model("Projects",projectsSchema);

export default Projects;