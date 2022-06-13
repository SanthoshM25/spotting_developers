import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserCard from "../../components/Card/UserCard";
import "../../components/Card/card.css";
import "./home.css";

import axios from "axios";
import Bottomnav from "../../components/BottomNav";
import { Card } from "antd";
import { Typography, Space } from "antd";

const { Title, Text, Link } = Typography;

const { Meta } = Card;

export default function HomeScreen() {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/authentication");
    else {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/user/search`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.err &&
            response.data.err.message === "jwt expired"
          ) {
            alert("session expired");
            localStorage.removeItem("token");
            navigate("/authentication");
          } else {
            setUsers(response.data.data);
            console.log(response.data.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="home-container" style={{ backgroundColor: "#0EAD69" }}>
      <Title level={1} underline style={{ padding: "100px" }}>
        Welcome to SpottingDev
      </Title>
      <div
        className="home-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {users &&
          users.map((user, i) => (
            <UserCard
              key={i}
              data={{
                status: user.status,
                name: user.Name,
                bio: user.Description,
                skills: user.Skills,
                image: user.profileImgUrl,
                id: user._id,
                score: user.Score.score,
              }}
            />
          ))}
      </div>

      <Bottomnav tab="home" />
    </div>
  );
}
