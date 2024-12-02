import { Card, CardBody, CardFooter, Button } from "@nextui-org/react"

export default function ImageCard({ImageLink}){


    return(
        <>
                 <CardBody className="p-0 border border-cyan-300">
                  <img
                    src={ImageLink}
                    width={300}
                    height={200}
                    alt="Course thumbnail"
                    className="w-full object-cover"
                  />
                </CardBody>

        </>
    )
}