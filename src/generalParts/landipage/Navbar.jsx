import { NavLink } from 'react-router-dom'; 
import logo from "../../assets/logo/Vingle.png"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DynamicProfilePic from './dynamicpic';


export default function Navbar() {
    const userInfo = useSelector((state=> state.user.userInfo))
    useEffect(()=>{
        if(userInfo){
            console.log(userInfo)
        }

    },[])
    







  return (
    <nav className="bg-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex mx-4">
          <img src={logo} alt="logo" width={80} height={60} />
        </div>
        <div className="flex">
          <input
            type="text"
            className="rounded font-serif bg-gray-300 w-120 h-7 pl-3"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-300 text-black rounded-full px-6 py-2'
                : 'text-white hover:text-gray-300'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-300 text-black rounded-full px-6 py-2'
                : 'text-white hover:text-gray-300'
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-300 text-black rounded-full px-6 py-2'
                : 'text-white hover:text-gray-300'
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/tutors"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-300 text-black rounded-full px-6 py-2'
                : 'text-white hover:text-gray-300'
            }
          >
            Tutors
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'bg-gray-300 text-black rounded-full px-6 py-2'
                : 'text-white hover:text-gray-300'
            }
          >
            Contact
          </NavLink>
        </div>
        <DynamicProfilePic/>
        
        
      </div>
    </nav>
  );
}
