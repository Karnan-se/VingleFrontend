
import { PlayCircle, WrenchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState  , useEffect, useCallback } from "react";
import { usepdfContext } from "../../Components/context/pdfRenderContext";
import { getprogress } from "../../features/api/progress";
import {
    Card,
    CardBody,
    CardFooter,
    Progress,
    Tabs,
    Tab,
  } from "@nextui-org/react";

export default function CourseCard({ order, action }) {
  
    const [isHovered, setIsHovered] = useState();
    const {renderPdf} = usepdfContext();
    const [coursePercentage , setCoursePercentage] = useState()

    const getProgress = useCallback(async () => {
      const progress = await getprogress(order.userId, order.courseId);
      console.log(progress, "progress Worked with useCallback");
      setCoursePercentage(progress)
    }, [order.userId, order.courseId]);
    
    useEffect(() => {
      getProgress();
    }, [getProgress]); 
    
    


     return (
      <Card
        className="w-full relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="p-0 h-[200px] relative overflow-hidden">
          <img
            src={order.courseId.thumbnail || "/placeholder.svg"}
            alt={order.courseId.name}
            width={300}
            height={200}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              {order.paymentStatus == "Completed" ? (
                <>
                  <div className="flex flex-col ">
                    <button
                      className="flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      onClick={() => action(order.courseId)}
                    >
                      <PlayCircle className="mr-2 h-5 w-5"  aria-label="s"/>
                      <span>Continue Learning</span>
                    </button>
                    
                    {order.invoice && ( 
                    <button
                      className="  mt-28 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                      onClick={() => renderPdf(order.invoice)}
                       aria-label="Course Content"
                    >
                      View Invoice
                    </button>
                     )}
                  </div>
                </>
              ) : (
                <div className="flex">
                  <button
                    className="flex items-center mt-28 bg-red-400 hover:bg-red-500 text-black font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 text-wrap"
                    onClick={() => action(order.courseId)}
                  >
                    <WrenchIcon className="mr-2 h-5 w-5" />
                    <span>Retry Payment</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </CardBody>
        <CardFooter className="flex flex-col items-start p-4">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">
            {order.courseId.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">{"tutor"}</p>
          {coursePercentage >0 && (  
          <Progress
            value={coursePercentage}
            className="w-full"
            classNames={{
              indicator: "bg-yellow-400",
              track: "bg-gray-200",
            }}
          />
        )}
        </CardFooter>
      </Card>
    );
  }