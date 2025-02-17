import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { ContentTypeSelector } from "../course/ContentTypeSelector";
import { CurriculumItem } from "./Curriculam";

export function Section({ section, setSection, updateSectionTitle, deleteSection ,  error}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showContentTypeSelector, setShowContentTypeSelector] = useState(false);







 

  const addItem = (type) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      type,
      description: "",
      fileUrl: "",
    };

    setSection(prevSections =>
      prevSections.map(sect =>
        sect.id === section.id ? { ...sect, items: [...sect.items, newItem] } : sect
      )
    );

    setShowContentTypeSelector(false);
  };

  const updateItem = (itemId, updatedItem) => {
    setSection(prevSections =>
      prevSections.map(sect =>
        sect.id === section.id
          ? { ...sect, items: sect.items.map(item => (item.id === itemId ? updatedItem : item)) }
          : sect
      )
    );
  };

  const deleteItem = (itemId) => {
    setSection(prevSections =>
      prevSections.map(sect =>
        sect.id === section.id
          ? { ...sect, items: sect.items.filter(item => item.id !== itemId) }
          : sect
      )
    );
  };

  



  return (
    <div className="flex w-full justify-around"> 
      <div className="border rounded-lg p-4 bg-default-50 w-1/2">
        <div className="flex items-center gap-4 mb-4">
          <Button isIconOnly variant="light" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
          <Input
            value={section.title}
            onChange={(e)=>updateSectionTitle(e, section.id)}
            className="flex-1"
            placeholder="Section title"
            variant="bordered"
          />
          {error?.title && <p className="text-sm text-danger mt-1">{error.title}</p>}
          <Button isIconOnly variant="light" onClick={(e)=>deleteSection(e, section.id)}>
            <Trash2 className="w-4 h-4 text-danger" />
          </Button>
        </div>

        {isExpanded && section.items && (
          <div className="space-y-4 ml-8">
            {section.items.map((item) => (
              <CurriculumItem
                key={item.id}
                item={item}
                onUpdate={(updatedItem) => updateItem(item.id, updatedItem)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}

            {showContentTypeSelector ? (
              <ContentTypeSelector onSelect={addItem} />
            ) : (
              <Button
                variant="light"
                className="flex items-center gap-2"
                onClick={() => setShowContentTypeSelector(true)}
              >
                <Plus className="w-4 h-4" />
                Add Lessons
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
