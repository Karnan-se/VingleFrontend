import Navbar from "../../generalParts/landipage/Navbar";
import Welcome from "../../generalParts/courses/welcome";
import Slider from "../../generalParts/courses/slider";
import { motion, useScroll , useTransform} from "framer-motion";

export default function Courses() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["5vh", "100vh"]);

  return (
    <div className="bg-white relative">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col mx-36 align-middle border">
        <div className="p-16">
          <Welcome />
        </div>
        <div className="p-3 font-bold">
          <p className="font-inter text-2xl">What to Learn Next</p>
        </div>
        <Slider />
      </div>
    </div>
  );
}
