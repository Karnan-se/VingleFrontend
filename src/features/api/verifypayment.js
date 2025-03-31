import { userApi } from "../../axios/axiosInstance";


const verifyPayment = async (userInfo, sessionId) => {
    try {

        

        const response = await userApi.post("/verifyPayment", { userInfo, sessionId });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { verifyPayment };
