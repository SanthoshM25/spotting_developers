import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "./profileCard.css";
import { Card } from "antd";
import Bottomnav from "../../components/BottomNav";
const { Meta } = Card;
const { Title, Text, Link } = Typography;

export default function () {
  const [userData, setUserData] = useState();
  const [projectData, setProjectData] = useState();
  const [devtoData, setDevtoData] = useState();
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
        console.log(projectData);
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
        console.log(response.data.projects);
        setProjectData(response.data.projects);
      })
      .catch((err) => console.log(err));

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/blog/user/devto`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        response.data.blogs &&
          setDevtoData(response.data.blogs.filter((blog, i) => i < 3));
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickProjectHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/user/create`,
        { Github_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="profile-screen-wrapper"
      style={{ backgroundColor: "#0EAD69" }}
    >
      {userData && (
        <Card
          hoverable
          style={{
            textAlign: "center",
            width: "50%",
            margin: 5,
            borderRadius: "20px",
          }}
          cover={<img alt="user image" src={userData.profileImgUrl} />}
        >
          <Meta title={userData.Name} description={userData.Email} />
        </Card>
      )}

      <Card
        size="small"
        style={{ width: "50%", margin: 5, borderRadius: "20px" }}
      >
        <Meta title="PROJECTS" style={{ textAlign: "center" }} />
        {projectData &&
          projectData.map((project, i) => (
            <Card
              style={{
                margin: 15,
                borderRadius: "20px",
                backgroundColor: "#8EF6C9",
              }}
              className="project-card"
            >
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`https://github.com/${project.Full_name}`}
              >
                <Title level={3}>{project.Name}</Title>
              </a>
              <p>{project.Description}</p>
              <Text
                underline
                onClick={() => onClickProjectHandler(project.Github_id)}
              >
                click to ShowCase
              </Text>
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
      <Card
        size="small"
        style={{ width: "50%", margin: 5, borderRadius: "20px" }}
      >
        <Meta title="BLOGS" style={{ textAlign: "center" }} />
        {devtoData &&
          devtoData.map((blog, i) => (
            //todo: wrapp with a anchor tag to point devto website
            <Card
              style={{ margin: 15, borderRadius: "20px" }}
              className="project-card"
            >
              <h3>{blog.Name}</h3>
              <p>{blog.Description}</p>
            </Card>
          ))}
      </Card>
      <Bottomnav tab="account" />
    </div>
  );
}
