export const validateSectionData = (setErrors, sectionData) => {
  console.log(sectionData, "Section Data from validation");

  const newErrors = sectionData.map((section, sectionIndex) => {
    const sectionErrors = { title: "", items: [] };

  
    if (!section.title || section.title.trim().length == 0) {
      sectionErrors.title = "Section title is required.";
    }

    
    if (section.items && Array.isArray(section.items)) {
      sectionErrors.items = section.items.map((item, itemIndex) => {
        const itemErrors = { title: "", description: "" };

    
        if (!item.title || item.title.trim().length == 0) {
          itemErrors.title = "Item title is required.";
        }

      
        if (!item.description || item.description.trim().length == 0) {
          itemErrors.description = "Item description is required.";
        }

        return itemErrors;
      });
    } else {
      sectionErrors.items = "Section items must be an array.";
    }

    return sectionErrors;
  });

  console.log(newErrors, "Generated Errors");
  setErrors(newErrors);
};
