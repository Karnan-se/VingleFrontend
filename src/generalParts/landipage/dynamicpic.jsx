import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';







export default function DynamicProfilePic() {
    let userInfo = useSelector(state=> state.user.userInfo)

    let diplayContent = !userInfo ? <div className="flex space-x-4">
<NavLink
  to="/register"
  className="bg-gray-300 text-black rounded-full px-6 py-2"
>
  Sign Up
</NavLink>
<NavLink
  to="/login"
  className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600"
>
  Login
</NavLink>
</div> : <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden">
        <img
          src={userInfo?.photo || "https://lh3.googleusercontent.com/a/ACg8ocLKHbbXlKTKlXS04FurppuwIwD-bw68yZnO8nrVjk1LMHeHyhM=s96-c"} 
          alt="Profil"
          className="w-full h-full object-cover"
        />
      </div>


  return (
    <>
      {diplayContent}
    </>
  );
}
