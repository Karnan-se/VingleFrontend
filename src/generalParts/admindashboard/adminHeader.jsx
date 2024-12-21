import { adminLogout } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

export default function  AdminHeader({heading}){

    const dispatch = useDispatch();

    const logout = () =>{
        const logout = dispatch(adminLogout())
      }

    return(
        <>
        
        <header className="bg-gray-700 text-white py-4 px-6">
  <div className="flex justify-between items-center mx-auto">
    <div className="flex-1 flex justify-center">
      <h1 className="text-xl font-semibold p-3.5">{heading}</h1>
    </div>
    <button
      className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
      onClick={logout}
    >
      Logout
    </button>
  </div>
</header>

              
        </>
    )
}