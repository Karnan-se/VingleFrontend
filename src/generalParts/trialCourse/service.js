import * as Yup from 'yup';

export const ValidateSchema ={
    validationCourseForm: Yup.object({
        name: Yup.string().trim().required('Course name is required'),
        description: Yup.string().trim().required('Description is required'),
        category: Yup.string().required('Category is required'),
        price: Yup.number().positive('Price must be positive').required('Price is required'),
        learningObjectives: Yup.array()
          .of(Yup.string().trim().required('Learning objective cannot be empty'))
          .min(1, 'At least one learning objective is required'),
        thumbnail: Yup.mixed()
          .required('Thumbnail is required')
          .test('fileType', 'Only image files are allowed', (value) => {
            return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
          })
          .test('fileSize', 'File size must be less than 5MB', (value) => {
            return value && value.size <= 5 * 1024 * 1024;
          }),
      }),
    
}



export const validationSchema = Yup.object({
  sections: Yup.array().of(
    Yup.object({
      title: Yup.string()
        .trim()
        .required("Section title is required"),
      items: Yup.array().of(
        Yup.object({
          title: Yup.string()
            .trim()
            .required("Lesson title is required"),
          description: Yup.string()
            .trim()
            .required("Lesson description is required"),
          fileUrl: Yup.mixed().required("File is required"),
        })
      ),
    })
  ),
});


const initialErrors = {
  sections: [
    {
      title: "Section title is required",
      items: [
        {
          title: "Lesson title is required",
          description: "Lesson description is required",
          fileUrl: "File is required",
        },
      ],
    },
  ],
};


export const secondFromIntialErrors = initialErrors


export const initialValues={
    name: '',
    description: '',
    category: '',
    price: '',
    learningObjectives: [],
    thumbnail: null,
}