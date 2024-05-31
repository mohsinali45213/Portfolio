import { Link } from "react-router-dom"
import "../App.css"
const Resume = () => {
  return (
    <div id="resume">
      <img src="https://res.cloudinary.com/mohsin45213/image/upload/v1717134542/Resume_wnezqq.jpg" alt="" />
      <Link to="/"><button>Back</button></Link>
    </div>
  )
}

export default Resume