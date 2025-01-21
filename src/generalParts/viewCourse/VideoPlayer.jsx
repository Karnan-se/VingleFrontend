export default function VideoPlayer({ fileUrl }) {
    return (
      <div>
        {fileUrl ? (
          <video
            src={fileUrl}
            controls
            autoPlay={false}
            preload="auto"
            className="w-full"
          />
        ) : (
          <div className="items-center w-full bg-black text-center  ">
             <p>Invalid or missing video URL</p>

          </div>
         
        )}
      </div>
    );
  }
  