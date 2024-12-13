'use client'

import {  Button, Avatar } from "@nextui-org/react"
import ProfileAside from "../../generalParts/profile/aside.jsx"

import Navbar from "../../generalParts/landipage/Navbar.jsx"

export default function AddPhoto() {
  


  return (
    <div className="min-h-screen bg-white">
        <Navbar></Navbar>
    
    

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar */}
          
            <ProfileAside> </ProfileAside>

          {/* Main Content */}
         



        </div>
      </div>
    </div>
  )
}

