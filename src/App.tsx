import Header from './Components/Header'
import Home from './Page/Home'
import Projects from './Page/Projects'
import Skills from './Page/Skills'
import "./App.css"
import Footer from './Components/Footer'
import About from './Page/About'

const App = () => { 
  return (
    <div className='container'>
      <Header/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      {/* <Footer/> */}
    </div>
  )
}

export default App