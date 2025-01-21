
import { Card, CardBody, CardFooter, Progress, Tabs, Tab } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { allUserOrders } from "../../features/api/isOrderPlaced";
import {useSelector} from "react-redux"
import { PlayCircle , WrenchIcon } from 'lucide-react'
import { useNavigate } from "react-router-dom";


export default function CourseMain() {

  const userInfo = useSelector((state=> state.user.userInfo))
  const [orders, setOrder] = useState()
  const navigate = useNavigate();

  console.log(userInfo)

if(userInfo){
  useEffect(()=>{
    console.log(userInfo._id)
    async function fetchOder(){
      const orderDetails = await  allUserOrders(userInfo._id)
      if(orderDetails){
       console.log("orderDetails ffetcjed", orderDetails)
       setOrder(orderDetails)
      }
     }
     
     
     fetchOder();
   },[userInfo])

}

const retryPayment =(courseId)=>navigate("/courseDetail", {state:{course:courseId}} )

  return (
    
    <div className="container mx-auto px-4 py-8 gap-11">
     
      <div className="text-center mb-8 ">
        <h1 className="text-3xl font-bold mb-2">My Learnings</h1>
        <h2 className="text-xl text-gray-600">Enrolled Courses</h2>
      </div>
      {orders && ( <>  


      
      <Tabs 
        aria-label="Course tabs" 
        className="mb-8"
        classNames={{
          tabList: "gap- w-full relative rounded-none p-0 border-b border-divider rounded-md ",
          cursor: "w-full bg-yellow-400 rounded opacity-80 ",
          tab: "max-w-fit px-0 h-12 p-3",
          tabContent: "group-data-[selected=true]:text-yellow-400"
        }}
      >
        <Tab
          key="orders"
          title={
            <div className="flex items-center space-x-2 text-black ">
              <span>your Courses</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {orders.filter(order => order.paymentStatus === "Completed").map((order) => (
              <CourseCard key={order._id} order={order} action={(courseId)=>retryPayment(courseId)}  />
            ))}
          </div>
        </Tab>


        <Tab
          key="wishlist"
          title={
            <div className="flex items-center space-x-2 text-black">
              <span>Payment Rejected</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 ">
            {orders.filter(order => order.paymentStatus === "Pending").map((order) => (
              <CourseCard key={order._id} order={order} action={(courseId)=>retryPayment(courseId)} />
            ))}
          </div>
        </Tab>
      </Tabs>
      </>)}



    </div>
  )
}





function CourseCard({ order , action }) {
  const [isHovered, setIsHovered] = useState();
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

            {order.paymentStatus == "Completed"? ( 
            <button 
              className= " mt-28 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            onClick={()=>action(order.courseId)}>
              <PlayCircle className="mr-2 h-5 w-5" />
              Continue Learning
            </button>
            ) : 
            <button 
              className= " mt-28 bg-red-400 hover:bg-red-500 text-black font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
            onClick={()=>action(order.courseId)}>
              <WrenchIcon className="mr-2 h-5 w-5" />
              Retry Payment
            </button>
            
            
            }
          </div>
        )}
      </CardBody>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{order.courseId.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{"tutor"}</p>
        <Progress 
          value={order.progress} 
          className="w-full" 
          classNames={{
            indicator: "bg-yellow-400",
            track: "bg-gray-200"
          }}
        />
      </CardFooter>
    </Card>
  )
}

