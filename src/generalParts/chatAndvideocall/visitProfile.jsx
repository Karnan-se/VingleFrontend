import { useEffect } from "react"

export default function VisitComponent({tutorId}){

    useEffect(()=>{

    },[tutorId])

    

    const startChat = ()=>{
        
        console.log(tutorId)
    }

    

    return (
        <>
        <div className="mx-10 flex w-1/4 mb-10 gap-5">

       
         <div className="">
            <h2 className="text-xl font-semibold">Iam the Course Creator</h2>
            <div className="text-gray-600">{tutorId.firstName}</div>
            <div className="text-gray-600">UI/UX Designer</div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-blue-600">56 Courses</div>
              <div className="flex items-center">
                <span className="text-gray-400">(76,335)</span>
              </div>
            </div>
          </div>
          <button className="h-12 items-center p-5 bg-yellow-300 rounded-lg ml-auto flex
            hover:bg-yellow-500 hover:text-white shadow-md " onClick={"visitProfile"}>
            Visit Profile
          </button>
          <button className="h-12 items-center p-5 bg-yellow-300 rounded-lg ml-auto flex 
           hover:bg-yellow-500 hover:text-white  shadow-md" onClick={startChat}>
            contact me
          </button>
          </div>
        </>
    )
}