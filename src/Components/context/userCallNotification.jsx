import { useState, useEffect } from "react";

 const UserCallingNotification = ({ participant, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(30); // Auto-hide after 30 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Auto-cancel after 30 seconds
    const autoCancel = setTimeout(() => {
      onCancel();
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoCancel);
    };
  }, [onCancel]);

  return (
    <div className="fixed top-5 right-5 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
      <span className="animate-pulse">📞 Calling {participant.firstName}... ({timeLeft}s)</span>
      <button
        className="bg-red-500 px-3 py-1 rounded"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default UserCallingNotification;
