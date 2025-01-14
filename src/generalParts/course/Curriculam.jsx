

import { useState } from 'react'
import { Trash2, GripVertical, FileVideo, FileText } from 'lucide-react'
import { Button, Input, Switch, Textarea } from '@nextui-org/react'
import VideoPlayer from '../viewCourse/VideoPlayer'

export function CurriculumItem({ item, onUpdate, onDelete, error }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [video , setVideo] = useState()


   const saveVideo =(e)=>{
    onUpdate({
      ...item,
      fileUrl: e.target.files?.[0]
        ? (e.target.files[0])
        : undefined,
    })
    setVideo(URL.createObjectURL(e.target.files[0]))
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
      
        <Input
          value={item.duration}
          onChange={(e) => onUpdate({ ...item, duration: e.target.value })}
          className="w-24"
          placeholder="Duration"
          variant="bordered"
        />
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
          <div className="space-y-2">
            <p className="text-sm">Content File</p>

            {item.fileUrl ? (<>
            <div className='w-120'>
            <VideoPlayer fileUrl={video? video : item.fileUrl || ""} />

            </div>
            </>):("")}
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

