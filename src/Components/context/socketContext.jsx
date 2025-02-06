import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { useCallback } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({ socket: null });

export const SocketProvider = ({ children }) => {
 const socketRef = useRef(null);
 const [socket, setSocket] = useState(null);
 const [isConnected, setIsConnected] = useState(false);

 const createSocket = (userId) => {
   if (socketRef.current) {
     socketRef.current.disconnect();
   }

   socketRef.current = io("http://localhost:3000", {
     withCredentials: true,
     transports: ["websocket"],
     query: { userId },
   });

   socketRef.current.on("connect", () => {
     setIsConnected(true);
     setSocket(socketRef.current);
   });

   socketRef.current.on("disconnect", () => {
     setIsConnected(false);
   });
 };

 useEffect(() => {
   return () => {
     if (socketRef.current) {
       socketRef.current.disconnect();
       console.log("disconnected");
     }
   };
 }, []);

 return (
   <SocketContext.Provider value={{ socket, createSocket, isConnected }}>
     {children}
   </SocketContext.Provider>
 );
};

export const useSocket = () => useContext(SocketContext);