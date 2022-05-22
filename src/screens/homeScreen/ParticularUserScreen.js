import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "../userProfile/profileCard.css";
import { Card } from "antd";
const { Meta } = Card;

export default function () {
  const [userData, setUserData] = useState();
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
  }, []);

  return (
    <div className="profile-screen-wrapper">
      {userData && userData.data && (
        <Card
          hoverable
          style={{ textAlign: "center", width: "50%", margin: 5 }}
          cover={<img alt="user image" src={userData.data.profileImgUrl} />}
        >
          <Meta title={userData.data.Name} description={userData.data.Email} />
        </Card>
      )}

      <Card size="small" style={{ width: "50%", margin: 5 }}>
        <Meta title="PROJECTS" style={{ textAlign: "center" }} />
        {userData &&
          userData.projects &&
          userData.projects.map((project, i) => (
            <Card style={{ margin: 15 }} className="project-card">
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={`https://github.com/${project.Full_name}`}
              >
                <h3>{project.Name}</h3>
                <p>{project.Description}</p>
                <p>{project.Language}</p>
              </a>
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
      <Card size="small" style={{ width: "50%", margin: 5 }}>
        <Meta title="BLOGS" style={{ textAlign: "center" }} />
        {userData &&
          userData.blog &&
          userData.blog.map((blog, i) => (
            <Card style={{ margin: 5 }} className="project-card">
              <a href={blog.url}>
                <h3>{blog.Title}</h3>
                <p className="blog-p">{blog.Description}</p>
              </a>
            </Card>
          ))}
      </Card>

      <Card size="small" style={{ width: "50%", margin: 5 }}>
        <Meta title="EDUCATION" style={{ textAlign: "center" }} />
        {userData &&
          userData.data &&
          userData.data.Education.map((education, i) => (
            <Card style={{ margin: 5 }} className="project-card">
              <h3>{education.Institution}</h3>
              <h4>{education.Degree}</h4>
              <p>{`${education.StartYear} - ${education.EndYear}`}</p>
            </Card>
          ))}
      </Card>

      <Card size="small" style={{ width: "50%", margin: 5 }}>
        <Meta title="EXPERIENCE" style={{ textAlign: "center" }} />
        {userData &&
          userData.data &&
          userData.data.Experience.map((experience, i) => (
            <Card style={{ margin: 5 }} className="project-card">
              <h3>{experience.CompanyName}</h3>
              <h4>{experience.Position}</h4>
              <p>{experience.Description}</p>
              <p>{`${experience.Duration} Months`}</p>
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
