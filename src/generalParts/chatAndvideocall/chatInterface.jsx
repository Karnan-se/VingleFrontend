import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import ChatSideBar from "./SideBar";
import { useRef } from "react";
import ChatHeader from "./chatHeader";
import { fetchMessage } from "../../features/api/conversation";
import { useSocket } from "../../Components/context/socketContext";
import { useOutletContext } from "react-router-dom";
import { uploadtoCloudinary } from "../../features/api/uploadCloudinary";

export default function ChatInterface({ participants, sender }) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isActive, setIsOnline] = useState(false);
  const [lastMessage, setLastMessage] = useState();
  const [isOpen, setIsOpen] = useState();
  const [secureUrl, setSecureUrl] = useState();
  const [image, setImage] = useState();
  const [videoError, setVideoError] = useState();

  const scrollRef = useRef();

  const { onlineUsers } = useOutletContext();

  useEffect(() => {
    if (!socket) return;

    const handleSavedMessage = (message) => {
      const { Message, firstName } = message;
      if (Message.senderId === participant?._id || Message.receiverId === participant?._id) {
        setMessages((prevMessages) => [...prevMessages, Message]);
      }
    };

    socket.on("savedMessage", handleSavedMessage);

    return () => {
      socket.off("savedMessage", handleSavedMessage);
    };
  }, [socket, participant]);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (newNotification) => {
      console.log("New notification received:", newNotification);
      setNotifications((prevNotifications) => [...prevNotifications, ...newNotification]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [sender._id, messages]);

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
      console.log(participant._id, "this is participants need to be false");

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectChat = async (selectedParticipant) => {
    if (!socket) return;
    if (selectedParticipant._id !== participant?._id) {
      setParticipant(selectedParticipant);
      try {
        const fetchedMessages = await fetchMessage(sender?._id, selectedParticipant._id);
        setMessages(fetchedMessages.messages || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      }
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.sender !== selectedParticipant._id)
    );

    const notificationTodeleted = [
      ...new Set(notifications.filter((notif) => notif.sender == selectedParticipant._id).map((notif) => notif.sender)),
    ];

    socket.emit("isRead", notificationTodeleted[0], sender?._id);
  };

  useEffect(() => {
    if (!socket) return;
    if (participant) {
      const notificationTodeleted = [
        ...new Set(
          notifications
            .filter((notif) => notif.sender === participant?._id && notif.receiver === sender._id)
            .map((notif) => notif.sender)
        ),
      ];
      console.log(notificationTodeleted, "notification to be deleted");

      if (notificationTodeleted.length > 0) {
        socket.emit("isRead", notificationTodeleted[0], sender?._id);
      }
    }
  }, [participant, messages, notifications]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim().length == 0) {
      console.log("no message");
      return;
    }
    if (newMessage.trim()) {
      const Message = {
        message: newMessage,
        senderId: sender._id,
        type: "text",
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

    setIsOnline(Object.keys(onlineUsers).includes(participant._id) ? true : false);
  }, [participant?._id, onlineUsers]);

  useEffect(() => {
    if (!participant) {
      return;
    }
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

  const handleImage = async (file) => {
    setVideoError(false);
    try {
      if (file.type.startsWith("video/")) {
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
          setVideoError(true);
          console.log("video size is too large");
          return;
        }
        setVideoError(false);
        handleVideoUpload();
        console.log("This is a video");
        return;
      }
      const secureurl = await uploadtoCloudinary(file);
      const type = file.type === "application/pdf" ? "pdf" : file.type.startsWith("image/") ? "image" : "unknown";

      setSecureUrl(secureurl);
      sendImage(secureurl, type);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoUpload = () => {
    return;
  };
  const sendImage = async (secureUrl, type) => {
    try {
      console.log(secureUrl);

      const Message = {
        message: secureUrl,
        senderId: sender._id,
        type: type,
        receiverId: participant._id,
        timestamp: new Date().toISOString(),
      };

      const firstName = sender.firstName;
      socket.emit("sendMessage", { Message, firstName });
      setMessages((prev) => [...prev, Message]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-8">
          You have {notifications.filter((notif) => notif.receiver === sender._id && !notif.isRead).length} unread
          messages.
        </p>

        <div className="grid grid-cols-[300px,1fr] gap-8">
          <ChatSideBar
            participants={participants}
            selectChat={selectChat}
            notifications={notifications.filter((notif) => notif.receiver === sender._id)}
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

              <div className="p-4 space-y-4 h-[400px] overflow-y-auto scrollbar-hide" ref={scrollRef}>
                {messages.map((message) => (
                  <div key={message._id}>
                    <div className={`flex ${message.senderId === sender?._id ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[43%] p-3 rounded-lg ${
                          message.senderId === sender._id ? "bg-gray-600 text-white" : "bg-gray-200"
                        }`}
                      >
                        {message.type === "text" && <p>{message.message}</p>}

                        {message.type === "image" && (
                          <img
                            src={message.message || "/placeholder.svg"}
                            alt="Sent image"
                            className="max-w-full rounded object-cover h-48 hover:cursor-pointer hover:size-48"
                          />
                        )}

                        {message.type === "pdf" && (
                          <div className="relative group w-full h-48">
                            <iframe
                              src={`${message.message}#toolbar=0&scrollbar=0`}
                              className="w-full h-full rounded object-cover scrollbar-hide "
                              title="PDF Preview"
                            >
                              View PDF
                            </iframe>

                            <a
                              href={message.message}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded"
                            >
                              📥 Download PDF
                            </a>
                          </div>
                        )}

                        <p className="text-xs text-right mt-1 opacity-70">
                          {formatTimestamp(message.createdAt || message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <div className="flex flex-col ">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-300 text-white rounded-md shadow-md hover:bg-yellow-500 transition">
                      <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleImage(e.target.files[0])}
                      />
                      📷 Gallery
                    </label>
                    {videoError && (
                      <>
                        {" "}
                        <p className="text-red-500 font-thin font-sans">Video size is too big</p>
                      </>
                    )}
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