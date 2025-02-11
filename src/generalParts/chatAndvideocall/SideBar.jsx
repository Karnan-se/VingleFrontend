import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function ChatSideBar({ participants, selectChat, notifications, lastMessage }) {
  const [notificationCounts, setNotificationCounts] = useState({});

  // Calculate notification counts on notifications change
  useEffect(() => {
    const counts = {};
    notifications.forEach((notif) => {
      if (!notif.isRead) {
        counts[notif.sender] = (counts[notif.sender] || 0) + 1;
      }
    });
    console.log(counts)
    setNotificationCounts(counts);
  }, [notifications]);

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 rounded-full bg-white border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {participants.map((participant, index) => {
          const count = notificationCounts[participant._id] || 0;
          return (
            <div key={participant._id}>
              <div
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-4 transition-colors"
                onClick={() => selectChat(participant)}
              >
                <img
                  src={participant.photo || "/placeholder.svg?height=48&width=48"}
                  alt={participant.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{participant.firstName}</p>
                  <p className="text-sm text-gray-500 truncate">
                  {(lastMessage?.senderId === participant._id || lastMessage?.receiverId === participant._id) ? lastMessage.message : ""}

                  </p>
                </div>
                {count > 0 && (
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {count}
                  </div>
                )}
              </div>
              {index < participants.length - 1 && <div className="mx-4 border-t border-gray-200"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
