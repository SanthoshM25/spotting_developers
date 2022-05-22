import React, { useEffect, useState } from "react";
import Bottomnav from "../../components/BottomNav";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./message.css";

export default function MessageScreen() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const chat = [];

  const fetchChats = async () => {
    const docSnap = await getDocs(collection(db, "chats"));
    docSnap.forEach((doc) => {
      console.log(doc.data());
      if (doc.data().users.includes(localStorage.getItem("name")))
        chat.push({ ...doc.data(), id: doc.id });
    });
    console.log(chat);
    setChats(chat);
  };

  const handleClick = (data) => {
    data.users.map((user) => {
      if (user !== localStorage.getItem("name"))
        navigate(`/chat/${user}/${data.id}`);
    });
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chats.length > 0 &&
        chats.map((data) => {
          return (
            <Card onClick={() => handleClick(data)} className="userMsgCard">
              {data.users.map((user) => {
                if (user !== localStorage.getItem("name")) {
                  return <h2>{user}</h2>;
                }
              })}
            </Card>
          );
        })}
      <Bottomnav tab="messages" />
    </div>
  );
}
