import {  CardBody,  } from "@nextui-org/react"
import { useState , useRef , useEffect } from "react"

export default function ImageCard({ImageLink , navigate}){
  const imageRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imageRef.current) observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [])


    return(
        <>
                 <CardBody className="p-0 border shadow-md">
                  <img
                    src={ImageLink.thumbnail}
                    ref={imageRef}
                   
                    alt="Course thumbnail"
                    className="w-full max-h-[150px] min-h-[150px] cursor-pointer object-cover"
                    onClick={()=>navigate(ImageLink)}
                  />
                </CardBody>

        </>
    )
}