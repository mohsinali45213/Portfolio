import React from 'react'
import Header from './Components/Header'
import Home from './Page/Home'
import About from './Page/About'
import Projects from './Page/Projects'
import "./App.css"
import Skills from './Page/Skills'

const App = () => { 
  return (
    <div className='container'>
      <Header/>
      <Home/>
      {/* <About/> */}
      <Skills/>
      {/* <Projects/> */}
    </div>
  )
}

export default App