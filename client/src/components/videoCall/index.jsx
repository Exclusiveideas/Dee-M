import React, { useEffect, useState, useRef } from "react";
import { Call } from "@mui/icons-material";
import "./videoCall.css";
import { io } from "socket.io-client";
import Peer from 'simple-peer';
import { useSelector } from "react-redux";

const VideoCall = ({ onClose }) => {
  const [largeVideo, setLargeVideo] = useState("");
  const [smallVideo, setSmallVideo] = useState("");

  const [callAnswered, setCallAnswered] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});

  const myVideo = useRef();
  const friendVideo = useRef();
  const connectionRef = useRef();

  // const socket = useSelector((state) => state.user?.socket);
  const currentUser = useSelector((state) => state.user?.currentUser);

  const socket = io("ws://localhost:5001");
  const friend = "Muftau2";

  const videoLink =
    "https://media.istockphoto.com/videos/floating-boat-on-water-red-small-boat-nobody-video-id1404326962";
  const videoLink2 =
    "https://media.istockphoto.com/videos/beautiful-boats-at-the-pier-on-the-lake-in-the-alps-video-id956176422";

  useEffect(() => {

    socket.on("videoCallUser", ({ callerId, callerName, signal }) => {
      setCall({ isReceivingCall: true, callerId, callerName, signal });
    });
  }, []);

  const accessCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        let video = myVideo.current;
        video.srcObject = currentStream;
        video.play();
      })
      .catch(err => {
        console.error("error accessing user media:", err);
      });
  }
    accessCamera()

  const answerVideoCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerVideoCall", { signal: data, to: call.callerId });
    });

    peer.on("stream", (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const videoCallUser = (callReceiverId) => {
    // callReceiverId is the _id of the friend you are calling

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("videoCallUser", {
        callReceiver: callReceiverId,
        signalData: data,
        callerId: currentUser?._id,
        callerName: currentUser?.username,
      });
    });

    peer.on("stream", (currentStream) => {
      friendVideo.current.srcObject = currentStream;
    });

    socket.on("videoCallAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveVideoCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    // window.location.reload();
  };

  useEffect(() => {
    setLargeVideo(videoLink);
    setSmallVideo(videoLink2);
  }, []);

  const switchCamera = () => {
    if (!callAnswered) return;

    if (largeVideo == videoLink2) {
      setLargeVideo(videoLink);
      setSmallVideo(videoLink2);
    } else {
      setLargeVideo(videoLink2);
      setSmallVideo(videoLink);
    }
  };

  const testMe = () => {
    setCallAnswered(!callAnswered);
  };

  const hangUp = () => {
    setCallAnswered(false);
    myVideo.current.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });
    onClose(true);
  };

  return (
    <div className="videoCall_wrapper">
      <div className="videoCall_bodyContainer">
        {!callAnswered && (
          <div className="title_container">
            <h3 className="title">Calling {friend}</h3>
          </div>
        )}
        <div className="cameraWrapper">
          <div
            className={` ${
              callAnswered ? "largeCamera_container" : "invisible"
            }`}
          >
            <video
              className="video_element"
              src={friendVideo.current?.srcObject}
              controls={false}
            />
          </div>
          <div
            className={`smallCamera_container ${callAnswered && "answered"}`}
            onClick={switchCamera}
          >
            {/* <video
              className="video_element"
              ref={myVideo}
              controls={false}
            /> */}
            <video ref={myVideo} controls={false}/>
          </div>
        </div>
        {!callAnswered && (
          <div className="calling_wrapper">
            <div className="dontCall_container" onClick={hangUp}>
              <Call className="hangUp_icon" />
            </div>
            <div className="calling_container" onClick={testMe}>
              <Call className="calling_icon" />
            </div>
          </div>
        )}
        {callAnswered && (
          <div className="hangUp_wrapper">
            <div className="hangUp_container" onClick={hangUp}>
              <Call className="hangUp_icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
