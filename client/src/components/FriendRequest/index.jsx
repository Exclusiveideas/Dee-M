import React, { useEffect, useState } from "react";
import { publicReq } from "../../axios";
import "./FriendRequest.css";

const FriendRequest = ({ requestId, handleOpenDialog }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try{
        const res = await publicReq.get("/users?userId="+ requestId);
        setUserDetails(res?.data);
      } catch(err) {
        console.log("error fetching current user's details: ", err);
      }

    }
    fetchUserDetails();
  }, []);

  return (
    <div className="friendRequest">
      <div className="friendRequest_imageCont">
        <img
            src={`https://avatars.dicebear.com/api/${userDetails?.avatar}/${userDetails?.username}.svg`}
              alt="pending_friend"
              className="friendRequest_img"
              onClick={handleOpenDialog}
              name="user image"
        />
        </div>
        <div className="friendRequest_info">
          <p className="friendRequest_name">{userDetails?.username}</p>
          <div className="request_buttonCont">
            <button className="request_button accept">Accept</button>
            <button className="request_button">Reject</button>
          </div>
        </div>
    </div>
  );
};

export default FriendRequest;
