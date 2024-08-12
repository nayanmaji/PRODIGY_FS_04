const express = require('express');
const connectDB = require('./mongodb');
const cors = require('cors');

const UserRouter = require('./Routers/UserRouter');
const ChatRouter = require('./Routers/ChatRouter');
const MessageRouter = require('./Routers/messageRouter')
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/user',UserRouter);
app.use('/api/chat',ChatRouter);
app.use("/api/message", MessageRouter);

app.listen(process.env.PORT,console.log("server"));