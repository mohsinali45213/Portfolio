import Header from './Components/Header'
import Home from './Page/Home'
import About from './Page/About'
import Projects from './Page/Projects'
import Skills from './Page/Skills'
import "./App.css"

const App = () => { 
  return (
    <div className='container'>
      <Header/>
      <Home/>
      <Skills/>
      <About/>
      <Projects/>
    </div>
  )
}

export default App