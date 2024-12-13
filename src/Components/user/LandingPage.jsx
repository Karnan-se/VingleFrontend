
import { Card,  Button } from "@nextui-org/react"
import Footer from "../../generalParts/landipage/footer"
import ImageCard from "../../generalParts/landipage/Card"
import CardFooter from "../../generalParts/landipage/Cardfooter"
import ScrollLeftButton from "../../generalParts/landipage/ScrollLeft"
import ScrollRightButton from "../../generalParts/landipage/ScrollRight"
import Navbar from "../../generalParts/landipage/Navbar"

import { useRef } from "react"

export default function LandingPage() {

    const scrollref = useRef(null);

    const scroll = (direction)=>{
        if(scrollref.current){
            const currentPos = scrollref.current.scrollLeft;
            const newPos = direction == "right" ? currentPos+300 : currentPos-300
            scrollref.current.scrollTo({left:newPos, behavior: "smooth"})
        }

    }

  const categories = [
    "Data Science",
    "IT certifications",
    "Leaderships",
    "Web Development",
    "Communication",
    "Business Analytics"
  ]
 

  const courseData = {
    title: "The Complete AI-powered Copywriting Course & ChatGPT",
    author: "By: Tomas Moravek,team Digital",
    rating: 4.5,
    students: 3099,
    price: 599,
    image:"https://nextui.org/images/hero-card.jpeg"
  }

  return (
    

    <div className="min-h-screen bg-white">
        <Navbar />

      <section className="w-full py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">All The Skill You Need In One Place</h1>
          <p className="text-gray-600 mb-8">
            From critical skills to technical topics, V ingle supports your professional development
          </p>
          
        
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant="flat"
                className="bg-gray-200 hover:bg-gray-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

     
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Courses</h2>
          <Button variant="light">See all</Button>
        </div>
        
        <div className="relative">
          <div className="flex gap-4  pb-4 overflow-x-hidden " ref={scrollref} >
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="min-w-[300px]">
             <ImageCard ImageLink={courseData.image}/>
                <CardFooter courseData={courseData}/>

              </Card>
            ))}
          </div>

          <ScrollLeftButton onClick={()=>scroll("left")}/>
          <ScrollRightButton onClick={()=>scroll("right")}/>

       

        </div>
        
      </section>

      
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Best Seller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <ImageCard ImageLink={courseData.image}/> 
              <CardFooter courseData={courseData}>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

     
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-4">Learn English With Our AI</h2>
        <p className="text-gray-600 mb-8">
          Learn English from From our custom AI Module in an Interactive way
        </p>
      </section>

      
      <section className="bg-gray-200 py-20 mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-lg">1k+ users</div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Join Now 2000 Free Credit</h2>
              <Button color="warning" size="lg">
                CLICK HERE TO JOIN
              </Button>
            </div>
            <div className="text-lg">PTE TEST PREPARATION</div>
          </div>
        </div>
      </section>

      

       <Footer />

     
     
    </div>
  )
}

