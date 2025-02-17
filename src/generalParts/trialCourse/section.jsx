import { Button, Input } from "@nextui-org/react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { ContentTypeSelector } from "../course/ContentTypeSelector";
import { CurriculumItem } from "./Curriculam";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";

export function Section({ section, sectionIndex, setFieldValue, errors }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showContentTypeSelector, setShowContentTypeSelector] = useState(false);

  const addItem = (type) => {
    const newItem = {
      id: Date.now(),
      title: "",
      type,
      description: "",
      fileUrl: "",
    };

    setFieldValue(`sections[${sectionIndex}].items`, [
      ...section.items,
      newItem,
    ]);
    setShowContentTypeSelector(false);
  };

  const deleteItem = (itemId) => {
    setFieldValue(
      `sections[${sectionIndex}].items`,
      section.items.filter((item) => item.id !== itemId)
    );
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center gap-4">
        <Button isIconOnly variant="light"  onClick={() => setIsExpanded(!isExpanded)}>

          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>

        <Field
          name={`sections[${sectionIndex}].title`}
          as={Input}
          placeholder="Section title"
        />
        <ErrorMessage
          name={`sections[${sectionIndex}].title`}
          component="p"
          className="text-danger "
        />

        <Button
          isIconOnly
          variant="light"
          onClick={() =>
            setFieldValue("sections", (prev) =>
              prev.filter((_, i) => i !== sectionIndex)
            )
          }
        >
          <Trash2 className="w-4 h-4 text-danger" />
        </Button>
      </div>

      {isExpanded &&
        section.items.map((item, itemIndex) => (
          <CurriculumItem
            key={item.id}
            item={item}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            setFieldValue={setFieldValue}
            errors={errors?.items?.[itemIndex]}
            deleteItem={deleteItem}
          />
        ))}

      {showContentTypeSelector ? (
        <ContentTypeSelector onSelect={addItem} />
      ) : (
        <Button
          variant="light"
          onClick={() => setShowContentTypeSelector(true)}
        >
          <Plus className="w-4 h-4" />
          Add Lessons
        </Button>
      )}
    </div>
  );
}
