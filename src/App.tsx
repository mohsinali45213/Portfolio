import Header from "./Components/Header";
import Home from "./Page/Home";
import Projects from "./Page/Projects";
import Skills from "./Page/Skills";
import "./App.css";
import About from "./Page/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resume from "./Page/Resume";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header/>
              <Home />
              <About />
              <Skills />
              <Projects />
            </>
          } />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
