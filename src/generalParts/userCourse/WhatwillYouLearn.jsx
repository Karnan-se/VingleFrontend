export default function WhatWillYouLearn({course}){

    return (
        <>
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">What you will Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.tags.map((tag, index) => (
                <div key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </>
    )
}