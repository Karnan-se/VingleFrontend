import { Button, Input } from "@nextui-org/react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { ContentTypeSelector } from "../course/ContentTypeSelector";
import { CurriculumItem } from "./Curriculam";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            className="p-2 rounded-full bg-transparent"
            onClick={() =>
              setFieldValue("sections", (prev) =>
                prev.filter((_, i) => i !== sectionIndex)
              )
            }
          >
            <Trash2 className="w-4 h-4 text-danger" />
          </motion.button>
        </motion.div>
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
          variant="ghost"
          color="secondary"
          className="border mt-2 shadow-sm hover:shadow-md bg-yellow-100 hover:bg-yellow-200"
          onClick={() => setShowContentTypeSelector(true)}
        >
          <Plus className="w-4 h-4" />
          Add Lessons
        </Button>
      )}
    </div>
  );
}
