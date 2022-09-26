import React, { useEffect, useRef, useState } from "react";
import FriendRequest from "../FriendRequest";
import Conversations from "../conversations";
import Message from "../message";
import TopBar from "../topbar";
import "./messenger.css";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import noImage from "../../assets/images/fiverr.png";
import { Send, AttachFile, InsertEmoticon, Close } from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";
import DiscoverFriends from "../discoverFriends";
import UserProfile from "../userProfile";

const MessengerComponents = () => {
  const [conversations, setConversations] = useState([
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
  ]);
  const [friendRequests, setFriendRequests] = useState([
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([
    "me",
    "y",
    "me",
    "y",
    "me",
    "me",
    "y",
    "me",
    "me",
    "y",
    "me",
    "me",
    "y",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "y",
    "me",
    "me",
    "me",
    "me",
    "y",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
    "me",
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDialog, setCurrentDialog] = useState();
  const scrollRef = useRef(null);
  // const socket = useRef();

  const currentUser = useSelector((state) => state.user?.currentUser);
  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket.current?.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members?.includes(arrivalMessage.senderId) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current?.emit("addUser", user?._id);
  //   socket.current?.on("getUsers", (users) => {
  //     setOnlineUsers(users?.followings?.filter(f => users?.some(u => u?.userId === f)));
  //   });
  // }, [user]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get("/conversations/" + user._id);
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log("Error etching conversation", err);
  //     }
  //   };
  //   getConversations();
  // }, [user?._id]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const res = await axios.get("/messages/" + currentChat?._id);
  //       setMessages(res?.data);
  //     } catch (err) {
  //       console.log("Error fetching messages >> ", err);
  //     }
  //   };
  //   getMessages();
  // }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    //   const message = {
    //     sender: user?._id,
    //     text: newMessage,
    //     conversationId: currentChat?._id,
    //   };

    //   const receiverId = currentChat.members.find(
    //     (member) => member !== user?._id
    //   );

    // socket.current?.emit("sendMessage", {
    //   senderId: user?._id,
    //   receiverId,
    //   text: newMessage,
    // });

    //   try {
    //     const res = await axios.post("/messages", message);
    //     setMessages([...messages, res.data]);
    //     setNewMessage("");
    //   } catch (err) {
    //     console.log("Error sending message >> ", err);
    //   }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleDialogClose = (e, reason) => {
    if (reason === "backdropClick") return;

    setOpenDialog(false);
  };

  const handleOpenDialog = (e) => {
    const { name } = e.target;

    switch (name) {
      case "discover friends":
        setCurrentDialog(name);
        setOpenDialog(true);
        break;
      case "user image":
        setCurrentDialog(name);
        setOpenDialog(true);
        break;
      default:
        setOpenDialog(false);
    }
  };

  return (
    <div className="messenger_Wrapper">
      <TopBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenu_wrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenu_input"
            />
            <div className="conversations_container">
              {conversations?.map((c, i) => (
                <div
                  style={{ width: "100%" }}
                  key={i}
                  onClick={() => setCurrentChat(c)}
                >
                  <Conversations
                    conversation={c}
                    currentUser={currentUser}
                    handleOpenDialog={handleOpenDialog}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBox_wrapper">
            {currentChat ? (
              <>
                <div className="chatBox_top">
                  {messages?.map((m, i) => (
                    <div key={i} ref={scrollRef}>
                      {/* <Message message={m} own={m?.sender === user?._id} /> */}
                      <Message own={m} />
                    </div>
                  ))}
                </div>
                <div className="chatBox_bottom">
                  <div className="chatMessage_inputCont">
                    <div className="icon_container">
                      <InsertEmoticon className="chatMessage_emoji" />
                    </div>
                    <input
                      placeholder="write something..."
                      className="chatMessage_input"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></input>
                    {!newMessage && (
                      <div className="icon_container">
                        <AttachFile className="chatMessage_attachment" />
                      </div>
                    )}
                  </div>
                  <div className="chatSubmitButton" onClick={handleSubmit}>
                    <Send className="chatSubmit_icon" />
                  </div>
                </div>
              </>
            ) : (
              <span className="noConversation_text">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="friendRequest_container">
          <div className="all_friend_requests">
            <h3 className="friend_requestTitle">Friend Requests</h3>
            {friendRequests?.map((f, i) => (
              <FriendRequest key={i} handleOpenDialog={handleOpenDialog} />
            ))}
          </div>
          <div className="discover_newFriends">
            <button
              className="discover_button"
              name="discover friends"
              onClick={handleOpenDialog}
            >
              Discover Friends
            </button>
          </div>
        </div>
        <SimpleDialog
          open={openDialog}
          onClose={handleDialogClose}
          currentDialog={currentDialog}
        />
      </div>
    </div>
  );
};

export default MessengerComponents;

function SimpleDialog(props) {
  const { open, onClose, currentDialog } = props;

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      className="dialog_container"
    >
      {currentDialog === "discover friends" && (
        <DiscoverFriends onClose={onClose} />
      )}
      {currentDialog === "user image" && <UserProfile onClose={onClose} />}
    </Backdrop>
  );
}
