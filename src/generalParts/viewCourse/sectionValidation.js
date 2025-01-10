export const sectionValidation = (setNewError, newSection) => {
    console.log(newSection, "New Section Data from validation");
  
    const newError = { title: "", items: [] };
  
    
    if (!newSection.title || newSection.title.trim().length === 0) {
      newError.title = "Section title is required.";
    }
 
    if (newSection.items && Array.isArray(newSection.items)) {
      newError.items = newSection.items.map((item, itemIndex) => {
        const itemErrors = { title: "", type: "", duration: "", description: "" };
  
        
        if (!item.title || item.title.trim().length === 0) {
          itemErrors.title = "Item title is required.";
        }
  
      
        if (!item.type || item.type.trim().length === 0) {
          itemErrors.type = "Item type is required.";
        }
  

        if (!item.duration || item.duration.trim().length === 0) {
          itemErrors.duration = "Item duration is required.";
        }
 
        if (!item.description || item.description.trim().length === 0) {
          itemErrors.description = "Item description is required.";
        }
  
        return itemErrors;
      });
    } else {
      newError.items = "Section items must be an array.";
    }
  
    console.log(newError, "Generated Errors for New Section");
    setNewError(newError);
  };
  