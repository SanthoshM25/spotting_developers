import React, { useEffect } from "react";
import Bottomnav from "../../components/BottomNav";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MessageScreen() {
  const chat = [];
  const fetchChats = async () => {
    const docSnap = await getDocs(collection(db, "chats"));
    docSnap.forEach((doc) => chat.push(doc.data()));
    console.log(chat);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {chat.map((data) => (
        <ul>
          <li>
            {/* <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg"
              alt=""
            /> */}
            <div>
              <h2>Prénom Nom</h2>
              <h3>
                <span class="status orange"></span>
                offline
              </h3>
            </div>
          </li>
        </ul>
      ))}
      <Bottomnav tab="messages" />
    </div>
  );
}
