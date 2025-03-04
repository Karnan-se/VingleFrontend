import { createContext, useContext, useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CallNotification } from "./callNotification";
import { useSocket } from "./socketContext";
import { useNavigate } from "react-router-dom";
import VideoCall from "../../generalParts/chatAndvideocall/videocall";
import UserCallingNotification from "./userCallNotification";
import MessageNotification from "./MessageNotification";


const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { socket } = useSocket();
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [sender, setSender] = useState(null);
  const toastcallRef = useRef(null);
  const toastIdRef = useRef(null); 

  const showMessageNotification = (message, sender) => {
   
    document.getElementById("custom-toast")?.remove();
  

    const toastContainer = document.createElement("div");
    toastContainer.id = "custom-toast";
    toastContainer.className =
      "fixed top-5 left-1/2 transform -translate-x-1/2 z-50 flex justify-center";
  

    const root = document.createElement("div");
    toastContainer.appendChild(root);
    document.body.appendChild(toastContainer);
  
    import("react-dom").then((ReactDOM) => {
      ReactDOM.createRoot(root).render(
        <MessageNotification message={message} sender={sender} />
      );
    });
  

    setTimeout(() => {
      toastContainer.remove();
    }, 5000);
  };
  




  const showCallNotification = (caller, onAnswer, onDecline) => {
    toastcallRef.current = toast.info(
      <CallNotification caller={caller} onAnswer={onAnswer} onDecline={onDecline} />,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const showRinging = (participant) => {
    if (toastIdRef.current) return;
    toastIdRef.current = toast.info(
      <UserCallingNotification participant={participant} onCancel={()=>dismissRingingNotification(participant)} />,
      {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        autoClose: false,
      }
    );
  };

// Notification dismissal Logic
  const dismissRingingNotification = (participant) => {
    console.log("Call cancelled from the user side");
    console.log(participant ,   "sender and reciever when the call is canecelled")
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
      console.log("user canelled the call")
     if(socket){
      socket.emit("userCallCancelled", participant)
      console.log("is Emmitting ")
     }
    }
    if (toastcallRef.current) {
      toast.dismiss(toastcallRef.current);
      toastcallRef.current = null;
      console.log(participant.sender ,  "parteicpiknat ")
      if(socket){
        socket.emit("userCallCancelled", participant.sender )
        console.log("isEmmiting from the otherside")
      }
     
    }
  };

  //when user Call cancelled by socket 
  useEffect(()=>{
    if(!socket) return 
    socket.on("userCallCancelled" , (participant)=>{
      console.log(participant, "when user Call canelled")
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
      toast.dismiss(toastcallRef.current);
      toastcallRef.current = null;
    })
  },[socket])


//handlee svae message notIYFICATION
  useEffect(() => {
    if (!socket) return;

    const handleSavedMessage = (message) => {
      const {Message, firstName} = message
      showMessageNotification(Message.message, firstName);
    };

    socket.on("savedMessage", handleSavedMessage);

    return () => {
      socket.off("savedMessage", handleSavedMessage);
    };
  }, [socket]);



  //handle Answerr and toast dismissal
  const handleAnswer = (sender) => {
    // console.log(sender , "sender from  handle Answer");
    setParticipant(sender.sender);
    setSender(sender.receiverId);
    setIsVideoCallActive(true);
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current) }
      if (toastcallRef.current) {
        toast.dismiss(toastcallRef.current) }
    
        console.log(sender.sender , "sender, sender. sender")
    socket.emit("userCallCancelled", sender.sender)
    socket.emit("isCallAttended", sender);
  };


  //handle Incomming Call // showuserSide Notifications
  
  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = (sender) => {
      console.log(sender);
      setSender(sender);
      showCallNotification(sender.sender.firstName, () => handleAnswer(sender), ()=>dismissRingingNotification(sender));
    };

    socket.on("isRinging", handleIncomingCall);

    return () => {
      socket.off("isRinging", handleIncomingCall);
    };
  }, [socket]);

  return (
    <NotificationContext.Provider value={{ showMessageNotification, showCallNotification, setIsVideoCallActive, isVideoCallActive, showRinging, dismissRingingNotification }}>
      {children}
      <ToastContainer />
      {isVideoCallActive && sender && participant && (
        <VideoCall participant={participant} onClose={() => setIsVideoCallActive(false)} sender={participant} />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
