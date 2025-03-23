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

   socketRef.current = io("https://api.vingle.shop", {
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
     setSocket(null); // this part also should be deletd if anything goes wrong
   });
 };

 useEffect(() => {
   return () => {
     if (socketRef.current) {
       socketRef.current.disconnect();
       console.log("disconnected");
       setSocket(null)  //this part is developement purpoise only ant errir delet thjs part 
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