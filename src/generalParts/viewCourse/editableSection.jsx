

import { useState } from 'react'
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react'
import { Button, Input } from '@nextui-org/react'
import { ContentTypeSelector } from '../course/ContentTypeSelector'
// import { CurriculumItem } from './CurriculamItem'
import { CurriculumItem } from '../course/Curriculam'


export function Section({ section, onUpdate, onDelete, error, canAddContent }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showContentTypeSelector, setShowContentTypeSelector] = useState(false)

  const addItem = (type) => {
    const newItem = {
      _id: Math.random().toString(36).substr(2, 9),
      title: '',
      type,
      description: '',
      fileUrl: '',
    }
    onUpdate({
      ...section,
      items: [...section.items, newItem],
    })
    setShowContentTypeSelector(false)
  }

  const updateItem = (itemId, updatedItem) => {
    console.log(itemId ,  "hdhhdhd dh dh d h dh djh djh djh djh dhj ")
    onUpdate({
      ...section,
      items: section.items.map((item) =>
        item._id === itemId ? updatedItem : item
      ),
    })
  }

  const deleteItem = (itemId) => {
    onUpdate({
      ...section,
      items: section.items.filter((item) => item._id !== itemId),
    })
  }

  return (
    <>
   
   
    <div className="border rounded-lg p-4 bg-default-50">
      <div className="flex items-center gap-4 mb-4">
        <Button
          isIconOnly
          variant="light"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        <Input
          value={section.title}
          onChange={(e) => onUpdate({ ...section, title: e.target.value })}
          className="flex-1"
          placeholder="Section title"
          variant="bordered"
          isInvalid={error && !section.title}
          errorMessage={error && !section.title ? "Section title is required" : ""}
          color={error && !section.title ? "danger" : "default"}
        />
        <Button isIconOnly variant="light" onClick={onDelete}>
          <Trash2 className="w-4 h-4 text-danger" />
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4 ml-8">
          {section.items.map((item, index) => (
            <CurriculumItem
              key={index}
              item={item}
              onUpdate={(updatedItem) => updateItem(item._id, updatedItem)}
              onDelete={() => deleteItem(item._id)}
              error={error}
            />
          ))}

          {
            showContentTypeSelector ? (
              <ContentTypeSelector onSelect={addItem} />
            ) : (
              <Button
                variant="light"
                className="flex items-center gap-2"
                onClick={() => setShowContentTypeSelector(true)}
              >
                <Plus className="w-4 h-4" />
                Add Content
              </Button>
            )
          }
        </div>
      )}
    </div>
    </>
  )
}

