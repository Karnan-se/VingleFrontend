import { userApi } from "../../axios/axiosInstance";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyPayment = async (userInfo, sessionId) => {
    try {

        await delay(10000);

        const response = await userApi.post("/verifyPayment", { userInfo, sessionId });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { verifyPayment };
