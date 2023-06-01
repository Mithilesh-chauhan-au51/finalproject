import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
import profile from "/public/images/pro2.webp"

export default function Conversation({ conversation, currentUser,onlineUsers }) {
//console.log("ou",onlineUsers)

  const [isLoading, setIsLoading] = useState(true);
   const [user, setUser] = useState(null);
  

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
//console.log(friendId)
    const getUser = async () => {
      try {
        const res = await axios.get(`https://capstoneproject-server--harry-potter1.repl.co/registeruser/${friendId}`);
        setUser(res.data.data);
        setIsLoading(false); 
        //console.log(res.data.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
 
  
 if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (user.length === 0) {
    return (
      <div className="mt-3 py-3 text-center">
        <h1>You dont have any conversations</h1>
      </div>
    );
  }
 //console.log("user:",user[0]._id)
  return (
    <div className="conversation  bg-{white}">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
      <img
        className="conversationImg"
        src={ profile  }
        alt=""
      />
       {onlineUsers.includes(user[0]._id) && <div className="chatOnlineBadge"></div>}
    </div>
       <span className="conversationName">
        {user[0].firstname } {user[0].lastname}
       </span>
  </div>
</div>
  );
}