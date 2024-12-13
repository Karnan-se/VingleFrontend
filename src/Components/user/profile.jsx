'use client'
import Navbar from '../../generalParts/landipage/Navbar'
import { Outlet } from 'react-router-dom';


import ProfileMain from '../../generalParts/profile/profileMain';

import ProfileAside from '../../generalParts/profile/aside';

import "react-phone-number-input/style.css"; 

import { useDispatch, useSelector } from 'react-redux';


export default function ProfileComponent() {
  const userDetail = useSelector((state=> state.user.userInfo))
  const dispatch = useDispatch()
  const emailAddress = userDetail.emailAddress
  


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar  />

      <div className="container mx-auto max-w-screen-xl">
        <div className="flex gap-6">
              <ProfileAside state={userDetail}/>

              {/* <ProfileMain  userDetail={userDetail}/> */}
              <Outlet/>
              
              
            

          




        </div>
      </div>
    </div>
  )
}
