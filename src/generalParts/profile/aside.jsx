import { NavLink } from "react-router-dom";
import { Bell, BookOpen, Camera, FileText, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProfileAside() {

  const userInfo = useSelector((state)=>state.user.userInfo)
  useEffect(()=>{
    console.log(userInfo)

  },[userInfo])
  return (
    <>
      <div className="w-full sm:w-64 flex-shrink flex-row">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 bg-gray-100 text-center">
            <div className="w-44 h-44 mx-auto mb-3 rounded-full border-2 border-gray-200 overflow-hidden">
              <img
                src={ userInfo.photo ||
                  "https://lh3.googleusercontent.com/a/ACg8ocLKHbbXlKTKlXS04FurppuwIwD-bw68yZnO8nrVjk1LMHeHyhM=s96-c"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">{userInfo.firstname || ""}</div>
          </div>

          <nav className="py-5 flex-row  sm:flex-col md:flex-col lg:flex-col xl:flex-col">
            <NavLink
              to="/profile" end
              className={({ isActive }) =>
                `w-full px-4 py-2 flex items-center gap-3 text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <User size={16} />
              Profile
            </NavLink>
            <NavLink
              to="/profile/photo"
              className={({ isActive }) =>
                `w-full px-4 py-4 flex items-center gap-3 text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <Camera size={16} />
              Photo
            </NavLink>
            <NavLink
              to="/profile/course"
              className={({ isActive }) =>
                `w-full px-4 py-4 flex items-center gap-3 text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <BookOpen size={16} />
              Course
            </NavLink>
            <NavLink
              to="/profile/certifications"
              className={({ isActive }) =>
                `w-full px-4 py-4 flex items-center gap-3 text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <FileText size={16} />
              Certifications
            </NavLink>
            {/* <NavLink
              to="/profile/notifications"
              className={({ isActive }) =>
                `w-full px-4 py-4 flex items-center gap-3 text-sm ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <Bell size={16} />
              Notifications
            </NavLink> */}
          </nav>
        </div>
      </div>
    </>
  );
}
