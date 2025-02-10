import { children, createContext , useContext } from "react";
import {ToastContainer , toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { CallNotification } from "./callNotification";
import { useSocket } from "./socketContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCall from "../../generalParts/chatAndvideocall/videocall";
import { useState } from "react";
import { useRef } from "react";







const NotificationContext = createContext()



export const NotificationProvider = ({children}) => {
      const navigate = useNavigate()
      const {socket} = useSocket()
      const [isVideoCallActive, setIsVideoCallActive] = useState(false)
      const [participant , setParticipant] = useState()
      const [sender , setSender] = useState()
      const toastcallRef =useRef(null)
      

    const showMessageNotification = (message , sender)=>{
        toast.info(`${sender} :${message}`, { 
            position: "top-center",
            autoClose:5000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true
        })
    }

    const showCallNOtification =(caller , onAnswer, onDecline) =>{
      toastcallRef.current =  toast.info(<CallNotification caller={caller} onAnswer={onAnswer} onDecline={onDecline}/> ,{
            position: "top-right",
            autoClose: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            closeButton: false,
            
        })
    }
//sendingMessage
 useEffect(() => {
    if (!socket) return;
    const handleSavedMessage = (message) => {
      console.log("New saved message received:", message);
      showMessageNotification(message.message , message.sender)
         
    };

    socket.on("savedMessage", handleSavedMessage);
  
    return () => {
      socket.off("savedMessage", handleSavedMessage);
    };
  }, [socket]);

  const handleAnswer = (sender) => {
    console.log(sender);
    setParticipant(sender.sender)
    setSender(sender.receiverId)
    setIsVideoCallActive(true)

    socket.emit("isCallAttended", (sender))

    if(toastcallRef.current){
      toast.dismiss(toastcallRef.current)
      toastcallRef.current = null;
    }
  };

 

useEffect(()=>{
    if(!socket) return 
    socket.on("isRinging", (sender)=>{
        console.log(sender)
        showCallNOtification(sender.sender.firstName, ()=>handleAnswer(sender), "" )
      })

      return () => {
        socket.off("isRinging");
      };

},[socket])


    return (
        <NotificationContext.Provider value={{showMessageNotification , showCallNOtification , setIsVideoCallActive , isVideoCallActive }}>
            {children}
            <ToastContainer/>
            {isVideoCallActive && sender && participant && (
              <VideoCall participant={participant} onClose={()=> setIsVideoCallActive(false)} sender={participant}  />
            )}
        </NotificationContext.Provider>
    )
    
}

export const useNotification =() =>{
    return  useContext(NotificationContext)
}



