import React from "react";

const MessageNotification = ({ message, sender }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white shadow-xl rounded-lg border border-gray-200 max-w-sm w-full">

      <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white text-lg font-semibold rounded-full">
        {sender.charAt(0).toUpperCase()}
      </div>

     
      <div className="flex-1">
        <p className="text-gray-900 font-semibold">{sender} texted you:</p>
        <p className="text-gray-700 italic truncate">"{message}"</p>
      </div>

  
      <button
        className="text-gray-500 hover:text-gray-700 transition"
        onClick={() => document.getElementById("custom-toast")?.remove()}
      >
        ✖
      </button>
    </div>
  );
};

export default MessageNotification;
