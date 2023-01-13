import React, { useState } from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import { Call, Videocam, MoreVert } from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import VideoCall from "../videoCall";
import VoiceCall from "../voiceCall";

const TopBar = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDialog, setCurrentDialog] = useState("");

  const currentUser = useSelector((state) => state.user?.currentUser);
  const currentChat = useSelector((state) => state.user?.currentChat);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleVoiceCallOpen = () => {
    setCurrentDialog("voice call");
    setOpenDialog(true);
  };
  const handleVideoCallOpen = () => {
    setCurrentDialog("video call");
    setOpenDialog(true);
  };

  const toggleOpenOptions = () => {
    setOpenOptions(!openOptions);
  };

  return (
    <div className="topbar_wrapper">
      <div className="topbar">
        <div className="topbar_left">
          <div className="topBar_imageContainer">
            <img
              className="avatar"
              src={`https://avatars.dicebear.com/api/${currentUser?.avatar}/${currentUser?.username}.svg`}
              alt="friend's avatar"
            />
            <div className="online_badge"></div>
          </div>
          <div className="name_container">
            <h3>{currentUser?.username}</h3>
          </div>
        </div>
        <div className="topbar_center"></div>
        <div className="topbar_right">
          {currentChat && (
            <>
              <div
                className="topbar_iconContainer"
                onClick={handleVoiceCallOpen}
              >
                <Call fontSize="medium" className="topbar_icon" />
              </div>
              <div
                className="topbar_iconContainer"
                onClick={handleVideoCallOpen}
              >
                <Videocam fontSize="medium" className="topbar_icon" />
              </div>
              <div
                className={`topbar_iconContainer ${
                  openOptions ? "active" : ""
                }`}
                onClick={toggleOpenOptions}
              >
                <MoreVert fontSize="medium" className="topbar_icon" />
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`topbar_moreOptions ${openOptions ? "open" : ""}`}>
        <p className="options">view user</p>
        <p className="options">block notifications</p>
        <p className="options">unfriend user</p>
      </div>
      <CallDialog
        open={openDialog}
        onClose={handleDialogClose}
        currentDialog={currentDialog}
      />
    </div>
  );
};

export default TopBar;

const CallDialog = ({ open, onClose, currentDialog }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      className="call_dialog_container"
    >
      {currentDialog === "video call" && <VideoCall onClose={onClose} />}
      {currentDialog === "voice call" && <VoiceCall onClose={onClose} />}
    </Backdrop>
  );
};
