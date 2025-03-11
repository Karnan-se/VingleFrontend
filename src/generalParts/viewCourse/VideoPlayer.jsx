import { useRef, useState, useEffect } from "react"
import {useLocation} from "react-router-dom"
 
export default function VideoPlayer({ fileUrl, updatePercentage, initialPercentage, itemId }) {
  const videoRef = useRef(null)
  const [watchedRanges, setWatchedRanges] = useState([])
  const [percentageWatched, setPercentageWatched] = useState(initialPercentage || 0)
  const [totalDuration, setTotalDuration] = useState(0)
  const initialPercentageRef = useRef(initialPercentage)
  const location = useLocation()

  useEffect(() => {
    initialPercentageRef.current = initialPercentage
    setPercentageWatched(initialPercentage || 0)
  }, [initialPercentage, itemId])

  const mergeRanges = (ranges) => {
    if (ranges.length === 0) return []
    const sorted = [...ranges].sort((a, b) => a.start - b.start)
    const merged = [sorted[0]]

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1]
      if (sorted[i].start <= last.end) {
        last.end = Math.max(last.end, sorted[i].end)
      } else {
        merged.push(sorted[i])
      }
    }

    return merged
  }

  const calculateWatchedTime = (ranges) => {
    return ranges.reduce((sum, range) => sum + (range.end - range.start), 0)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && totalDuration > 0) {
      const currentTime = videoRef.current.currentTime
      const percentage = Math.min((currentTime / totalDuration) * 100, 100)
      setPercentageWatched(Math.max(percentage, initialPercentageRef.current).toFixed(2))
    }
  }

  const handleSeek = () => {
    const currentTime = videoRef.current?.currentTime || 0
    setWatchedRanges((prev) => mergeRanges([...prev, { start: currentTime, end: currentTime }]))
  }

  const handleLoadedMetadata = () => {
    const duration = videoRef.current?.duration || 0
    setTotalDuration(duration)

    if (initialPercentageRef.current > 0 && videoRef.current) {
      videoRef.current.currentTime = (initialPercentageRef.current / 100) * duration
    }
  }

  useEffect(() => {
    if (totalDuration > 0 && videoRef.current) {
      const watchedTime = videoRef.current.currentTime
      const percentage = Math.min((watchedTime / totalDuration) * 100, 100)
      setPercentageWatched(Math.max(percentage, initialPercentageRef.current).toFixed(2))
    }
  }, [totalDuration])

  useEffect(() => {
    if (totalDuration > 0) {
      const watchedTime = calculateWatchedTime(watchedRanges)
      const percentage = Math.min((watchedTime / totalDuration) * 100, 100)
      setPercentageWatched(Math.max(percentage, initialPercentageRef.current).toFixed(2))
    }
  }, [watchedRanges, totalDuration])

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   updatePercentage(percentageWatched, itemId )
    // }, 1000)

    const handleBeforeUnload = () =>{
      console.log("percentahe updated when the user reload the page")
      updatePercentage(percentageWatched , itemId)
    }


    if(videoRef.current){
      videoRef.current.addEventListener("pause" , handleBeforeUnload)
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
   
   

    return () => {
      
      if (videoRef.current) {
        videoRef.current.removeEventListener("pause", handleBeforeUnload);
      }
       window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [percentageWatched, updatePercentage, itemId])

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
  )
}

