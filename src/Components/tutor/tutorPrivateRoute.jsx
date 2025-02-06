import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";

export default function TutorProtectedRoute() {
  const { socket, createSocket, isConnected } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState({});


  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
 
  useEffect(() => {
    if (!tutorInfo || !createSocket || !tutorInfo._id) {
      return;
    }
    console.log('Creating socket for tutor:', tutorInfo._id);
    createSocket(tutorInfo._id);

  }, []);
 
  useEffect(() => {
    console.log("TUTOR");
    
    if (!socket || !isConnected) return;
 
    const handleOnlineUsers = (users) => {
      console.log("emitted success online users",users);
      
      // console.log('Received online users (Tutor):', users);
  
        setOnlineUsers(users)
      
     
    };
 
    socket.on('onlineUsers', handleOnlineUsers);
    return () => socket.off('onlineUsers', handleOnlineUsers);
  }, [socket, isConnected]);

 
 
  return tutorInfo ? <Outlet context={onlineUsers} /> : <Navigate to="/tutor/login" replace />;
 }