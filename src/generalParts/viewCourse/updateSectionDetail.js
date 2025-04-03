import { tutorApi } from "../../axios/axiosInstance"
import { useLoading } from "../preloader/LoadingContext";


export  const updateSectionDetail = async(section_id , sectionData)=>{

   

    const formData = sectionData.filter((section)=> section._id ==  section_id)[0]
    console.log(formData , "this data can be send ")

    // const formData = new FormData();
   
    // data.items.forEach((item, index) => {
    //     if (item.fileUrl instanceof File) {
    //       formData.append("fileUrl", item.fileUrl);
    //       formData.append("fileIndex", index);
    //     }
    //   });

    //     formData.append("section_id", section_id);
    //     formData.append("sectionData", JSON.stringify(data));

        
    const response = await tutorApi.put("/updateSection", {formData} );
   
    console.log(response.data.updateSection);
    return response.data.updateSection


}