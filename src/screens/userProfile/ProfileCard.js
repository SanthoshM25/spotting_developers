import axios from "axios";
import React, { useEffect, useState } from "react";

import "./profileCard.css";
import { Card } from "antd";
const { Meta } = Card;

export default function ({ token }) {
  const [userData, setUserData] = useState();
  const [projectData, setProjectData] = useState();
  const [githubData, setGithubData] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/get/alldetails`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
        setProjectData(response.data.projects);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/user/gitrepo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setGithubData(response.data.projects);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="profile-screen-wrapper">
      {userData && (
        <Card
          hoverable
          style={{ textAlign: "center", width: "50%" }}
          cover={<img alt="user image" src={userData.profileImgUrl} />}
        >
          <Meta title={userData.Name} description={userData.Email} />
        </Card>
      )}

      <Card size="small" style={{ width: "50%" }}>
        <Meta title="PROJECTS" style={{ textAlign: "center" }} />
        {projectData &&
          projectData.map((project, i) => (
            <Card style={{ margin: 15 }} className="project-card">
              <h3>{project.Name}</h3>
              <p>{project.Description}</p>
              <p>{project.Language}</p>
            </Card>
          ))}
      </Card>
      {/* {githubData && (
        <div className="github">
          {githubData.map((proj, i) => (
            <ProjectCard
              key={i}
              title={proj.name}
              url={proj.url}
              language={proj.language}
              description={proj.description}
            />
          ))}
        </div>
      )} */}
      <Card size="small" style={{ width: "50%" }}>
        <Meta title="BLOGS" style={{ textAlign: "center" }} />
        {/* {projectData &&
          projectData.map((project, i) => (
            <Card style={{ margin: 15 }} className="project-card">
              <h3>{project.Name}</h3>
              <p>{project.Description}</p>
              <p>{project.Language}</p>
            </Card>
          ))} */}
      </Card>
    </div>
  );
}
