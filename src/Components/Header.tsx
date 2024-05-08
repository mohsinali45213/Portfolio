import { useState } from "react"

const Header = () => {
  const [toggle,setToggle] = useState<boolean>(false)
  return (
    <div id='header'>
      <h2>Mohsin Aghariya</h2>
      <ul className={`${toggle?"show":""}`}>
      <i className="fa-solid fa-xmark" onClick={()=>setToggle(false)}></i>
        <li onClick={()=>setToggle(false)}><a href="#home">Home</a></li>
        <li onClick={()=>setToggle(false)}><a href="#about">About</a></li>
        <li onClick={()=>setToggle(false)}><a href="#skills">Skills</a></li>
        <li onClick={()=>setToggle(false)}><a href="#project">Project</a></li>
      </ul>
      <i className="fa-solid fa-bars" onClick={()=>setToggle(true)}></i>
    </div>
  )
}

export default Header