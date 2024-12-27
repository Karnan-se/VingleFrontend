'use client'

import { Button } from '@nextui-org/react'
import { FileVideo, FileText } from 'lucide-react'

export function ContentTypeSelector({ onSelect }) {
  return (
    <div className="flex gap-4">
      <Button
        variant="bordered"
        className="flex items-center gap-2"
        onClick={() => onSelect('video')}
      >
        <FileVideo size={16} />
        Video Lesson
      </Button>



      
      <Button
        variant="bordered"
        className="flex items-center gap-2"
        onClick={() => onSelect('pdf')}
      >
        <FileText size={16} />
        PDF Resource
      </Button>
    </div>
  )
}

