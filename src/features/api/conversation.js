import { tutorApi, userApi } from "../../axios/axiosInstance";

export const sendMessage = async (message)=>{
    try {
        const response = await userApi.post("/sendMessage",{message})
        console.log(response.data, "message Response")
        
    } catch (error) {
        console.log(error)
        
    }
}

export const fetchMessage = async (senderId , receiverId)=>{
    try {
        const response = await userApi.post("/fetchMessage",{senderId, receiverId})
        console.log(response.data ,  "fetchMessage")
        return response.data.fetchedMessages
        
    } catch (error) {
        
    }

}

// this api wil fetch the messages of who texted me
export const getConversation = async (receiverId) =>{
    try {
        const response = await tutorApi.post("/getConversation", {receiverId})
        console.log(response.data.getConversation , "GetConversation GetCOnversation")
        const groupOfUser = response.data.getConversation;
        // const recieverDetails = Array.from(groupOfUser).map( async(user)=> await new Promise.all(await getUserDetails(user)))
        try {
            
        
            return response.data.getConversation
            
        } catch (error) {
            console.log(error)
            
        }
       
        
    } catch (error) {
        console.log
        
    }
}

export const getUserDetails = async (userId) => {
    try {
        const response = await userApi.post("/findUserById", { userId });
        if (!response.data || !response.data.userDetails) {
            throw new Error("userDetails not found in response");
        }
        console.log(response.data.userDetails, "Backend Response");
        return response.data.userDetails;
    } catch (error) {
        console.error("Error in getUserDetails:", error);
        return null; 
    }
};
