import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


export default function CreatePassword({changePassword}) {



  console.log(changePassword, "changepassword")
  const validationSchema = Yup.object({
    password1: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      )
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const initialValues = {
    password1: "",
    password2: "",
  };

  const handleSubmit = async (values) => {
    console.log(values, "it is need tio be submitetd")
     await changePassword(values)

  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="mt-8 grid md:grid-cols-2 gap-12 items-start">
          <div className="mb-12">
            <h1 className="text-4xl font-normal mb-4">
              <span className="font-bold">V</span>ingle
            </h1>
            <p className="text-2xl">Hello. Your OTP has been sent to your E-mail</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg border p-8">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="mb-6">
                    <label
                      htmlFor="password1"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <Field
                      id="password1"
                      name="password1"
                      type="password"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        touched.password1 && errors.password1
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Enter your password"
                    />
                    <ErrorMessage
                      name="password1"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password2"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <Field
                      id="password2"
                      name="password2"
                      type="password"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        touched.password2 && errors.password2
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage
                      name="password2"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Submit
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
