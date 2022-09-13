import React, { useEffect, useState } from "react";
import "./conversations.css";
import noAvatar from "../../assets/images/fiverr.png";
import axios from "axios";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res?.data);
      } catch (err) {
        console.log("Error getting friend >> ", err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={user?.profilePicture ? user?.profilePicture : noAvatar}
        alt="conversation"
        className="conversation_image"
      />
      <span className="conversation_name">{user?.username}</span>
    </div>
  );
};

export default Conversations;
