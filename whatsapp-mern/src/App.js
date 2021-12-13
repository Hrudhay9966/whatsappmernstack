
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import { useEffect, useState } from 'react';
import axios from "./axios";
function App() {
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    axios.get("/messages/sync")
    .then(response =>{
      
      setMessages(response.data);
    })
  }, [])


  useEffect(() =>{
    var pusher = new Pusher('6266584f1696156597ed', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe("messages");
    channel.bind('inserted', (newMessages) => {
      alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });
   return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
      <Sidebar/>
      <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
