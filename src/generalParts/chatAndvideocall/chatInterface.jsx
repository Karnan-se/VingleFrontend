"use client";

import { useEffect, useState } from "react";
import { Phone, Video, Info, Send, Mic } from "lucide-react";
import ChatSideBar from "./SideBar";
import { useRef } from "react";
import ChatHeader from "./chatHeader";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, Hoe Are You Doing ?", sender: "them" },
    { id: 2, text: "Fine", sender: "me" },
    { id: 3, text: "Okay", sender: "them" },
    { id: 4, text: "Hello, Hoe Are You Doing ?", sender: "me" },
  ]);

  const scrollRef = useRef();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [newMessage]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: "me",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-8">You have 0 unread messages.</p>

        <div className="grid grid-cols-[300px,1fr] gap-8">
          {/* Sidebar */}
          <ChatSideBar />

          {/* Chat Area */}
          <div className="border rounded-lg">
            {/* Chat Header */}
            <ChatHeader></ChatHeader>

            {/* Messages */}
            <div
              className="p-4 space-y-4 h-[400px] overflow-y-auto scrollbar-hide"
              ref={scrollRef}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "me"
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
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
        </div>

        {/* Profile Section */}
        <div className="mt-8 flex items-start space-x-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ez5Owl2cTM6rhC5S36r2Qbof0Othu9.png"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">Iam the Course Creator</h2>
            <div className="text-gray-600">Robert James</div>
            <div className="text-gray-600">UI/UX Designer</div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-blue-600">56 Courses</div>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span>4.9</span>
                <span className="text-gray-400">(76,335)</span>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-gray-200 rounded-lg ml-auto">
            Visit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
