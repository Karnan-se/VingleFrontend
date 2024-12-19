import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { userUpdate } from "../../features/api/updateApi";
import { userApi } from "../../axios/axiosInstance";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../features/authSlice";

export default function PhotoMain() {


  const dispatch = useDispatch()
  
  const [image, setImage] = useState(null); // Image preview
  const [file, setFile] = useState(null); // Raw file for upload
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); 
  const userInfo = useSelector((state=> state.user.userInfo))

  const UPLOAD_PRESET = "ml_default";
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/deubjmlf3/image/upload";
  const folderPath = "user/profile_pic";

  
  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile); 
    }
  };


  const handleSave = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folderPath);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUploadedImageUrl(data.secure_url); 
      const photo = data.secure_url;
      let  values  ={
        emailAddress:userInfo.emailAddress,
        photo : data.secure_url
      }
      const backend = await userUpdate(values)
      if(backend){
        console.log(backend)
        dispatch(setUserCredentials(backend))
        
      }
     swal({
      icon:"success",
      text:"Image Saved SuccessFully"
     })

      console.log("Uploaded Image URL:", data.secure_url);
      // userUpdate()
    } catch (error) {
      console.error("Error uploading the image:", error);
      alert("Failed to upload the image. Please try again.");
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6 w-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Photo</h1>
        <p className="text-gray-600">Add a nice photo of yourself</p>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="aspect-video max-w-md mx-auto bg-gray-50 rounded-lg flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="max-w-full max-h-full rounded-lg"
              />
            ) : (
              <p className="text-gray-500">Image Preview</p>
            )}
          </div>
          <Button
            className="w-20 shadow-sm border bg-gray-50"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>

        <div className="flex items-center justify-between max-w-md mx-auto">
          <span className="text-gray-600">Add/change Image</span>
          <label
            htmlFor="upload-button"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
          >
            Upload Image
          </label>
          <input
            id="upload-button"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>


    </div>
  );
}
