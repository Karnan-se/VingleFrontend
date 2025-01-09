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
          <p>Invalid or missing video URL</p>
        )}
      </div>
    );
  }
  