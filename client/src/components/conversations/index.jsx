import React, { useEffect, useState } from "react";
import "./conversations.css";
import { publicReq } from "../../axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

const Conversations = ({ conversation, handleOpenDialog, online, friendId }) => {
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const currentChat = useSelector((state) => state.user?.currentChat);
  const isSendingMessage = useSelector((state) => state.user?.isSendingMessage);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicReq.get("/users?userId=" + friendId);
        setUser(res?.data);
      } catch (err) {
        console.log("Error getting friend >> ", err);
      }
    };
    friendId && getUser();
  }, [conversation, friendId]);

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await publicReq.get("/messages/" + conversation?._id);
        setLastMessage(res?.data[res?.data?.length - 1]);
      } catch (error) {
        console.log("Error fetching Last message >> ", error);
      }
    }
    getLastMessage();
  }, [isSendingMessage, conversation?._id])
 
  return (
    <div className={` conversation ${currentChat?._id === conversation?._id && "activeChat"}`}>
      <div className="conversation_imageCont">
      <img
        src={`https://avatars.dicebear.com/api/${user?.avatar}/${user?.username}.svg`}
        alt="conversation"
        className="conversation_image"
        onClick={handleOpenDialog}
        name="user image"
      />
      <div className={` ${online && "online_badge"}`}></div>
      </div>
      <div className="conversation_rightInfo">
        <div className="rightInfo_top">
          <span className="conversation_name">{user?.username}</span>
          <span className="last_messageDate">{format(lastMessage?.createdAt)}</span>
        </div>
        <span className="last_message">{lastMessage?.text?.length <= 24 ? lastMessage?.text : lastMessage?.text?.slice(0,24).concat("...")}</span>
      </div>
    </div>
  );
};

export default Conversations;
