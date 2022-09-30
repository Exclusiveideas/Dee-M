import React, { useEffect } from "react";
import "./message.css";
import { publicReq } from "../../axios";
import { useState } from "react";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  const [senderDetails, setSenderDetails] = useState(null);

  useEffect(() => {
    const fetchSenderDetails = async () => {
      try {
        const res = await publicReq.get("/users?userId=" + message?.senderId);
        setSenderDetails(res?.data);
      } catch (err) {
        console.log("error fetching sender details: ", err);
      }
    };
    message.senderId && fetchSenderDetails();
  }, [message]);

  return (
    <div className="message">
      {senderDetails ? (
        <div className={`${own && "own"} message_detailsCont `}>
          <img
            src={`https://avatars.dicebear.com/api/${senderDetails?.avatar}/${senderDetails?.username}.svg`}
            alt="message sender avatar"
            className="message_image"
          />
          <div className="messageInfo_wrapper">
            <div className="message_Info">
              <p className="message_text">{message.text}</p>
            </div>
            <div className="message_date">{format(message?.createdAt)}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Message;
