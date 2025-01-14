import { Input, Button, Card } from "@nextui-org/react";
import PhoneInput from "react-phone-number-input";
// import { userUpdate } from "../../features/api/updateApi";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";


export default function ProfileMain({}){
  const {userUpdate , userDetail, setUserCredentials } = useOutletContext()
   
    const dispatch = useDispatch()
    const emailAddress = userDetail.emailAddress
  




    const formik = useFormik({
        initialValues: {
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          twitter: userDetail.twitter,
          phoneNumber: userDetail.phoneNumber,
          linkedin: "",
        },
    
        validationSchema: Yup.object({
          firstName: Yup.string()
            .required('First name is required')
            .matches(/^[A-Za-z\s]+$/, 'First name should not contain numbers')
            .test(
              'not-empty-space',
              'Only empty space is not valid',
              (value) => value?.trim().length > 0
            ),
        
          lastName: Yup.string()
            .required('Last name is required')
            .matches(/^[A-Za-z\s]+$/, 'Last name should not contain numbers')
            .test(
              'not-empty-space',
              'Only empty space is not valid',
              (value) => value?.trim().length > 0
            ),
        
          phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[+]?\d{10,15}$/, 'Enter a valid phone number')
            .test(
              'not-empty-space',
              'Only empty space is not valid',
              (value) => value?.trim().length > 0
            ),
        
          twitter: Yup.string()
            .url('Invalid URL format')
            .matches(
              /^https?:\/\/(www\.)?(x|twitter)\.com\/[a-zA-Z0-9_]{1,15}$/,
              'Enter a valid Twitter URL'
            ),
          linkedin: Yup.string()
            .url('Invalid URL format')
            .matches(
              /^https?:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9\-_\/]+$/,
              'Enter a valid LinkedIn URL'
            )
           
        }),
        
        
    
        onSubmit: async (values) => {
          
         
          const submittedData = { ...values, emailAddress };
          console.log(submittedData, "Submitted Data")
          const response =  await userUpdate(submittedData)
         
          console.log(response, "..... response")
          if(response){
            swal({
              icon:"Success",
              text:"updated"
            })
            dispatch(setUserCredentials(response))
            
          }
    
        },
      });



    return(
        <>
        
        <div className="flex-1">
            <Card className="p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1">Public Profile</h1>
                <p className="text-gray-500 text-sm">Add Information About yourself</p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Basics</h2>
                  <div className="space-y-3">
                    <Input
                      name="firstName"
                      value={formik.values.firstName}
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="bordered"
                      classNames={{
                        input: "bg-transparent",
                        inputWrapper: "bg-transparent border-1 border-gray-200",
                      }}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                    )}
                    <Input
                      name="lastName"
                      value={formik.values.lastName}
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="bordered"
                      classNames={{
                        input: "bg-transparent",
                        inputWrapper: "bg-transparent border-1 border-gray-200",
                      }}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                    )}

                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="US"
                    value={formik.values.phoneNumber}
                    onChange={(value) => formik.setFieldValue('phoneNumber', value)}
                    className="border-1 border-gray-200 w-full p-2 rounded"
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
                  )}


                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Links</h2>
                  <div className="space-y-3">
                    <Input
                      name="twitter"
                      placeholder="http://twitter.com/"
                      value={formik.values.twitter}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="bordered"
                      classNames={{
                        input: "bg-transparent",
                        inputWrapper: "bg-transparent border-1 border-gray-200",
                      }}
                    />
                    {formik.touched.twitter && formik.errors.twitter && (
                      <p className="text-red-500 text-sm">{formik.errors.twitter}</p>
                    )}
                    <Input
                      name="linkedin"
                      placeholder="http://www.linkedin.com/"
                      value={formik.values.linkedin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      variant="bordered"
                      classNames={{
                        input: "bg-transparent",
                        inputWrapper: "bg-transparent border-1 border-gray-200",
                      }}
                    />
                    {formik.touched.linkedin && formik.errors.linkedin && (

                    
                      <p className="text-red-500 text-sm">{formik.errors.linkedin}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="bg-gray-200 text-gray-700 px-6 hover:bg-slate-400 hover:text-black hover:drop-shadow-lg"
                    radius="sm"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </>
    )
}