import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Call } from '@mui/icons-material';
import './voiceCall.css';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
 
const VoiceCall = ({ onClose }) => {
  const [mute, setMute] = useState(false);

  const [callAnswered, setCallAnswered] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});

  const myAudio = useRef();
  const friendAudio = useRef();
  const connectionRef = useRef();

  const socket = useSelector((state) => state.user?.socket);
  const currentUser = useSelector((state) => state.user?.currentUser);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myAudio.current.srcObject = currentStream;
      });

    socket.on("voiceCallUser", ({ callerId, callerName, signal }) => {
      setCall({ isReceivingCall: true, callerId, callerName, signal });
    });
  }, []);

  const answerVoiceCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerVoiceCall", { signal: data, to: call.callerId });
    });

    peer.on("stream", (currentStream) => {
      friendAudio.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const voiceCallUser = (callReceiverId) => {
    // callReceiverId is the _id of the friend you are calling

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("voiceCallUser", {
        callReceiver: callReceiverId,
        signalData: data,
        callerId: currentUser?._id,
        callerName: currentUser?.username,
      });
    });

    peer.on("stream", (currentStream) => {
      friendAudio.current.srcObject = currentStream;
    });

    socket.on("voiceCallAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveVoiceCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    // window.location.reload();
  };

  const toggleMic = () => {
    setMute(!mute);
  }

  return (
  <div className="voiceCall_wrapper">
  <div className="voiceCall_container">
    <div className="voiceCall_top_container">
      <img
      src={`https://avatars.dicebear.com/api/${currentUser?.avatar}/${currentUser?.username}.svg`}
      alt="avatar" className="friend_avatar" />
      <h3 className="friend_name">Muftau2</h3>
      <p className="calling_text">Calling</p>
    </div>
    <div className="voiceCall_bottom_container">
      <div className="bottom_wrapper">
        <div className="micIcon_container" onClick={toggleMic} >
        { mute ? <Mic className="voiceCall_icons" /> : <MicOff className="voiceCall_icons" /> }
        </div>
        <div className="hangup_wrapper calling">
          <Call className="voiceCall_icons hangUp" />
        </div>
        <div className="hangup_wrapper" onClick={onClose} >
          <Call className="voiceCall_icons hangUp" />
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default VoiceCall;