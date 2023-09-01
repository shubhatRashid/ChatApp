const express = require("express")
const cors = require("cors")
const app  = express()
const {chats} = require("./data/data")

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Server Up and Running on 5000");
})

app.get("/api/chats",(req,res) =>{
    res.send(chats);
})


app.listen(
    5000,
    console.log("started")
    )