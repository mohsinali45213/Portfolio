import projectData from "../Database/Data.ts";

type Data = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  liveUrl: string;
  sourceUrl: string;
};

const Projects = () => {
  console.log(projectData);

  return (
    <div id="project">
      <h2>Projects</h2>
      <div id="project-container">
        {projectData.map((item: Data) => (
          <div className="cart">
            <img src={item.imgUrl} alt="" />
            <div className="detail">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="button">
                <a href={item.liveUrl} target="_blank">
                  <button>Live</button>
                </a>
                <a href={item.sourceUrl} target="_blank">
                  <button>Source</button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
