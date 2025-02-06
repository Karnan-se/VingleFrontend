import { Phone, Video, Info } from "lucide-react";


export default function ChatHeader({ participant , isActive }) {


  // const [isActive , setIsOnline] = useState(false)

  // useEffect(() => {
  //   const handleOnlineStatus = (userId) => {
  //     console.log(userId, participant._id  ,"userID is a participant ID");
  //     if (userId === participant._id) {
  //       setIsOnline(true);
  //     }else{
  //       setIsOnline(false)
  //     }
  //   };

  //   socket.on("isOnline", handleOnlineStatus);

  //   return () => {
  //     socket.off("isOnline", handleOnlineStatus);
  //   };
  // }, [participant._id]);



  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-black text-white">
        <div className="flex items-center space-x-3">
       
          <img
            src={participant.photo}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          
          <div>
           
              <div>
                <div>{participant?.firstName}</div>

              
                {isActive &&  isActive == true ? (
                <div className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active Now
                </div>
                ) : (<></>)}


              </div>
          
          </div>
        </div>

        {/* Icons */}
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
  );
}
