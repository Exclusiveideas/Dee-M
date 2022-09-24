import React, { useEffect, useRef, useState } from "react";
import ChatOnline from "../chatOnline";
import Conversations from "../conversations";
import Message from "../message";
import TopBar from "../topbar";
import "./messenger.css";
import axios from "axios";
import { io } from "socket.io-client";

const MessengerComponents = () => {
  const [user, setUser] = useState({
    _id: "",
    profilePicture: "",
    coverPicture: "",
    username: "",
    email: "",
    password: "",
    friends: "",
  });
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef(null);
  // const socket = useRef();

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

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };
    
    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    // socket.current?.emit("sendMessage", {
    //   senderId: user?._id,
    //   receiverId,
    //   text: newMessage,
    // });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("Error sending message >> ", err);
    }
  };

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

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
            {conversations?.map((c, i) => (
              <div key={i} onClick={() => setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBox_wrapper">
            {currentChat ? (
              <>
                <div className="chatBox_top">
                  {messages?.map((m, i) => (
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m?.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBox_bottom">
                  <textarea
                    placeholder="write something..."
                    className="chatMessage_input"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation_text">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnline_wrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerComponents;
