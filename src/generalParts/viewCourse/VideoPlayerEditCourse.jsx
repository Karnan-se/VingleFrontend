

export default function VideoPlayer1({ fileUrl , updateDuration}) {


  const handleMetaData =(event) =>{
    updateDuration(event.target.duration)
    
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
        <div className="items-center w-full bg-black text-center">
          <p>Invalid or missing video URL</p>
        </div>
      )}
    
    </div>
  );

}

