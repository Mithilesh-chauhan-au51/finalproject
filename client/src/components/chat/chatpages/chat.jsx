import "./chat.css";

import Conversation from "../chatcomponents/Conversation.jsx";
 import Message from "../chatcomponents/Message";
 
 import {  useEffect, useRef, useState } from "react";
import{useNavigate} from "react-router-dom"

 import axios from "axios";
 import { io } from "socket.io-client";

export default function Chat() {
   const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
    const [activeConversation, setActiveConversation] = useState(false);
   const socket = useRef();
   const current_user=JSON.parse(localStorage.getItem("user"))
   const scrollRef = useRef(); 
   const navigate = useNavigate();
  

   
  
   useEffect(() => {
    const token = localStorage.getItem("token");
     
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


    useEffect(() => {
  socket.current = io("https://socket--harry-potter1.repl.co");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    
    }, []);

  useEffect(() => {
    
    socket.current.emit("addUser", current_user._id);
    socket.current.on("getUsers", (users) => {
//console.log("suse",users)
      const otherUserIDs =users .filter(user => user.userId !== current_user._id).map(user => user.userId)
       setOnlineUsers(otherUserIDs)
     // console.log("oui",otherUserIDs)
     
    });
  },[]);
 


  // console.log(onlineUsers)

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);






  

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`https://capstoneproject-server--harry-potter1.repl.co/chat/${current_user._id}`);
        setConversations(res.data);
       // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [current_user._id]);

  

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`https://capstoneproject-server--harry-potter1.repl.co/message/${currentChat._id}`);
        setMessages(res.data);
        //console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: current_user._id,
      text: newMessage,
      conversationId: currentChat._id,
    }
      const receiverId = currentChat.members.find(
      (member) => member !== current_user._id
    );

socket.current.emit("sendMessage", {
      senderId: current_user._id,
      receiverId,
      text: newMessage,
    });

    
     try {
       const res = await axios.post("https://capstoneproject-server--harry-potter1.repl.co/message", message);
       setMessages([...messages, res.data]);
       setNewMessage("");
     } catch (err) {
       console.log(err);
     }
  }

  

    

  
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


 
   
//console.log(conversations)
  return (
    <>


<div className="messenger">
         <div className="chatMenu">
           <div className="chatMenuWrapper ">
             <input placeholder="Search your seller or buyers" className="chatMenuInput" />
             
   {conversations.map((c) => (
        
        <div  onClick={() => {setCurrentChat(c)
setActiveConversation(c)  }}     style={{
                backgroundColor: activeConversation===c  ? 'lightgreen' : 'initial'
              }}>
                <Conversation conversation={c} currentUser={current_user} onlineUsers={ onlineUsers } />
        </div>
          ))}                 
  </div>
   </div>
   

   
      <div className="chatBox">
  <div className="chatBoxWrapper">
    {currentChat ? (
      <>
        <div className="chatBoxTop">
          {messages.map((m) => (
          <div ref={scrollRef}>
            <Message message={m} own={m.sender === current_user._id}/>
          </div>
        ))}
        </div>
        <div className="chatBoxBottom">
          <textarea className="chatMessageInput"
            placeholder="write something..." 
            onChange={(e) => setNewMessage(e.target.value)}
             value={newMessage}  ></textarea>
          <button className="chatSubmitButton"  onClick={handleSubmit}>Send</button>
        </div>
      </>
    ) : (
      <span className="noConversationText">Open a conversation to start a chat.</span>
    )}
  </div>
</div>


   

   
 </div>
           

   
      
      
    </>
  );
}

