"use client";

import { useEffect, useState } from "react";
import { Send, Mic } from "lucide-react";
import ChatSideBar from "./SideBar";
import { useRef } from "react";
import ChatHeader from "./chatHeader";
import { sendMessage, fetchMessage } from "../../features/api/conversation";
import { useSocket } from "../../Components/context/socketContext";
import { useOutletContext } from "react-router-dom";
import { useNotification } from "../../Components/context/notificationContext";
import PopOver from "./PopOver";

export default function ChatInterface({ participants, sender }) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isActive, setIsOnline] = useState(false);
  const [lastMessage, setLastMessage] = useState();
  const [isOpen, setIsOpen] = useState();
const [image, setImage] = useState()

  const scrollRef = useRef();

  const { onlineUsers } = useOutletContext();
  const {
    showMessageNotification,
    showCallNotification,
    setIsVideoCallActive,
    isVideoCallActive,
  } = useNotification();

  useEffect(() => {
    console.log(sender, "sender sender ");
  }, [sender]);

  //handle save Messages and state uodation on new Message
  useEffect(() => {
    if (!socket) return;

    const handleSavedMessage = (message) => {
      const { Message, firstName } = message;
      setMessages((prevMessages) => [...prevMessages, Message]);
    };

    socket.on("savedMessage", handleSavedMessage);

    return () => {
      socket.off("savedMessage", handleSavedMessage);
    };
  }, [socket]);

  // useEffect(()=>{
  //   console.log(onlineUsers , "Online Users")
  // },[onlineUsers])

  // handleNotification
  useEffect(() => {
    if (!socket) return;

    // handleNotification
    const handleNotification = (newNotification) => {
      console.log("New notification received:", newNotification);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...newNotification,
      ]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [sender._id, messages]);

  // findConversation
  useEffect(() => {
    async function findConversation(senderId, participantId) {
      if (!senderId || !participantId) {
        return null;
      }
      try {
        const messages = await fetchMessage(senderId, participantId);
        setMessages(messages.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }
    if (participant && sender) {
      findConversation(sender._id, participant._id);
      console.log(participant._id, "this is particiupants need to be false");

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.sender !== participant._id)
      );
      if (notifications) {
        const notificationSender = notifications[0];
        const notificationReciever = notifications[0];
        socket.emit("isRead", { notificationSender, notificationReciever });
      } else {
        console.log("no Notification");
      }
    }
  }, [participant, sender]);

  // scrollRef
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  //select chat
  const selectChat = async (selectedParticipant) => {
    if (!socket) return;
    if (selectedParticipant._id !== participant?._id) {
      setParticipant(selectedParticipant);
      try {
        const fetchedMessages = await fetchMessage(
          sender?._id,
          selectedParticipant._id
        );
        setMessages(fetchedMessages.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notif) => notif.sender !== selectedParticipant._id
      )
    );

    const notificationTodeleted = [
      ...new Set(
        notifications
          .filter((notif) => notif.sender == selectedParticipant._id)
          .map((notif) => notif.sender)
      ),
    ];

    socket.emit("isRead", notificationTodeleted[0], sender?._id);
  };

  //read Notification.

  useEffect(() => {
    if (!socket) return;
    if (participant) {
      const notificationTodeleted = [
        ...new Set(
          notifications
            .filter((notif) => notif.sender == participant?._id)
            .map((notif) => notif.sender)
        ),
      ];

      socket.emit("isRead", notificationTodeleted[0], sender?._id);
    }
  }, [participant, messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const Message = {
        message: newMessage,
        senderId: sender._id,
        receiverId: participant._id,
        timestamp: new Date().toISOString(),
      };
      console.log(sender.firstName, "firsttName");
      const firstName = sender.firstName;
      socket.emit("sendMessage", { Message, firstName });
      setMessages((prev) => [...prev, Message]);
      setNewMessage("");
    }

  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (!participant?._id) {
      return;
    }

    setIsOnline(
      Object.keys(onlineUsers).includes(participant._id) ? true : false
    );
  }, [participant?._id, onlineUsers]);

  
  useEffect(() => {
    const lastMessage = messages
      .filter(
        (msg) =>
          (msg.receiverId == participant._id && msg.senderId == sender._id) ||
          (msg.receiverId == sender._id && msg.senderId == participant._id)
      )
      .reverse()
      .slice(0, 1);
    setLastMessage(lastMessage[0]);

    console.log(lastMessage, "lastMessage LastMEssage LAstMEssage ");
  }, [messages, participant?._id]);

  

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-8">
          You have {notifications.length} unread messages.
        </p>

        <div className="grid grid-cols-[300px,1fr] gap-8">
          <ChatSideBar
            participants={participants}
            selectChat={selectChat}
            notifications={notifications}
            lastMessage={lastMessage}
          />

          {participant && (
            <div className="border rounded-lg">
              <ChatHeader
                participant={participant}
                isActive={isActive}
                onlineUsers={onlineUsers}
                sender={sender}
              ></ChatHeader>

              <div
                className="p-4 space-y-4 h-[400px] overflow-y-auto scrollbar-hide"
                ref={scrollRef}
              >
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.senderId === sender?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.senderId === sender._id
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <p>{message.message}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {formatTimestamp(
                          message.createdAt || message.timestamp
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center space-x-2"
                >
                  <div className="flex flex-col ">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-300 text-white rounded-md shadow-md hover:bg-yellow-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          setImage(e.target.files)
                        }
                      />
                      📷 Gallery
                    </label>
                  </div>
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
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
