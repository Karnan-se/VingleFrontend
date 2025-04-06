

export default function VideoPlayer1({ fileUrl , updateDuration}) {


  const handleMetaData =(event) =>{
    console.log(event.target.duration , "duration")
    const duration = event.target.duration.toFixed(2);
  
    updateDuration(duration )
    
  }

return (
    <div>
      {fileUrl ? (
        <video
         
          src={fileUrl}
          controls
          preload="auto"
          className="w-full"
          onLoadedMetadata={handleMetaData}
   
        />
      ) : (
        <div className="items-center w-full  text-center">
          <p className="backdrop-blur-sm bg-white/30 text-gray-800 text-xs px-2 py-0.5 rounded-full shadow-sm">Invalid or missing video URL</p>
        </div>
      )}
    
    </div>
  );

}

