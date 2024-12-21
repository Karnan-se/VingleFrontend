import { NavLink } from "react-router-dom"


export default function (){

    return (
        <>
      <aside className="w-64 bg-white h-[calc(100vh-64px)] shadow-lg">
  <nav className="p-4">
  
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Main Menu</h2>
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
        end
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/admin/categories"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
      >
        Categories
      </NavLink>
      <NavLink
        to="/admin/students"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
      >
        Students
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
      >
        Orders
      </NavLink>
      <NavLink
        to="/admin/tutors"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
      >
        Tutors
      </NavLink>
      <NavLink
        to="/admin/courses"
        className={({ isActive }) =>
          `p-2 mb-1 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : 'hover:bg-gray-100'
          }`
        }
      >
        Courses
      </NavLink>
    </div>

    
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Your English AI Course
      </h2>
      <NavLink
        to="/ai-course/dashboard"
        className={({ isActive }) =>
          `p-2 mb-1 hover:bg-gray-200 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : ''
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/ai-course/reading"
        className={({ isActive }) =>
          `p-2 mb-1 hover:bg-gray-200 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : ''
          }`
        }
      >
        Reading
      </NavLink>
      <NavLink
        to="/ai-course/writing"
        className={({ isActive }) =>
          `p-2 mb-1 hover:bg-gray-200 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : ''
          }`
        }
      >
        Writing
      </NavLink>
      <NavLink
        to="/ai-course/speaking"
        className={({ isActive }) =>
          `p-2 mb-1 hover:bg-gray-200 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : ''
          }`
        }
      >
        Speaking
      </NavLink>
      <NavLink
        to="/ai-course/listening"
        className={({ isActive }) =>
          `p-2 mb-1 hover:bg-gray-200 rounded cursor-pointer block ${
            isActive ? 'bg-gray-300 font-bold' : ''
          }`
        }
      >
        Listening
      </NavLink>
    </div>
  </nav>
</aside>


        </>
    )
}