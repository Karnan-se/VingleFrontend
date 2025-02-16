import { CardFooter } from "@nextui-org/react"
import { StarIcon, UsersIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'




export default function CardFooter1({courseData}){

    return (
    <>
    <CardFooter className="flex flex-col items-start p-4">
                  <h3 className="font-semibold mb-2">{courseData?.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">Created By  :{courseData?.tutorId?.firstname || "Tutor"}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="font-bold">Ratings</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                                   <StarIcon
                                     key={i}
                                     className={`w-4 h-4 ${
                                       i < courseData.averageRating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                                     }`}
                                   />
                                 ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>₹{courseData?.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <UsersIcon className="w-4 h-4" />
                      <span>{courseData?.students}</span>
                    </div>
                  </div>
                </CardFooter>
    </>
    )
}