const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

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

io.on("connection", (socket) => {
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
})