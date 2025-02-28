import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { Image, FileText } from "lucide-react";



export default function PopOver() {

    const [isOpen , setIsOpen] = useState()
  return (
    <>
    <div className=""> 
      <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} className="absolute w-40 left-0 top-40">
        <PopoverTrigger>
          <input
          type="file"
          accept="image/pdf"
          />Gallery
        </PopoverTrigger>
        <PopoverContent>
 =
        </PopoverContent>
      </Popover>
      </div>
    </>
  );
}
