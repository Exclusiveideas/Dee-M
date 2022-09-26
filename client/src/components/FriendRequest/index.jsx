import React, { useEffect, useState } from "react";
import "./FriendRequest.css";
import noAvatar from "../../assets/images/fiverr.png";
import axios from "axios";
import { useSelector } from "react-redux";

const FriendRequest = ({ onlineUsers, currentId, setCurrentChat, handleOpenDialog }) => {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState(["me", "me","me", "me","me","me","me", "me","me","me","me", "me","me","me","me", "me","me","me","me", "me","me","me","me", "me","me", "me","me", "me","me",  "me","me", "me","me", "me","me", "me",]);

  const currentUser = useSelector(state => state.user?.currentUser);

  useEffect(() => {
    // get user's friends
    // const getFriends = async () => {
    //   const res = await axios.get("/users/friends" + currentId);
    //   setFriends(res?.data);
    // };
    // getFriends();
  }, [currentId]);

  useEffect(() => {
    // setFriendRequests(friends?.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);


  const handleImageClick = (e) => {
    // handleOpenDialog(e)
  }
 
  return (
    <div className="friendRequest">
      <div className="friendRequest_imageCont">
        <img
            src={`https://avatars.dicebear.com/api/${currentUser?.avatar}/${currentUser?.username}.svg`}
              alt="pending_friend"
              className="friendRequest_img"
              onClick={handleOpenDialog}
              name="user image"
        />
        </div>
        <div className="friendRequest_info">
          <p className="friendRequest_name">{currentUser?.username}</p>
          <div className="request_buttonCont">
            <button className="request_button accept">Accept</button>
            <button className="request_button">Reject</button>
          </div>
        </div>
    </div>
  );
};

export default FriendRequest;
