'use client'

import { useState } from 'react'
import { Trash2, GripVertical, FileVideo, FileText } from 'lucide-react'
import { Button, Input, Switch, Textarea } from '@nextui-org/react'

export function CurriculumItem({ item, onUpdate, onDelete, error }) {
  const [isExpanded, setIsExpanded] = useState(false)

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
          className="flex-1"
          placeholder="Lesson title"
          variant="bordered"
          isInvalid={error && !item.title}
          errorMessage={error && !item.title ? "Lesson title is required" : ""}
          color={error && !item.title ? "danger" : "default"}
        />
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
              isInvalid={error && !item.description}
              errorMessage={error && !item.description ? "Description is required" : ""}
              color={error && !item.description ? "danger" : "default"}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm">Content File</p>

            
            <Input
              type="file"
              accept={item.type === 'video' ? 'video/*' : 'application/pdf'}
              onChange={(e) =>
                onUpdate({
                  ...item,
                  fileUrl: e.target.files?.[0]
                    ? (e.target.files[0])
                    : undefined,
                })
              }
              variant="bordered"
              isInvalid={error && !item.fileUrl}
              errorMessage={error && !item.fileUrl ? "Content file is required" : ""}
              color={error && !item.fileUrl ? "danger" : "default"}
            />
          </div>
          <div className="flex items-center space-x-2">
          
          </div>
        </div>
      )}
    </div>
  )
}

