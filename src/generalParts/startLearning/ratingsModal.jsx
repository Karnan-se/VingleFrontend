
import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { sendRatings } from "../../features/api/saveRatings"

export default function RatingsModal({openRatingsModals , course , userInfo}) {

  const [rating, setRating] = useState(0)
  const [review, setFeedback] = useState("")

  const toggleModal = () => setIsOpen(!isOpen)
  const handleRating = (index) => setRating(index + 1)


  // useEffect(()=>{
  //   console.log("fetch ratings")

  // },[])


  const handleSubmit =  async()=>{
    try {
      console.log("handle Submit ")
        const ratings = {
            userId : userInfo._id,
            courseId: course._id,
            ratingValue:rating,
           
        }
        if (review !== "") {
          ratings.review = review;
      }
        

        console.log(ratings , "ratings  ratings Ratings")

        const sendRating = await sendRatings(ratings)
        console.log(sendRating , "sendRatings")    
    } catch (error) {
        console.log(error)
        
        
    }
  }


 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 absolute ">
      

    
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">Course Ratings</h2>
              <button onClick={openRatingsModals} className="text-gray-500 hover:text-gray-800">✖</button>
            </div>

            
            <div className="bg-gray-100 rounded-lg overflow-hidden mt-4">
              <img src={course.thumbnail} alt="Course image" className="w-full h-48 object-cover  " />
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={course.tutorId.photo} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-gray-800">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.tutorId.firstName}</p>
                  </div>
                </div>
                {/* Static Rating Display */}
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} fill={i < 4 ? "#FFD700" : "none"} stroke={i < 4 ? "#FFD700" : "#000"} />
                  ))}
                </div>
              </div>
            </div>

          
            <div className="mt-6">
              <p className="text-lg font-semibold">course Rating</p>
              <div className="flex space-x-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className="cursor-pointer transition-transform transform hover:scale-110"
                    fill={i < rating ? "#FFD700" : "none"}
                    stroke={i < rating ? "#FFD700" : "#000"}
                    onClick={() => handleRating(i)}
                  />
                ))}
              </div>
            </div>

            {/* Feedback */}
            <textarea
              className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your review..."
              rows="3"
              value={review}
              onChange={(e) => setFeedback(e.target.value)}
            />

           

            {/* Footer */}
            <div className="flex justify-end mt-6 space-x-3">
              <button onClick={openRatingsModals} className="px-5 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300">
                Close
              </button>
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleSubmit}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
    
    </div>
  )
}
