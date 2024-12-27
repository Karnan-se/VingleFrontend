
import Navbar from "../../generalParts/landipage/Navbar";
import { Outlet } from "react-router-dom";
import ProfileAside from "../../generalParts/profile/aside";
import { userUpdate } from "../../features/api/updateApi";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";


export default function ProfileComponent() {
  const userDetail = useSelector((state) => state.user.userInfo);
 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto max-w-screen-xl">
        <div className="flex gap-6">
          <ProfileAside state={userDetail} />

          <Outlet  context ={{userUpdate, userDetail}}  />
        </div>
      </div>
    </div>
  );
}
