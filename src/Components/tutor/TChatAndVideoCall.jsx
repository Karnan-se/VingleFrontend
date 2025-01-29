import Navbar from "../../generalParts/landipage/Navbar"
import ChatInterface from "../../generalParts/chatAndvideocall/chatInterface"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux";
import { userApi } from "../../axios/axiosInstance";
import { useEffect, useState } from "react";
import { getConversation } from "../../features/api/conversation";
import { getUserDetails } from "../../features/api/conversation";

export default function TChatAndVIdeoCall(){


     const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)
     const [participants, setParticipants] = useState()
     const [usersDetails, setUsersDetails] = useState()

     useEffect(()=>{
       async function  fetchConversation(){
        const conversation = await getConversation(tutorInfo._id)
        console.log(conversation , "get Conversation")
    
        setParticipants(conversation)

        }
        fetchConversation()
     },[])

     useEffect(()=>{
        if(participants){
            try {
                async function getUserD(){
                    const recieverDetails = await Promise.all(participants.map(async(user)=> await getUserDetails(user)))
                    console.log(recieverDetails , "recieverrDetails")
                    setUsersDetails(recieverDetails)
                }
                getUserD()
    
            } catch (error) {
                console.log(error)
                
            }
            

        }
     },[participants])


    return(
        <>
   
        {usersDetails &&  (   
        <ChatInterface  participants={usersDetails}  sender={tutorInfo}></ChatInterface>
    )}
    
        </>
    )
}