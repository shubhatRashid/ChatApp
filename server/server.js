const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")

require('dotenv').config()
const {errorHandler,notFound} = require("./middleware/errorMiddleware")

// CONNECT EXPRESS APP
const app  = express()

// GETTING RID OF CORS ERRORS
const corsOptions ={
    origin:'*', 
    credentials:true,         
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)) 

// ACCEPT JSON DATA
app.use(express.json())


// CONNECT TO MONGO-DB ATLAS
const {chats} = require("./data/data")
const connectDb = require("./configs/db")
connectDb()

// USER ROUTES
app.use('/api/users',userRoutes)


// CHATS ROUTE
app.use("/api/chats",chatRoutes)

// MESSAGES ROUTE
app.use("/api/messages",messageRoutes)

// ERROR HANDLING
app.use(errorHandler)
app.all('*',notFound)

const server = app.listen(
        process.env.PORT,
        console.log("started")
        )

// SETTING UP SOCKET.IO //
const io = require("socket.io")(server,{
    cors:{
        origin:process.env.CLIENT_URL
    }
})

io.on("connection",(socket) => {
    console.log("connected to socket.io") // to check connection status

    // CREATING A ROOM FOR A USER //
    socket.on('setup',(userData) =>{
        socket.join(userData._id)
        socket.emit('connected')
    })

    //PUT NEW MESSAGE iN RESPECTIVE SOCKET//
    socket.on("new message",(newMessageReceived) => {
        var chat = newMessageReceived.chat

        if (!chat.users) return console.log("chat.users not defined")

        chat.users.forEach(user => {
            if (user._id === newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received",newMessageReceived)
        });
    })
})
