import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "./profileCard.css";
import { Card } from "antd";
import Bottomnav from "../../components/BottomNav";
const { Meta } = Card;
const { Title, Text, Link } = Typography;
const { Paragraph } = Typography;

export default function ProfileCard() {
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
        console.log(projectData, response.data.projects);
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
        response.data.blogs && setDevtoData(response.data.blogs);
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

  const onClickProjectRemoveHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/user/remove`,
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

  const onClickBlogHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/blog/user/create`,
        { Blog_id: id },
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

  const onClickBlogRemoveHandler = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/blog/user/remove`,
        { Blog_id: id },
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

            width: "30%",
            margin: 5,
            borderRadius: "20px",
          }}
          cover={
            <img
              src={userData.profileImgUrl}
              onClick={(e) => {
                console.log(e);
              }}
            />
          }
        >
          <Meta title={userData.Name} description={userData.Email} />
        </Card>
      )}

      <Card
        size="small"
        style={{
          width: "95%",
          margin: 5,
          borderRadius: "20px",
        }}
      >
        <Meta title="PROJECTS" style={{ textAlign: "center" }} />
        {projectData &&
          projectData.map((project, i) => (
            <Card
              style={{
                margin: 15,
                borderRadius: "20px",
                backgroundColor: "#8EF6C9",
                display: "inline-block",
                height: "200px",
                width: "300px",
              }}
              className="project-card"
            >
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`https://github.com/${project.full_name}`}
              >
                <Title level={4}>{project.name}</Title>
              </a>
              <Paragraph ellipsis={1}>
                Description ~
                {project.description === undefined
                  ? "..."
                  : `  ${project.description}`}
              </Paragraph>
              <Text underline onClick={() => onClickProjectHandler(project.id)}>
                click to ShowCase
              </Text>
              <Text
                style={{ margin: "25px" }}
                underline
                onClick={() => onClickProjectRemoveHandler(project.id)}
              >
                click to Remove
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
        style={{
          width: "95%",
          margin: 5,
          borderRadius: "20px",
          justifyContent: "center",
        }}
      >
        <Meta title="BLOGS" style={{ textAlign: "center" }} />
        {devtoData &&
          devtoData.map((blog, i) => (
            <Card
              style={{
                margin: 5,
                borderRadius: "20px",
                display: "inline-block",
                height: "200px",
                width: "300px",
              }}
              className="project-card"
            >
              <a href={blog.url}>
                <Title level={4}>{blog.title}</Title>
                <p className="blog-p">{blog.description}</p>
              </a>
              <Text underline onClick={() => onClickBlogHandler(blog.id)}>
                click to ShowCase
              </Text>
              <Text
                style={{ margin: "25px" }}
                underline
                onClick={() => onClickBlogRemoveHandler(blog.id)}
              >
                click to Remove
              </Text>
            </Card>

            // <Card
            //   style={{ margin: 15, borderRadius: "20px" }}
            //   className="project-card"
            // >
            //   <a
            //     style={{ textDecoration: "none", color: "black" }}
            //     href={""}
            //   >
            //     <Title level={3}>{blog.Name}</Title>
            //   </a>
            //   <p>{blog.Description}</p>
            //   <Text
            //     underline
            //     onClick={() => onClickProjectHandler(blog.Github_id)}
            //   >
            //     click to ShowCase
            //   </Text>
            //   <Text
            //     style={{ margin: "25px" }}
            //     underline
            //     onClick={() => onClickProjectRemoveHandler(blog._id)}
            //   >
            //     click to Remove
            //   </Text>
            //   <h3>{blog.Name}</h3>
            //   <p>{blog.Description}</p>
            // </Card>
          ))}
      </Card>
      <Bottomnav tab="account" />
    </div>
  );
}
