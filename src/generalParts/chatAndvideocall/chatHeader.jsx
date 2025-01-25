import { Phone, Video, Info, Send, Mic } from "lucide-react";


export default function ChatHeader(){

    return(
        <>
        <div className="flex items-center justify-between p-4 border-b bg-black text-white">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ez5Owl2cTM6rhC5S36r2Qbof0Othu9.png"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div>Robert James</div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Active Now
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-full">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>
        </>
    )
}