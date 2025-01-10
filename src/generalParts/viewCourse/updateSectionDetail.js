import { tutorApi } from "../../axios/axiosInstance"

export  const updateSectionDetail = async(section_id , sectionData)=>{

    const data = sectionData.filter((section)=> section._id ==  section_id)[0]
    console.log(data , "this data can be send ")

    const response = await tutorApi.put("/updateSection", {section_id , sectionData} ,{
        
    
    });
    console.log(response);


}