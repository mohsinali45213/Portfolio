import mongoose from "mongoose";

const skillsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img:{
    type: String,
    required: true
  }
})

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;