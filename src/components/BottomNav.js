import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "reactjs-bottom-navigation/dist/index.css";
import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiUser5Fill,
  RiSearchEyeFill,
} from "react-icons/ri";
import { BiSearchAlt, BiMessageRoundedDots } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { RiUser5Line } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";

const Bottomnav = ({ tab }) => {
  const navigate = useNavigate();
  const [activeTabs, setActiveTabs] = useState(tab);
  useEffect(() => {
    switch (activeTabs) {
      case "home":
        navigate("/");
        break;
      case "search":
        navigate("/search");
        break;
      case "messages":
        navigate("/messages");
        break;
      case "account":
        navigate("/account");
        break;
      default:
        navigate("/");
        break;
    }
  }, [activeTabs, navigate]);

  return (
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
        {activeTabs === "search" ? (
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
        {activeTabs === "messages" ? (
          <AiFillMessage
            size="35"
            color="#000"
            onClick={() => setActiveTabs("messages")}
          />
        ) : (
          <BiMessageRoundedDots
            size="35"
            color="#000"
            onClick={() => setActiveTabs("messages")}
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
  );
};

export default Bottomnav;
