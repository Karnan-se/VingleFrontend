import { ChevronRightIcon } from 'lucide-react'
import { Button } from "@nextui-org/react"


export default function ScrollRightButton({onClick}){

    return(
        <>
            <Button
            isIconOnly
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg"
            aria-label="Next"
            onClick={onClick}
          >
            <ChevronRightIcon />
          </Button>
        </>
    )
}