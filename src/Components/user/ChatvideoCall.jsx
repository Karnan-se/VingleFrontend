import Navbar from "../../generalParts/landipage/Navbar"
import ChatInterface from "../../generalParts/chatAndvideocall/chatInterface"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux";

export default function ChatAndVIdeoCall(){

    const location = useLocation();

    const {tutorId} = location.state || {}
    console.log(tutorId)
     const userInfo = useSelector((state)=> state.user.userInfo)
     const participants =[tutorId]
    
    return(
        <>
        <Navbar></Navbar>
        {tutorId && (   
        <ChatInterface  participants={participants}  sender={userInfo}></ChatInterface>
    )}
    
        </>
    )
}