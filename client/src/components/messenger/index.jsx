import React, { useEffect, useRef, useState } from "react";
import FriendRequest from "../FriendRequest";
import Conversations from "../conversations";
import Message from "../message";
import TopBar from "../topbar";
import "./messenger.css";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { Send, AttachFile, InsertEmoticon, Close } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import DiscoverFriends from "../discoverFriends";
import UserProfile from "../userProfile";
import { publicReq } from "../../axios";

const MessengerComponents = () => {
  const [conversations, setConversations] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDialog, setCurrentDialog] = useState();
  const scrollRef = useRef(null);
  const socket = useRef(null);

  const currentUser = useSelector((state) => state.user?.currentUser);
  
  // connect to socket
  useEffect(() => {
    if(!currentUser) return
    socket.current = io("ws://localhost:8900");
  }, [])

  
  useEffect(() => {
    socket.current?.emit("sendUserId", currentUser?._id);
    socket.current?.on("getUsers", users => {
      setOnlineUsers(users.filter(user => user?.userId !== currentUser?._id))
    });

    socket.current?.on("getMessage", data => {
      setArrivalMessage({
        senderId: data?.senderId,
        text: data?.text,
        createdAt: Date.now()
      })
    })
  }, [currentUser])

  // update messages with the newly sent message
  useEffect(() => {
    arrivalMessage && currentChat?.members?.includes(arrivalMessage?.senderId) && setMessages(prevState => ([...prevState, arrivalMessage]));
  }, [arrivalMessage, currentChat])

  // get all conversation's user has partaken
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await publicReq.get("/conversations/" + currentUser?._id);
        setConversations(res?.data);
      } catch (err) {
        console.log("Error fetching conversations: ", err);
      }
    };
    getConversation();
  }, []);

  // get all messages in a partcular conversation
  useEffect(() => {
    if (!currentChat) return;
    const getConversationMessages = async () => {
      try {
        const res = await publicReq.get("/messages/" + currentChat?._id);
        setMessages(res?.data);
      } catch (error) {
        console.log("Error fetching conversation's messages: ", error);
      }
    };

    getConversationMessages();
  }, [currentChat]);

  // fetch current user's updated info
  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const res = await publicReq.get("/users?userId=" + currentUser?._id);
        setFriendRequests(res?.data?.friendRequest);
      } catch (err) {
        console.log("error fetching current user's details: ", err);
      }
    };
    fetchCurrentUserDetails();
  }, []);

  // submit message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      conversationId: currentChat?._id,
      senderId: currentUser?._id,
      text: newMessage,
    };

    const receiverId = currentChat.members?.find(member => member !== currentUser?._id)

    socket.current?.emit("sendMessage", {
      senderId: currentUser?._id,
      receiverId,
      text: newMessage
    })

    setMessages(prev => [...prev, {
      senderId: currentUser?._id,
      text: newMessage,
      createdAt: Date.now(),
    }]);

    try {
      await publicReq.post("/messages", message);
    } catch (error) {
      console.log("error submiting message: ", error);
    }

    setNewMessage("");
  };

  // scroll to bottom of messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const extractFriendId = (conversation) => {
    return conversation?.members?.find((m) => m !== currentUser?._id)
  }

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
                    friendId={extractFriendId(c)}
                    online={onlineUsers.some(o => o?.userId === (extractFriendId(c)))}
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
                    <div key={i}>
                      <Message
                        message={m}
                        own={m?.senderId === currentUser?._id}
                      />
                    </div>
                  ))}
                  <div ref={scrollRef}></div>
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
              <FriendRequest
                requestId={f}
                key={i}
                handleOpenDialog={handleOpenDialog}
              />
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
