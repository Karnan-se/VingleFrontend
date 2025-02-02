"use client"

import { useEffect, useState } from "react"
import { Send, Mic } from "lucide-react"
import ChatSideBar from "./SideBar"
import { useRef } from "react"
import ChatHeader from "./chatHeader"
import { sendMessage, fetchMessage } from "../../features/api/conversation"
import socket from "../../features/socket/socket.io"

export default function ChatInterface({ participants, sender }) {
  const [messages, setMessages] = useState([])
  const [participant, setParticipant] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [notifications, setNotifications] = useState([])
  const scrollRef = useRef()

  useEffect(() => {
    if (sender?._id) {
      socket.emit("joinRoom", sender._id)
    }
  }, [sender])

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    }

    const handleNotification = (newNotification) => {
      console.log("New notification received:", newNotification)
      setNotifications((prevNotifications) => [...prevNotifications, ...newNotification])
    }

    socket.on("message", handleNewMessage)
    socket.on("notification", handleNotification)

    return () => {
      socket.off("message", handleNewMessage)
      socket.off("notification", handleNotification)
    }
  }, [sender._id])



  useEffect(() => {
    async function findConversation(senderId, participantId) {
      if (!senderId || !participantId) { 
        return null
      }
      try {
        const messages = await fetchMessage(senderId, participantId)
        setMessages(messages.messages || [])
      } catch (error) {
        console.error("Error fetching messages:", error)
        setMessages([])
      }
    }
    if (participant && sender) {
      findConversation(sender._id, participant._id)
      console.log(participant._id ,  "this is particiupants need to be false")

      
      setNotifications((prevNotifications) => prevNotifications.filter((notif) => notif.sender !== participant._id))
      if(notifications){
        const notificationSender = notifications[0];
        const notificationReciever = notifications[0];
        socket.emit("isRead",{notificationSender , notificationReciever})

      }else{
        console.log("no Notification")
      }
     

    }
  }, [participant, sender])




  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const selectChat = async (selectedParticipant) => {
    if (selectedParticipant._id !== participant?._id) {
      setParticipant(selectedParticipant)
      try {
        const fetchedMessages = await fetchMessage(sender?._id, selectedParticipant._id)
        setMessages(fetchedMessages.messages || [])
      } catch (error) {
        console.error("Error fetching messages:", error)
        setMessages([])
      }
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.sender !== selectedParticipant._id),
    

    )
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const Message = {
        message: newMessage,
        senderId: sender._id,
        receiverId: participant._id,
        timestamp: new Date().toISOString(),
      }
      const message = await sendMessage(Message)
      setNewMessage("")
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-8">You have {notifications.length} unread messages.</p>

        <div className="grid grid-cols-[300px,1fr] gap-8">
          <ChatSideBar participants={participants} selectChat={selectChat} notifications={notifications} />

          {participant && (
            <div className="border rounded-lg">
              <ChatHeader participant={participant}></ChatHeader>

              <div className="p-4 space-y-4 h-[400px] overflow-y-auto scrollbar-hide" ref={scrollRef}>
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.senderId === sender._id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.senderId === sender._id ? "bg-gray-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      <p>{message.message}</p>
                      <p className="text-xs text-right mt-1 opacity-70">{formatTimestamp(message.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
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
                  <button type="button" onClick={() => {}} className="p-2 hover:text-gray-600">
                    <Mic className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

