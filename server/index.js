const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.js");
const conversationsRoute = require("./routes/conversations.js");
const messagesRoute = require("./routes/messages.js");
const usersRoute = require("./routes/users.js");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("db connected"))
    .catch((err) => {
        console.log("error connecting db >>", err)
    })

app.use(cors({
    origin: '*'
})); 
app.use(function(req, res, next) {
 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
  });

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Dee-M running")
})
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`App server is running on Port ${PORT}`) 
});