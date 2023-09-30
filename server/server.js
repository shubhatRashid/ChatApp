const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")

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

// ERROR HANDLING
app.use(errorHandler)
app.all('*',notFound)

app.listen(
    process.env.PORT,
    console.log("started")
    )