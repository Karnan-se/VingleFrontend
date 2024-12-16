import { useFormik } from "formik";
import * as Yup from "yup";

import { userEmailVerification } from "../../features/api/Emailverification";
import { useNavigate } from "react-router-dom";


export default function ForgotPassword() {
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async(values) => {
      console.log(values.email);
     const response =await userEmailVerification(values)
     console.log(response)
     if(response){
      localStorage.setItem('otpTimer', 60);
        navigate("/forgotpassword/otp",  {state:{data:response.data}} ,{ replace: true })
     }
      
      
    },
  });

    return (
    <>
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
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-yellow-500"
                    }`}
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-yellow-400 px-4 py-3 text-center font-semibold text-black transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
