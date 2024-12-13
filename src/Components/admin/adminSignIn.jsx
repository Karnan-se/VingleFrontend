

import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setAdminCredentials } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { adminLogin } from '../../features/api/signInApi';



const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean(),
});

export default function LoginPage() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminInfo = useSelector((state)=>state.admin.adminInfo)
  useEffect(()=>{
    if(adminInfo){
      navigate("/admin/admindashboard")
    }

  },[])



  const handleSubmit = async (values) => {
   const response =  await adminLogin(values);
   console.log(response, "hello this is reposnse")
   dispatch(setAdminCredentials(response))
   navigate("/admin/admindashboard")

  };

  return (
    <div className="min-h-screen bg-white p-6 w-full">
      <div className="w-full mx-auto items-center">
        <div className="flex justify-around">
          <div className="mb-12">
            <h1 className="text-4xl font-normal mb-4">
              <span className="font-bold">V</span>ingle
            </h1>
            <p className="text-2xl">Hello. Let's build The Empire</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 w-120">
            <h2 className="text-2xl font-medium mb-4">Sign In</h2>
            <p className="text-sm mb-4">
              New to Vingle?{' '}
              <a href="admin/register" className="text-blue-500 hover:underline">
                Create a new account
              </a>
            </p>

            <Formik
              initialValues={{
                emailAddress: '',
                password: '',
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Email Address</label>
                    <Field
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      className={`w-full px-3 py-2 border ${
                        errors.emailAddress && touched.emailAddress
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    {errors.emailAddress && touched.emailAddress && (
                      <p className="text-red-600 text-sm">{errors.emailAddress}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Password</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={`w-full px-3 py-2 border ${
                        errors.password && touched.password
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-600 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <label className="inline-flex items-center text-sm">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="form-checkbox"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Remember my email address</span>
                    </label>
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-400 text-black font-medium py-3 rounded-full mt-4 hover:bg-blue-500 transition-colors"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
