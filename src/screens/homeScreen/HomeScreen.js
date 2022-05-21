import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserCard from "../../components/Card/UserCard";
import "../../components/Card/card.css";
import "./home.css";

import axios from "axios";
import Bottomnav from "../../components/BottomNav";

export default function HomeScreen() {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/authentication");
    else {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/get/user/all`,
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
          } else setUsers(response.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="home-container">
      {users &&
        users.map((user, i) => (
          <UserCard
            key={i}
            data={{
              name: user.Name,
              bio: user.Description,
              skills: user.Skills,
              image: user.profileImageUrl,
              id: user._id,
              score: user.score,
            }}
          />
        ))}

      <Bottomnav tab="home" />
    </div>
  );
}
