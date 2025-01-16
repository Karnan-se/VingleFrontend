import { Card, CardBody, CardFooter, Button } from "@nextui-org/react"

export default function ImageCard({ImageLink , navigate}){


    return(
        <>
                 <CardBody className="p-0 border border-cyan-300">
                  <img
                    src={ImageLink.thumbnail}
                    width={300}
                    height={200}
                    alt="Course thumbnail"
                    className="w-full max-h-[200px] min-h-[200px] cursor-pointer object-cover"
                    onClick={()=>navigate(ImageLink)}
                  />
                </CardBody>

        </>
    )
}