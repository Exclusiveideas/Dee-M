let activeUsers = [];

const addUser = (userId, socketId) => {
    !(activeUsers.some(user => user?.userId === userId)) && activeUsers.push({userId, socketId})
}

const removeUser = (socketId) => {
    activeUsers = activeUsers.filter(user => user.socketId !== socketId)
}

const extractUser = (receiverId) => {
    return activeUsers.find(user => user.userId === receiverId)
}

const socketActions = (socket, io) => {
    // when connected
    console.log("a user connected");

    socket.on("sendUserId", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", activeUsers);
    })

    // get and send message
    socket.on("sendMessage", ({ senderId, receiverId, text}) => {
        const extractedUser = extractUser(receiverId)
        io.to(extractedUser?.socketId).emit("getMessage", {
            senderId,
            text
        })
    })

    // when disconnected
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", activeUsers);
    })

    // video call a user
    socket.on("videoCallUser", ({ callReceiver, signalData, callerId, callerName }) => {
        const extractedUser = extractUser(callReceiver)
		io.to(extractedUser?.socketId).emit("videoCallUser", { signal: signalData, callerId, callerName });
	});

    // video call answered
    socket.on("answerVideoCall", ({ signal, to: callerId }) => {
        const extractedUser = extractUser(callerId)
		io.to(extractedUser?.socketId).emit("videoCallAccepted", signal)
	});

    // voice call a user
    socket.on("voiceCallUser", ({ callReceiver, signalData, callerId, callerName }) => {
        const extractedUser = extractUser(callReceiver)
		io.to(extractedUser?.socketId).emit("voiceCallUser", { signal: signalData, callerId, callerName });
	});

    // voice call answered
    socket.on("answerVoiceCall", ({ signal, to: callerId }) => {
        const extractedUser = extractUser(callerId)
		io.to(extractedUser?.socketId).emit("voiceCallAccepted", signal)
	});
}

module.exports = socketActions