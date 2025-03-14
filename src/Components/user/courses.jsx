import Navbar from "../../generalParts/landipage/Navbar";
import Welcome from "../../generalParts/courses/welcome";
import Slider from "../../generalParts/courses/slider";
import { allUserOrders } from "../../features/api/isOrderPlaced";
import { motion, useScroll , useTransform} from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function Courses() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["5vh", "100vh"]);

  return (
    <div className="bg-white relative">
      <Navbar />

      
      <div className="flex flex-col mx-36 align-middle border">
        <div className="p-16 flex justify-evenly">
          <Welcome />
          <div className="w-60  ">
          <ViewMyCourse />

          </div>
        </div>
    
        <div className="p-3 font-bold">
          <p className="font-inter text-2xl">What to Learn Next</p>
        </div>
        <Slider />
      </div>
    </div>
  );
}


function ViewMyCourse(){

  const navigate = useNavigate()

 return (
    <>
    <div className="w-full flex flex-col items-center">
     
    <motion.button
  className="w-full h-10 border bg-yellow-400 text-black  rounded-md shadow-md"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileTap={{ scale: 0.95  }}
  whileHover={{ scale: 1.05  }}
  onClick={() => navigate("/profile/course")}
>
  View My Course
</motion.button>



    </div>
    </>
  )
}
