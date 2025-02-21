import {
  Card,
  CardBody,
  CardFooter,
  Progress,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { allUserOrders } from "../../features/api/isOrderPlaced";
import { useSelector } from "react-redux";
import { PlayCircle, WrenchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./courseCard";

export default function CourseMain() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [orders, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      async function fetchOrders() {
        try {
          const orderDetails = await allUserOrders(userInfo._id);
          if (orderDetails) {
            setOrder(orderDetails);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
      fetchOrders();
    }
  }, [userInfo]);

  const retryPayment = (courseId) =>
    navigate("/courseDetail", { state: { course: courseId } });

  return (
    <div className="container mx-auto px-4 py-8 gap-11">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2" aria-label="My Learnings">
          My Learnings
        </h1>
        <h2 className="text-xl text-gray-600" aria-label="Enrolled Courses">
          Enrolled Courses
        </h2>
      </div>
      {orders.length > 0 && (
        <Tabs
          aria-label="Course tabs"
          className="mb-8"
          classNames={{
            tabList:
              "gap- w-full relative rounded-none p-0 border-b border-divider rounded-md",
            cursor: "w-full bg-yellow-400 rounded opacity-80",
            tab: "max-w-fit px-0 h-12 p-3",
            tabContent: "group-data-[selected=true]:text-yellow-400",
          }}
        >
          <Tab
            key="orders"
            title={
              <div className="flex items-center space-x-2 text-black">
                <span aria-label="Your Courses">Your Courses</span>
              </div>
            }
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              aria-label="Completed Courses"
            >
              {orders
                .filter((order) => order.paymentStatus === "Completed")
                .map((order) => (
                  <CourseCard
                    key={order._id}
                    order={order}
                    action={retryPayment}
                    aria-label={`Course ${order.courseTitle}`}
                  />
                ))}
            </div>
          </Tab>

          <Tab
            key="wishlist"
            title={
              <div className="flex items-center space-x-2 text-black">
                <span aria-label="Payment Rejected Courses">
                  Payment Rejected
                </span>
              </div>
            }
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
              aria-label="Payment Pending Courses"
            >
              {orders
                .filter((order) => order.paymentStatus === "Pending")
                .map((order) => (
                  <CourseCard
                    key={order._id}
                    order={order}
                    action={retryPayment}
                    aria-label={`Course ${order.courseTitle}`}
                  />
                ))}
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
