import { tutorApi } from "../../axios/axiosInstance"

export const addNewSection =  async (course_id, formData)=>{

    console.log(formData, "before form Dtaa ")

    // const formData = new FormData();
    // newSection.items.forEach((item , index)=>{
    //     if (item.fileUrl instanceof File) {
    //         formData.append("fileUrl", item.fileUrl);
    //         formData.append("fileIndex", index);
    //       }
    // })
    // formData.append("course_id", course_id);
    // formData.append("sectionData", JSON.stringify(newSection))



    try {
        console.log("sent")
        const response = await tutorApi.post("/addnewSection" ,{course_id, formData})
        console.log(response.data)
        return response
        
    } catch (error) {
        console.log(error)

    }
}