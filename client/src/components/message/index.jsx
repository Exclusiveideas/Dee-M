import React from "react";
import "./message.css";
import noImage from "../../assets/images/fiverr.png";
// import { format } from 'timeago.js';

const Message = ({ message, own }) => {
  return (
    <div className="message">
      <div className={`${own !== "me" && "own"} message_detailsCont `}>
        <img src={noImage} alt="message" className="message_image" />
        <div className="message_Info">
          <p className="message_text">lorem hi how are you doing? Lorem ipsum dolor.</p>
          {/* <div className="message_date">{format(message?.createdAt)}</div> */}
          <div className="message_date">12/22/33</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
