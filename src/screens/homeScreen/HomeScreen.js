import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import "../../components/Card/card.css";
import "./home.css";
import "reactjs-bottom-navigation/dist/index.css";
import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiUser5Fill,
  RiSearchEyeFill,
} from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { RiUser5Line } from "react-icons/ri";
import axios from "axios";

export default function HomeScreen() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [activeTabs, setActiveTabs] = useState("home");
  useEffect(() => {
    switch (activeTabs) {
      case "home":
        navigate("/");
        break;
      case "search":
        break;
      case "account":
        break;
      default:
        navigate("/");
        break;
    }
  }, [activeTabs, navigate]);

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
          console.log(response);
          setUsers(response.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="home-container">
      {users &&
        users.map((user, i) => (
          <Card
            key={i}
            data={{
              name: user.Name,
              bio: user.Description,
              skills: user.Skills,
              image: user.profileImageUrl,
            }}
          />
        ))}

      <div className="bottom-nav">
        <div className="bn-tab">
          {activeTabs === "home" ? (
            <RiHomeSmile2Fill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("home")}
            />
          ) : (
            <RiHomeSmile2Line
              size="35"
              color="#000"
              onClick={() => setActiveTabs("home")}
            />
          )}
        </div>
        <div className="bn-tab">
          {activeTabs === "messages" ? (
            <RiSearchEyeFill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("search")}
            />
          ) : (
            <BiSearchAlt
              size="35"
              color="#000"
              onClick={() => setActiveTabs("search")}
            />
          )}
        </div>

        <div className="bn-tab">
          {activeTabs === "account" ? (
            <RiUser5Fill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("account")}
            />
          ) : (
            <RiUser5Line
              size="35"
              color="#000"
              onClick={() => setActiveTabs("account")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
