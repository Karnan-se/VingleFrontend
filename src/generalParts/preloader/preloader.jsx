
import React, { useState } from 'react'
import { useContext } from 'react'
import { useLoading } from './LoadingContext'

const VinglePreloader = () => {
  const {isLoading} = useLoading();

  if(!isLoading){
    return null
  }

  

  return (
    <>
  
    <div className='w-full bg-slate-300'>

   
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
     
      <div className="relative w-48 h-48 mb-8">
        {/* {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-fan-page"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{
                transform: `rotate(${i * 10}deg)`,
                transformOrigin: 'center 60%',
              }}
            >
              <path
                d="M50 20 L50 80"
                stroke="currentColor"
                strokeWidth="4"
                className="text-slate-800"
              />
            </svg>
          </div>
        ))} */}
      </div>
      
      
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <span className="text-6xl font-bold text-slate-800 animate-bounce-slow animate-ping">V</span>
          <span className="text-4xl font-semibold text-slate-600 ml-1">ingle</span>
        </div>
      </div>

   
      <div className="text-slate-500 animate-pulse">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Please wait...
      </div>
    </div>
    </div>
    </>
  )
}

export default VinglePreloader

