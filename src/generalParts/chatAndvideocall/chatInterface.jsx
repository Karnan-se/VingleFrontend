"use client";

import { useEffect, useState } from "react";
import { Phone, Video, Info, Send, Mic } from "lucide-react";
import ChatSideBar from "./SideBar";
import { useRef } from "react";
import ChatHeader from "./chatHeader";
import { sendMessage } from "../../features/api/conversation";
import { fetchMessage } from "../../features/api/conversation";


export default function ChatInterface({participants , sender}) {
  const [messages, setMessages] = useState([]);
  const [participant , setParticipant] =useState()
  console.log(participants , "tutorId")
  console.log(sender , "sender")


       useEffect(()=>{
        

      async  function findConversation(senderId, participantId){
        if(!senderId || !participantId){
          return null
        }
        
        try {
          const messages  = await fetchMessage(senderId , participantId)
          console.log(messages.messages , "Messages ")
          setMessages([...messages.messages])
          
        } catch (error) {
          console.log(error)
          
        }

       }
       findConversation(sender?._id , participant?._id)
     },[participant, sender])


  const selectChat =(participant)=>{
    setParticipant(participant)
  }


 
  

  const scrollRef = useRef();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [newMessage]);

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      let Message ={
        message:newMessage,
        senderId:sender._id,
        receiverId:participants[0]._id,
      }
      const message = await sendMessage(Message)
      console.log(message, "values reached here ")

      setMessages([...messages, Message]);
      setNewMessage("");
    }
  };


  return (
    <div className="min-h-screen bg-white">
     

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-8">You have 0 unread messages.</p>

        <div className="grid grid-cols-[300px,1fr] gap-8">
          
          <ChatSideBar participants={participants} selectChat={(participant)=>selectChat(participant)} />

          {participant && (  
          <div className="border rounded-lg">
           
            <ChatHeader participant={participant}></ChatHeader>

       
            <div
              className="p-4 space-y-4 h-[400px] overflow-y-auto scrollbar-hide"
              ref={scrollRef}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === sender._id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.senderId === sender._id
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <button type="submit" className="p-2 hover:text-gray-600">
                  <Send className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type A Message"
                  className="flex-1 p-2 bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={"han"}
                  className="p-2 hover:text-gray-600"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
           )}
        </div>

    
      </div>
    </div>
  );
}
