import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/Vingle.png";
import { tutorLogout } from "../../features/authSlice";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useDispatch, useSelector } from "react-redux";


const TutorNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currState, setState] = useState();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.tutor.tutorInfo);

  useEffect(() => {
    console.log("User Info:", userInfo);
    setState(userInfo);
  }, [userInfo]);
  




  const logout = ()=>{
    dispatch(tutorLogout())

  } 

  if(!userInfo){
    return null;
  }

  return (
   
    <nav className="bg-black p-4">
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
          <Dropdown>
            <DropdownTrigger>
              <img
                src={userInfo.photo}
                alt="profile"
                className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className="py-6">
              <DropdownItem
                key="profile"
                className="py-3 hover:bg-slate-200 px-5"
              >
                <NavLink to="/tutor/profile" className="w-full">
                  View Profile
                </NavLink>
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger px-5 hover:bg-slate-200"
                color="danger"
                onClick={logout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <button
            className="btn bg-slate-200 py-1 px-3 rounded-sm text-black"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  
  );
  
};

export default TutorNavbar;
