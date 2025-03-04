"use client"

import { useEffect, useState } from "react"
import { Phone, Video, Info } from "lucide-react"
import VideoCall from "./videocall"
import { useSocket } from "../../Components/context/socketContext"
import { useNotification } from "../../Components/context/notificationContext"



export default function ChatHeader({ participant, isActive  , onlineUsers , sender  }) {

  const [isRinging , setisRinging] = useState(false)
  const {socket} = useSocket()
  const [isVideoCallActive , setIsVideoCallActive ] = useState(false)
  const {showRinging , dismissRingingNotification} =useNotification()

  const handleVideoCall = () => {
    console.log("video call element loading ")
    console.log(isRinging ,"isRinging")
    console.log(setisRinging , "setRinging")
    
    setisRinging(true)
  }

  useEffect(()=>{
    if(!socket  || !isRinging || !sender){
      return 
    }
    socket.emit("isRinging", { receiverId: participant, sender });
    showRinging(participant )
    setisRinging(false)


    return () => {
      setisRinging(false); 
    };


  },[isRinging])


  useEffect(()=>{
    if(!socket && !isRinging)  return 
    socket.on("isCallAttended" , (sender)=>{
      setIsVideoCallActive(true)
      console.log(sender , "we gott the status of the call attended")

    })
    return ()=>{
      setIsVideoCallActive(false)
      socket.off("isCallAttended")
    }

  },[socket ])

  
  

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-black text-white">
        <div className="flex items-center space-x-3">
          <img src={participant.photo || "/placeholder.svg"} alt="Avatar" className="w-8 h-8 rounded-full" />
          <div>
            <div>
              <div>{participant?.firstName}</div>
              {isActive && (
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active Now
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full" onClick={handleVideoCall}>
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
      {isVideoCallActive &&  <VideoCall participant={participant} onClose={() => setIsVideoCallActive(false)} sender={sender} />}
    </>
  )
}

