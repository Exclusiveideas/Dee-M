import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import noAvatar from "../../assets/images/fiverr.png";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    // get user's friends
    const getFriends = async () => {
      const res = await axios.get("/users/friends" + currentId);
      setFriends(res?.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `conversations/find/${currentId}/${user?._id}`
      );
      setCurrentChat(res?.data);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends?.map((o) => (
        <div className="chatOnline_friend" onClick={() => handleClick(o)}>
          <div className="chatOnline_imgCont">
            <img
              src={o?.profilePicture ? o.profilePicture : noAvatar}
              alt="friend"
              className="chatOnline_img"
            />
            <div className="chatOnline_badge"></div>
          </div>
          <span className="chatOnline_name">{o?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
