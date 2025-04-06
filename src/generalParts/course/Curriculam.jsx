

import { useState } from 'react'
import { Trash2, GripVertical, FileVideo, FileText } from 'lucide-react'
import { Button, Input, Switch, Textarea } from '@nextui-org/react'
// import VideoPlayer from '../viewCourse/VideoPlayer'
import VideoPlayer1 from '../viewCourse/VideoPlayerEditCourse'

export function CurriculumItem({ item, onUpdate, onDelete, error }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [video , setVideo] = useState()
  const [pdfData , setPdfData] = useState()





   const saveVideo =(e)=>{
    if(e.target.files?.[0]?.type == 'video/mp4') {

    onUpdate({
      ...item,
      fileUrl: e.target.files?.[0]
        ? (e.target.files[0])
        : undefined,
    })
    setVideo(URL.createObjectURL(e.target.files[0]))
    setPdfData(undefined)
   }else{
    onUpdate({
      ...item,
      fileUrl: e.target.files?.[0]
        ? (e.target.files[0])
        : undefined,
    })
    setPdfData(URL.createObjectURL(e.target.files[0]))
    setVideo(undefined)
   }
  }

   const updateDuration =(duration) =>{
    onUpdate({
      ...item,
      duration: duration,
    })
   }
   


  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center gap-4">
        <GripVertical className="w-5 h-5 text-default-400 cursor-move" />
        {item.type === 'video' ? (
          <FileVideo className="w-5 h-5 text-primary" />
        ) : (
          <FileText className="w-5 h-5 text-success" />
        )}
        
        <Input
          value={item.title}
          onChange={(e) => onUpdate({ ...item, title: e.target.value })}
          className="flex-1 border"
          placeholder="Lesson title"
          variant="bordered"
          color={error && error.title ? "danger" : "default"}
        />
        <div>
        {error?.title && (
        <p className="text-sm text-danger mt-1">{error.title}</p>
      )}

        </div>
      
        <Button
          isIconOnly
          variant="light"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '-' : '+'}
        </Button>
        <Button isIconOnly variant="light" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-danger" />
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm">Description</p>
            <Textarea
              value={item.description}
              onChange={(e) =>
                onUpdate({ ...item, description: e.target.value })
              }
              placeholder="Enter lesson description..."
              variant="bordered"
            />
             {error?.description && (
            <p className="text-sm text-danger mt-1">{error.description}</p>
      )}
          </div>
          <div className="space-y-2 ">
            <p className="text-sm">Content File</p>

            {item.type == "video" ? (<>
            <div className='w-full'>
            <VideoPlayer1 fileUrl={video? video : item.fileUrl || ""} updateDuration={updateDuration} />

            </div>
            </>):(<div className='w-full h-60 bg-red-50'><iframe src={pdfData ? pdfData : item.fileUrl} frameborder="0" className='object-cover w-full h-full'></iframe></div>)}


            <Input
              type="file"
              
              accept={item.type === 'video' ? 'video/*' : 'application/pdf'}
              onChange={saveVideo}
              variant="bordered"
             
            />
            {error?.fileUrl && (
            <p className="text-sm text-danger mt-1">{error.fileUrl}</p> )}
            
          </div>
          <div className="flex items-center space-x-2">
          
          </div>
        </div>
      )}
    </div>
  )
}

