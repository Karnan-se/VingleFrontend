export function createformData(courseData){
    const formData = new FormData();

formData.append('name', courseData.name);           
formData.append('description', courseData.description); 
formData.append('category', courseData.category);   
formData.append('price', courseData.price);         
formData.append('tutorId', courseData.tutorId);      
if (courseData.thumbnail) {
  formData.append('thumbnail', courseData.thumbnail);  
}

// if (courseData.fileUrl) {
//   formData.append('fileUrl', courseData.fileUrl);     
// }

formData.append('learningObjectives', JSON.stringify(courseData.learningObjectives)); 

courseData.sections.forEach((section, index) => {
  formData.append(`sections[${index}].id`, section.id); 
  formData.append(`sections[${index}].title`, section.title || "hh"); 
  
  section.items.forEach((item, itemIndex) => {
    
    if (item.fileUrl) {
      formData.append(`fileUrl`, item.fileUrl); 
    }
    formData.append(`sections[${index}].items[${itemIndex}][description]`, item.description); 
    formData.append(`sections[${index}].items[${itemIndex}][duration]`, item.duration); 
    formData.append(`sections[${index}].items[${itemIndex}][title]`, item.title); 
    formData.append(`sections[${index}].items[${itemIndex}][type]`, item.type); 
  });
});


return formData




}