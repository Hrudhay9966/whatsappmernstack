import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher";
import Cors from "cors";

const app = express()
const port= process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1288513",
    key: "6266584f1696156597ed",
    secret: "5bdeb194d66bfa02ef8a",
    cluster: "ap2",
    useTLS: true,
  });

app.use(express.json());
app.use(Cors());




const connection_url = "mongodb+srv://dbuser:9573217591@cluster0.9l1r4.mongodb.net/whatsdb?retryWrites=true&w=majority"
mongoose.connect(connection_url);

const db = mongoose.connection;
db.once("open", ()=>{
    console.log("DB connected");

    const messageCollection = db.collection("messagecontents");
    const changeStream = messageCollection.watch();

    changeStream.on("change", (change) =>{
        console.log(change);
        if (change.operationType == "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted",
            {
                name: messageDetails.user,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
             });
        } else {
            console.log("Error triggering Pusher")
        }
    });

});

app.get("/",(req,res)=> res.status(200).send(Messages));

app.get("/messages/sync",(req,res) => {
    
    Messages.find((err,data) =>{
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    });
});

app.post("/messages/new",(req,res) => {
    const dbMessage= req.body;
    Messages.create(dbMessage, (err,data) =>{
        if (err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})


app.listen(port, ()=>console.log(`Listening on localhost:${port}`));