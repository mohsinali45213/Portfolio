import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div id="home">
      <h3>HELLO AND WELCOME</h3>
      <div>I'm <span>Mohsin </span>, UI Designer and <br /> Full Stack Developer.</div>
      <h3>I design and build beautiful websites. I have been passionate about <br /> frontend design & development. Also I like spend my leisure time <br /> learning.</h3>
      <div>
        <a href="#project"><button>See my works</button></a>
        <Link to="/resume"><button>My Resume</button></Link>
      </div>
      <i className="fa-solid fa-computer-mouse"></i>
    </div>
  )
}

export default Home