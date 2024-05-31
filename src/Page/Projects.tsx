import { useEffect, useState } from "react";
import service from "../Appwrite/ProjectsData.ts";

type Data = {
  title: string;
  description: string;
  imgUrl: URL;
  liveUrl: string;
  githubUrl: string;
};

const Projects = () => {
  const [post, setPost] = useState<any>([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await service.getPosts([]);
        // console.log(data);

        if (data !== false) {
          setPost(data.documents);
        }
      } catch (error) {
        console.log(error);
        
      }
    };

    getPost();
  }, []);

  return (
    <div id="project">
      <h2>Projects</h2>
      <div id="project-container">
        {post.map((item: Data, i: number) => (
          <div className="cart" key={i}>
            <img src={item.imgUrl.toString()} alt="" />
            <div className="detail">
              <h2>{item?.title}</h2>
              <p>{item?.description}</p>
              <div className="button">
                <a href={item?.liveUrl} target="_blank">
                  <button>Live</button>
                </a>
                <a href={item?.githubUrl} target="_blank">
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
