import axios from "axios";
import { useEffect, useState,useRef } from "react";
import socket from "../../lib/Socket.js";

function ChatContainer({selectedContact,user}) {
  const [messages,setMessages]= useState([
    // {
    // senderID:"",
    // reciverID:"",
    // messageContent:""
    // }
  ]);

  const [sendMessage,setSendMessage] = useState("")
  const messagesEndRef = useRef(null);

  async function getAllMessages() {
    try {
      
      const response = await axios.post("http://localhost:8000/api/v1/user/loadChat",{
        senderID:user._id,
        receiverID:selectedContact._id
      },{
        withCredentials: true
        });
      setMessages(response.data.messages);
    } catch (error) {
      console.log("Failed to fetch messages",error);
    }
  }

  async function onSendMessage(){
    try {

      if(!sendMessage.trim()) return;

      
      const data = {
        senderID: user._id,
        receiverID: selectedContact._id,
        messageContent : sendMessage
      }

      setMessages((prev) => [...prev, data]);

      sendSocketMessage(data)

      const response = await axios.post("http://localhost:8000/api/v1/user/save",data,{
        withCredentials: true
        });

      setSendMessage("")
    } catch (error) {
      console.log("Failed to fetch messages",error);
    }
  }

  const sendSocketMessage = (message) => {
    socket.emit("send_message", message);
  };

  useEffect(() => {

    socket.on("receive_message", (data) => {

      // Prevent duplicate for sender
      if(data.senderID === user._id) return;

      // Only current chat
      const isCurrentChat =
        data.senderID === selectedContact._id ||
        data.receiverID === selectedContact._id;

      if(isCurrentChat){
        setMessages((prev) => [...prev, data]);
      }

  });

  return () => {
    socket.off("receive_message");
  };

}, [selectedContact, user]);

  useEffect(()=>{
    if(selectedContact?._id){
      getAllMessages();
    }
  },[selectedContact])

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto"
    });
  },[messages])

  return (
  <div
    className="
      relative
      overflow-hidden
      w-full
      h-full
      min-h-0
      flex
      flex-col
      bg-zinc-900
      border
      border-zinc-700
      rounded-2xl
      shadow-lg
    "
  >
    {/* Background Glow */}
    <div
      className="
        absolute
        top-0
        right-0
        w-72
        h-72
        bg-blue-500/5
        blur-3xl
        rounded-full
      "
    ></div>

    {/* Chat Header */}
    <div
      className="
        relative
        z-10
        border-b
        border-zinc-800
        px-5
        py-4
        flex
        items-center
        justify-between
        backdrop-blur-sm
      "
    >
      <div className="flex items-center gap-3 min-w-0">

        {/* Avatar */}
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-blue-500/20
            border
            border-blue-500/10
            flex
            items-center
            justify-center
            text-lg
            font-semibold
            shrink-0
          "
        >
          {selectedContact.name?.charAt(0).toUpperCase()}
        </div>

        {/* User Info */}
        <div className="min-w-0">

          <h2
            className="
              text-lg
              md:text-xl
              font-semibold
              text-white
              truncate
            "
          >
            {selectedContact.name}
          </h2>

          <p
            className="
              text-sm
              text-zinc-400
              truncate
            "
          >
            @{selectedContact.username}
          </p>

        </div>

      </div>
    </div>

    {/* Messages Area */}
    <div
      className="
        relative
        z-10
        flex-1
        min-h-0
        px-4
        py-5
        overflow-y-auto
        flex
        flex-col
        gap-4
      "
    >
      {messages.map((message,index)=>{

        const isSender = message.senderID == user._id;

        return(
          <div
            key={message._id || index}
            className={`
              ${ 
                isSender ? 
                "self-end bg-blue-600 text-white rounded-br-md" : 
                "self-start bg-zinc-800 text-zinc-100 rounded-bl-md"
              }
              px-4
              py-2.5
              rounded-2xl
              max-w-[85%]
              sm:max-w-[75%]
              lg:max-w-[60%]
              wrap-break-word
              whitespace-pre-wrap
              shadow-md
            `}
          >
            {message.messageContent}
          </div>
        )
        
      })}
      {/* invisible bottom target */}
      <div ref={messagesEndRef} />
    </div>

    {/* Message Input */}
    <div
      className="
        relative
        z-10
        border-t
        border-zinc-800
        p-4
        flex
        items-center
        gap-3
        bg-zinc-900/80
        backdrop-blur-sm
      "
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="
          flex-1
          min-w-0
          bg-zinc-800
          border
          border-zinc-700
          focus:border-blue-500
          px-4
          py-3
          rounded-xl
          outline-none
          transition
          text-white
          placeholder:text-zinc-500
        "
        value={sendMessage}
        onChange={(e)=>{setSendMessage(e.target.value)}}
        onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            onSendMessage()
          }
          }}
      />

      <button
        type="button"
        className="
          shrink-0
          bg-blue-600
          hover:bg-blue-700
          px-5
          py-3
          rounded-xl
          font-medium
          transition-all
          duration-200
          shadow-md
        "
        onClick={onSendMessage}
      >
        Send
      </button>
    </div>
  </div>
)
}

export default ChatContainer