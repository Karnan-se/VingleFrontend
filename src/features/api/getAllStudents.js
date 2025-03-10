import { adminApi, tutorApi } from "../../axios/axiosInstance";


export const fetchStudents = async () => {
      try {
        const response = await adminApi.get('/getallStudents' );
        console.log(response.data , "daaaa students")
        
        return response.data.students
      } catch (err) {
        console.error(err);
        throw err
       
      } 
    };


    export const fetchTutors = async ()=>{
      try {
        const response = await tutorApi.get("/getAllTutors")
        console.log(response.data.tutors)
        return response.data.tutors
        
      } catch (error) {
        console.log(error)
        throw error
        
      }
    }

    export const fetchTutorByEmail  = async (emailAddress)=>{
      try {
        console.log(emailAddress , "emailAddress for api request")
        const response = await tutorApi.get("/fetchTutorByEmail",{params:{emailAddress}})
        console.log(response.data.tutors)
        return response.data.tutors

        
      } catch (error) {
        console.log(error)
        throw error
        
      }
    }