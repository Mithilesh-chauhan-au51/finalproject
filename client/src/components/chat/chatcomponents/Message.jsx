import "./message.css";
import profile from "/public/images/pro2.webp"
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
   
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={profile}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}