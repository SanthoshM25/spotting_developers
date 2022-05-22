import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./message.css";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { onSnapshot } from "firebase/firestore";

export default function Chat() {
  const { name: chatter, id } = useParams();
  const [userData, setUserData] = useState([]);
  const [messages, setMessages] = useState([]);
  console.log(chatter, id);
  const [newMessage, setNewMessage] = useState("");

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messagesRef = doc(db, "chats", id);
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      await updateDoc(messagesRef, {
        messages: arrayUnion({
          message: trimmedMessage,
          sentBy: localStorage.getItem("name"),
        }),
      });

      setNewMessage("");
    }
  };

  useEffect(() => {
    const messagesSnapshot = onSnapshot(doc(db, "chats", id), (snapshot) => {
      const data = snapshot.data();
      setUserData(data);
      setMessages(snapshot.data().messages);
    });
    return messagesSnapshot;
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div>
        {messages.map((msg) => (
          <div>
            <h2>{msg.message}</h2>
            <p>{msg.sentBy}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={newMessage} onChange={handleOnChange} />
        <button onClick={handleSubmit} disabled={!newMessage}>
          send
        </button>
      </div>
    </div>
  );
}
