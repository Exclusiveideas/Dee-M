import React from "react";
import "./message.css";
import noImage from "../../assets/images/fiverr.png";
// import { format } from 'timeago.js';

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message_top">
        <img src={noImage} alt="message" className="message_image" />
        <p className="message_text">{message?.text}</p>
      </div>
      {/* <div className="message_bottom">{format(message?.createdAt)}</div> */}
    </div>
  );
};

export default Message;
