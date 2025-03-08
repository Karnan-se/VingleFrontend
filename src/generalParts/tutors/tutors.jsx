import ImgMediaCard from "./tutorsCard"
import { fetchStudents } from "../../features/api/getAllStudents"
import { useEffect , useState} from "react"
import { motion } from "framer-motion"




export default function TutorsCard(){
    const [tutors, setTutors] = useState()


    useEffect(()=>{
        const fetchStudent = async()=>{
            const allUsers = await fetchStudents();
            const tutors = allUsers.filter((tutor)=> tutor.isInstructor == "Accepted")
         
           setTutors(tutors)

        }
        fetchStudent()

    },[])

    if(!tutors){
      return null
    }



    return (
        <>

        <div className="flex flex-row  flex-wrap  border  items-center justify-between p-5 w-screen flex-grow-0"> 
        {tutors &&
        tutors.map((tutorId, index) => (
          <motion.div
            key={index}
            className="flex flex-row items-center justify-center"
            initial={{ opacity: 0, y: 90 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.1, duration:0.9 }}

          >
            <ImgMediaCard tutorId={tutorId} />
          </motion.div>
        ))}
    </div>

        </>
    )
}