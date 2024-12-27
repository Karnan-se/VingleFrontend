'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@nextui-org/react'
import { Section } from './section'

export function CourseCreator() {
  const [course, setCourse] = useState({ sections: [] })
  const [validationErrors, setValidationErrors] = useState({})

  const addSection = () => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      items: [],
    }
    setCourse({ sections: [...course.sections, newSection] })
  }

  const updateSection = (sectionId, updatedSection) => {
    setCourse({
      sections: course.sections.map((section) =>
        section.id === sectionId ? updatedSection : section
      ),
    })
  }

  const deleteSection = (sectionId) => {
    setCourse({
      sections: course.sections.filter((section) => section.id !== sectionId),
    })
  }

  const getTotalStats = () => {
    const totalSections = course.sections.length
    const totalLectures = course.sections.reduce(
      (acc, section) => acc + section.items.length,
      0
    )
    return { totalSections, totalLectures }
  }

  const validateCourse = () => {
    const errors = {}
    course.sections.forEach((section, sectionIndex) => {
      if (!section.title.trim()) {
        errors[`section_${sectionIndex}`] = true
      }
      section.items.forEach((item, itemIndex) => {
        if (!item.title.trim() || !item.description.trim() || !item.fileUrl) {
          errors[`item_${sectionIndex}_${itemIndex}`] = true
        }
      })
    })
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveCourse = () => {
    if (validateCourse()) {
      console.log('Course saved:', course)
      
    } else {
      swal({
        icon:"error",
        text:"some field are empty",
        title:"validation Error"
      })
      
    }
  }

  const { totalSections, totalLectures } = getTotalStats()

  const canAddNewSection = course.sections.every(section => 
    section.title.trim() !== '' && 
    section.items.every(item => 
      item.title.trim() !== '' && 
      item.description.trim() !== '' && 
      item.fileUrl !== ''
    )
  )

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Course Content</h1>
          <p className="text-default-500">
            {totalSections} sections • {totalLectures} lectures
          </p>
        </div>
        {course.sections.length > 0 && ( 
        <Button
          color="primary"
          onClick={handleSaveCourse}
          className="flex items-center gap-2 border hover:bg-green-50"
        >
          Save Course
        </Button>
        )}
      </div>

      <div className="space-y-4">
        {course.sections.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            onUpdate={(updatedSection) => updateSection(section.id, updatedSection)}
            onDelete={() => deleteSection(section.id)}
            error={!!validationErrors[`section_${index}`] || section.items.some((_, itemIndex) => !!validationErrors[`item_${index}_${itemIndex}`])}
            canAddContent={
              section.title.trim() !== '' &&
              section.items.every(item => 
                item.title.trim() !== '' && 
                item.description.trim() !== '' && 
                item.fileUrl !== ''
              )
            }
          />
        ))}

        {canAddNewSection && (
          <Button
            color="primary"
            onClick={addSection}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4 border" />
            Add Section
          </Button>
        )}

        {course.sections.length === 0 && (
          <div className="text-center py-12 bg-default-50 rounded-lg">
            <p className="text-default-500 mb-4">No sections added yet</p>
            <Button
              color="primary"
              onClick={addSection}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Section
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

