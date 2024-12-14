
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { setUserCredentials } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { userLogin } from '../../features/api/signInApi';
import { Button } from "@nextui-org/react"
import { GoogleLogin } from '@react-oauth/google';
import { userApi } from '../../axios/axiosInstance';






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

  const userInfo = useSelector((state)=>state.user.userInfo)
  useEffect(()=>{
    if(userInfo){
      navigate("/")
    }

  },[])

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      
      const tokenId = credentialResponse.credential;
      console.log(tokenId)


      const response = await userApi.post('/auth/google/verify', { token: tokenId });
      if (response.status === 200) {
        console.log("User authenticated:", response.data.data);
        dispatch(setUserCredentials(response.data.data))
        navigate("/")

      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In failed");
  };
  

  



  const handleSubmit = async (values) => {
   const response =  await userLogin(values);
   
   dispatch(setUserCredentials(response))
   navigate("/")

  };

  return (
    <div className="min-h-screen bg-white p-6 w-full">
      <div className="w-full mx-auto items-center">
        <div className="flex justify-around">
          <div className="mb-12">
            <h1 className="text-4xl font-normal mb-4">
              <span className="font-bold">V</span>ingle
            </h1>
            <p className="text-2xl">Hello. Sign in and let the learning begin!</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 w-120">
            <h2 className="text-2xl font-medium mb-4">Sign In</h2>
            <p className="text-sm mb-4">
              New to Vingle?{' '}
              <a href="/register" className="text-blue-500 hover:underline">
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
                    <a href="/forgotpassword" className="text-sm text-blue-500 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-black font-medium py-3 rounded-full mt-4 hover:bg-yellow-500 transition-colors"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>

            <div className="flex flex-col gap-4 w-full max-w-md my-12">
            <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />

      <Button
        className="w-full bg-white hover:bg-gray-50 text-black border-2 h-12 text-sm font-medium"
        variant="bordered"
        startContent={
          <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
            <path
              fill="#f25022"
              d="M0 0h11.5v11.5H0z"
            />
            <path
              fill="#00a4ef"
              d="M0 12.5h11.5V24H0z"
            />
            <path
              fill="#7fba00"
              d="M12.5 0H24v11.5H12.5z"
            />
            <path
              fill="#ffb900"
              d="M12.5 12.5H24V24H12.5z"
            />
          </svg>
        }
      >
        Sign in with Microsoft
      </Button>
    </div>






          </div>


          







        </div>


        







      </div>


      
  






    </div>
  );
}
