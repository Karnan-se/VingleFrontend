

import { Button } from "@nextui-org/react"
import { PhoneCall, PhoneOff } from "lucide-react"



export const CallNotification = ({ caller, onAnswer, onDecline }) => {

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1">
        <p className="font-semibold">Incoming call</p>
        <p className="text-sm text-gray-500">{caller}</p>
      </div>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={onAnswer}>
          <PhoneCall className="w-4 h-4 mr-2" />
          Answer
        </Button>
        <Button size="sm" variant="outline" onClick={onDecline}>
          <PhoneOff className="w-4 h-4 mr-2" />
          Decline
        </Button>
      </div>
    </div>
  )
}

