const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")

// CONNECT EXPRESS APP
const app  = express()

app.use(express.json())
require('dotenv').config()

// CONNECT TO MONGO-DB ATLAS
const {chats} = require("./data/data")
const connectDb = require("./configs/db")
connectDb()


app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/",(req,res) =>{
    res.send("Server Up and Running on 5000");
})

// USER ROUTES
app.use('/api/user',userRoutes)

// DATA ROUTE
app.get("/api/chats",(req,res) =>{
    res.send(chats);
})


app.listen(
    process.env.PORT,
    console.log("started")
    )