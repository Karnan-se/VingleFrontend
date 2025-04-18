import { useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import logo from "../../assets/logo/Vingle.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { userLogoutApi } from "../../features/api/Logout";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currState, setState] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate()

  useEffect(() => {
    setState(userInfo);
  }, [userInfo]);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
     await  userLogoutApi()
      dispatch(userLogout());
    } catch (error) {
      console.log(error);
    }
  };

  let content = (
    <DropdownItem key="Instructor" className="py-3 hover:bg-slate-200 px-5">
      <NavLink to="/beainstructor" className="w-full">
        Be a Instructor
      </NavLink>
    </DropdownItem>
  );
  if (userInfo?.isInstructor == "pending") {
    content = (
      <DropdownItem key="Instructor" className="py-3 hover:bg-slate-200 px-5">
        <NavLink to="/" className="w-full">
          pending
        </NavLink>
      </DropdownItem>
    );
  } else if (userInfo?.isInstructor == "Accepted") {
    content = (
      <DropdownItem key="Instructor" className="py-3 hover:bg-slate-200 px-5">
        <NavLink to="/tutor/login" className="w-full">
          Login as a Instructor
        </NavLink>
      </DropdownItem>
    );
  }

  return (
    <nav className="bg-black ">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex mx-4">
          <img src={logo} alt="logo" width={80} height={60} />
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full md:w-auto md:flex md:items-center md:space-x-4`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block text-white hover:text-gray-300 px-6 py-2 my-2 md:my-0"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block text-white hover:text-gray-300 px-6 py-2 my-2 md:my-0"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block text-white hover:text-gray-300 px-6 py-2 my-2 md:my-0"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/tutors"
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block text-white hover:text-gray-300 px-6 py-2 my-2 md:my-0"
            }
          >
            Tutors
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block text-white hover:text-gray-300 px-6 py-2 my-2 md:my-0"
            }
          >
            Profile
          </NavLink>
          
          <NavLink
            to={
              userInfo?.isInstructor === "pending"
                ? "/"
                : userInfo?.isInstructor === "Accepted"
                ? "/tutor/login"
                : "/beainstructor"
            }
            className={({ isActive }) =>
              isActive
                ? "block md:inline-block bg-gray-300 text-black rounded-full px-6 py-2 my-2 md:my-0"
                : "block md:inline-block  hover:text-gray-300 px-6 py-2 my-2 md:my-0 text-yellow-300"
            }
          >
            {userInfo?.isInstructor === "pending"
              ? "Pending"
              : userInfo?.isInstructor === "Accepted"
              ? "Login as Instructor"
              : "Be an Instructor"}
          </NavLink>
         

        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Dropdown>
            <DropdownTrigger className="mr-4 bg-white">
              <img
                src={
                  userInfo?.photo ||
                  "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                }
                alt="profile"
                className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer "
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              className="py-6 bg-white"
            >
              <DropdownItem
                key="profile"
                className="py-3 hover:bg-slate-200 px-5"
              >
                <NavLink to="/profile" className="w-full">
                  View Profile
                </NavLink>
              </DropdownItem>

              {content}


              {userInfo  ?  ( 

              <DropdownItem
                key="logout"
                className="text-danger px-5 hover:bg-slate-200 hover:text-black"
                color="danger"
                onClick={logout}
              >
                Logout
              </DropdownItem>
                ) : (   <DropdownItem
                  key="logout"
                  className="text-danger px-5 hover:bg-slate-200 hover:text-black"
                  color="danger"
                  onClick={()=>navigate("/login")}
                >
                  SIGN IN
                </DropdownItem>   )}
            </DropdownMenu>
          </Dropdown>

          {/* <button className="btn bg-slate-200 py-1 px-3 rounded-sm text-black" onClick={logout}>
            Logout
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
