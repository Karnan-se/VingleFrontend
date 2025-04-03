import { data } from "react-router-dom";

const CLOUDINARY_UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDERPATH;




export const uploadtoCloudinary =  async (file) =>{
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset",CLOUDINARY_UPLOADPRESET)
    formData.append("folder" ,CLOUDINARY_FOLDER)
    try {
      const response = await fetch(CLOUDINARY_URL , {
        method: "POST",
        body:formData,
        
      })
      if(!response){
        throw new Error("Failed to upLoad")
      }
      const data = await response.json();
      console.log(data.secure_url , "secure URl")
      return data.secure_url

      }catch(error) {
        console.log(error)

      }

}



export const  uploadtoCloudinarySignedURL = async(file, data)=>{
  const formData  = new FormData()
  formData.append("file", file)
  formData.append("api_key", data.apiKey);
  formData.append("timestamp", data.timestamp);
  formData.append("signature", data.signature);
  formData.append("public_id", data.publicId);

  console.log(data.signedUrl , "signedUrl")
  console.log(data.apiKey)
  console.log(data.timestamp)
  console.log(data.signature)
  console.log(data.publicId)

  try {
    const response  = await fetch(data.signedUrl , {
      method:"POST",
      body:formData,
    })
    const uploadData = await response.json()
    console.log(uploadData)
    return uploadData.secure_url
    
  } catch (error) {
    console.log(error)
    throw new Error("error uploading")
    
  }

}