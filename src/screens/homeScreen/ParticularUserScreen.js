import { Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "../userProfile/profileCard.css";
import { Card } from "antd";
const { Meta } = Card;

const { Title, Text, Link, Paragraph } = Typography;

export default function ParticularUserScreen() {
  const [userData, setUserData] = useState();
  const [mediumData, setMediumData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleMessage = async () => {
    let id = 0;
    await getDocs(collection(db, "chats")).then((res) => {
      res.forEach((data) => {
        if (
          data.data().users.includes(localStorage.getItem("name")) &&
          data.data().users.includes(userData.data.Name)
        ) {
          id = data.id;
        }
      });
    });
    if (id === 0) {
      await addDoc(collection(db, "chats"), {
        messages: [],
        users: [localStorage.getItem("name"), userData.data.Name],
      }).then((res) => (id = res.id));
    }
    navigate(`/chat/${userData.data.Name}/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/get/user/detail`,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/blog/user/medium/posts`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setMediumData(response.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="profile-screen-wrapper"
      style={{ backgroundColor: "#0EAD69" }}
    >
      {userData && userData.data && (
        <Card
          hoverable
          style={{
            textAlign: "center",
            width: "30%",
            margin: 5,
            borderRadius: "20px",
          }}
          cover={<img alt="user image" src={userData.data.profileImgUrl} />}
        >
          <Meta title={userData.data.Name} description={userData.data.Email} />
        </Card>
      )}

      <Card
        size="small"
        style={{
          width: "50%",
          margin: 5,
          borderRadius: "20px",
        }}
      >
        <Meta title="PROJECTS" style={{ textAlign: "center" }} />
        {userData &&
          userData.projects &&
          userData.projects.map((project, i) => (
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
                <Title level={2}>{project.Name}</Title>
              </a>
              <Paragraph ellipsis={5}>
                Description ~
                {project.Description == undefined
                  ? "..."
                  : `  ${project.Description}`}
              </Paragraph>
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
        size="medium"
        style={{
          width: "50%",
          margin: 5,
          borderRadius: "20px",
        }}
      >
        <Meta
          title="BLOGS"
          style={{
            textAlign: "center",
            borderRadius: "20px",
            margin: "5px",
          }}
        />
        {userData &&
          userData.blog &&
          userData.blog.map((blog, i) => {
            console.log(blog);
            return (
              <Card
                style={{
                  margin: 5,
                  borderRadius: "20px",
                  backgroundColor: "#8EF6C9",
                }}
                className="project-card"
              >
                <a href={blog.url}>
                  <Title level={4}>{blog.Title}</Title>
                  <p className="blog-p">{blog.Description}</p>
                </a>
              </Card>
            );
            // <Card
            //   style={{ margin: 5, borderRadius: "20px" }}
            //   className="project-card"
            // >
            //   <a href={blog.url}>
            //     <h3>{blog.title}</h3>
            //     <p className="blog-p">{blog.description}</p>
            //   </a>
            // </Card>
          })}
      </Card>
      <Card
        size="medium"
        style={{
          width: "50%",
          margin: 5,
          borderRadius: "20px",
        }}
      >
        <Meta
          title="MEDIUM BLOGS"
          style={{
            textAlign: "center",
            borderRadius: "20px",
            margin: "5px",
          }}
        />
        {mediumData &&
          mediumData.map((blog, i) => {
            console.log(blog);
            return (
              <Card
                style={{
                  margin: 5,
                  borderRadius: "20px",
                  backgroundColor: "#8EF6C9",
                  textAlign: "center",
                }}
                className="project-card"
              >
                <a href={blog.link}>
                  <img
                    src={blog.thumbnail}
                    style={{
                      width: "100%",
                      height: "70%",
                    }}
                  />
                  <Title level={4}>{blog.title}</Title>
                </a>
              </Card>
            );
          })}
      </Card>

      <Card
        size="small"
        style={{
          width: "50%",
          margin: 5,

          borderRadius: "20px",
        }}
      >
        <Meta title="EDUCATION" style={{ textAlign: "center" }} />
        {userData &&
          userData.data &&
          userData.data.Education.map((education, i) => (
            <Card
              style={{
                margin: 5,
                borderRadius: "20px",
                borderRadius: "20px",
                margin: "5px",
                backgroundColor: "#8EF6C9",
              }}
              className="project-card"
            >
              <Title>{education.Degree}</Title>
              <h3>{education.Institution}</h3>
              <p>{`${education.StartYear} - ${education.EndYear}`}</p>
            </Card>
          ))}
      </Card>

      <Card
        size="small"
        style={{
          width: "50%",
          margin: 5,

          borderRadius: "20px",
        }}
      >
        <Meta title="EXPERIENCE" style={{ textAlign: "center" }} />
        {userData &&
          userData.data.Experience &&
          userData.data.Experience.map((experience, i) => (
            <Card
              style={{
                margin: 5,
                borderRadius: "20px",
                borderRadius: "20px",
                margin: "5px",
                backgroundColor: "#8EF6C9",
              }}
              className="project-card"
            >
              <Title>{experience.CompanyName}</Title>
              <h4>Position:{experience.Position}</h4>
              <p>{experience.Description}</p>
              <p>Duration:{`${experience.Duration} Months`}</p>
            </Card>
          ))}
      </Card>

      <div style={{ marginTop: 5 }}>
        {userData && userData.score && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="score-pill">
              <p>Blog score</p>
              <p>{`${userData.score.blogscore} - ${userData.score.blogCount}`}</p>
            </div>
            <div className="score-pill">
              <p>Project score</p>
              <p>{`${userData.score.projectscore} - ${userData.score.projectCount}`}</p>
            </div>
          </div>
        )}
      </div>
      <button className="msg-btn" onClick={handleMessage}>
        Message
      </button>
    </div>
  );
}
