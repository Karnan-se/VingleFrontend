import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from "@nextui-org/react"



export default function ScrollLeftButton({onClick}){

    return(
        <>
            <Button
            isIconOnly
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg"
            aria-label="Previous"
            onClick={onClick}

          >
          <ChevronLeftIcon />
          </Button>
        </>
    )
}