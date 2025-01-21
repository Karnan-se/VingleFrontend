import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({ fileUrl, updatePercentage}) {
  const videoRef = useRef(null);
  const [watchedRanges, setWatchedRanges] = useState([]); 
  const [percentageWatched, setPercentageWatched] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);


  const mergeRanges = (ranges) => {
    if (ranges.length === 0) return [];
    const sorted = [...ranges].sort((a, b) => a.start - b.start);
    const merged = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      if (sorted[i].start <= last.end) {
        last.end = Math.max(last.end, sorted[i].end); 
      } else {
        merged.push(sorted[i]);
      }
    }

    return merged;
  };

  
  const calculateWatchedTime = (ranges) => {
    return ranges.reduce((sum, range) => sum + (range.end - range.start), 0);
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime || 0;

    
    setWatchedRanges((prev) => {
      const updatedRanges = [...prev, { start: currentTime, end: currentTime + 1 }];
      return mergeRanges(updatedRanges);
    });
  };

  const handleSeek = () => {
    const currentTime = videoRef.current?.currentTime || 0;

    
    setWatchedRanges((prev) =>
      mergeRanges([...prev, { start: currentTime, end: currentTime }])
    );
  };

  const handleLoadedMetadata = () => {
    const duration = videoRef.current?.duration || 0;
    setTotalDuration(duration);
  };

  useEffect(() => {
    if (totalDuration > 0) {
      const watchedTime = calculateWatchedTime(watchedRanges);
      const percentage = Math.min((watchedTime / totalDuration) * 100, 100); // Cap at 100%
      setPercentageWatched(percentage.toFixed(2));
    }
  }, [watchedRanges, totalDuration]);

  useEffect(() => {
    console.log(`Watched Ranges: `, watchedRanges);
    console.log(`Percentage Watched: ${percentageWatched}%`);
  }, [watchedRanges, percentageWatched]);

  return (
    <div>
      {fileUrl ? (
        <video
          ref={videoRef}
          src={fileUrl}
          controls
          preload="auto"
          className="w-full"
          onTimeUpdate={handleTimeUpdate}
          onSeeked={handleSeek}
          onLoadedMetadata={handleLoadedMetadata}
        />
      ) : (
        <div className="items-center w-full bg-black text-center">
          <p>Invalid or missing video URL</p>
        </div>
      )}
      <div className="mt-2 text-sm">
        <p>Percentage Watched: {percentageWatched}%</p>
      </div>
    </div>
  );
}
