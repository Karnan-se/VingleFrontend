
import Navbar from "../../generalParts/landipage/Navbar";
import { Outlet } from "react-router-dom";
import ProfileAside from "../../generalParts/profile/aside";
import { userUpdate } from "../../features/api/updateApi";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../../features/authSlice";


export default function ProfileComponent() {
  const userDetail = useSelector((state) => state.user.userInfo);
 

  return (
    <div className=" bg-gray-50 w-full">
      <Navbar />

      <div className=" mx-auto max-w-screen-xl">
        <div className=" flex flex-col sm:flex-row  md:flex-row lg:flex-row xl:flex-row gap-6">
          <ProfileAside state={userDetail} />
      <div  className=" flex-1">
      <Outlet  context ={{userUpdate, userDetail , setUserCredentials}}  />

      </div>
         
        </div>
      </div>
    </div>
  );
}
