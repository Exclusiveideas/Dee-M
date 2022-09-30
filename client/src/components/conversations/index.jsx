import React, { useEffect, useState } from "react";
import "./conversations.css";
import { publicReq } from "../../axios";

const Conversations = ({ conversation, handleOpenDialog, online, friendId }) => {
  const [user, setUser] = useState(null);
  const text = "hello hw re u doing? Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, veritatis voluptatem eos obcaecati hic vero reiciendis id magnam dolor possimus temporibus nulla, cupiditate labore eaque excepturi error sint, aliquid placeat. "
 
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
  }, [conversation]);
 
  return (
    <div className="conversation">
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
          <span className="last_messageDate">12/22/33</span>
        </div>
        <span className="last_message">{text.length <= 24 ? text : text.slice(0,24).concat("...")}</span>
      </div>
    </div>
  );
};

export default Conversations;
