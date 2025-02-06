import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSocket } from "../context/socketContext";
import { useState } from "react";

export default function UserPrivateRoute() {
  const { socket, createSocket, isConnected } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState({});
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo?._id || !createSocket) {
   
      return;
    }
    console.log('Creating socket for user:', userInfo._id);
    createSocket(userInfo._id);
  }, [userInfo?._id]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleOnlineUsers = (users) => {
      console.log('Received online users:', users);
      setOnlineUsers(users);
    };

    socket.on('onlineUsers', handleOnlineUsers);
    return () => socket.off('onlineUsers', handleOnlineUsers);
  }, [socket, isConnected]);

  return userInfo ? <Outlet context={{onlineUsers}} /> : <Navigate to="/login" replace />;
}