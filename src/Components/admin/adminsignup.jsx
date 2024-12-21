import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitAdminDetail } from '../../features/api/registerApi';
import { useNavigate } from 'react-router-dom';
import { setAdminCredentials } from '../../features/authSlice';
import { useDispatch } from 'react-redux';




const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'First name can only contain letters')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Last name can only contain letters')
    .required('Last name is required'),
  country: Yup.string()
    .required('Country is required')
});

function RegistrationForm() {

const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    try {
      submitAdminDetail(values).then((data)=>{
        console.log(data)
        navigate("/admin")
        dispatch(setAdminCredentials(data))
        

      }).catch((error)=>{
        console.log(error)
      })
      
    } catch (error) {
      console.log(error)
    
      
    }

  }

  return (
    <div className="min-h-screen bg-white p-6 w-full">
      <div className="w-full mx-auto items-center">
        <div className="flex justify-around">
          <div className="mb-12">
            <h1 className="text-4xl font-normal mb-4">
              <span className="font-bold">V</span>ingle
            </h1>
            <p className="text-2xl">Hello. Admin</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 w-120">
            <h2 className="text-2xl font-medium mb-4">Register Your Account</h2>

            <Formik
              initialValues={{
                emailAddress: '',
                password: '',
                firstName: '',
                lastName: '',
                country: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ touched, errors, isValid, dirty }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Email address</label>
                    <Field
                      type="email"
                      name="emailAddress"
                      className={`w-full px-3 py-2 border ${
                        touched.emailAddress && errors.emailAddress ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    <ErrorMessage
                      name="emailAddress"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className={`w-full px-3 py-2 border ${
                        touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <Field
                      type="text"
                      name="firstName"
                      className={`w-full px-3 py-2 border ${
                        touched.firstName && errors.firstName
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <Field
                      type="text"
                      name="lastName"
                      className={`w-full px-3 py-2 border ${
                        touched.lastName && errors.lastName
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Country</label>
                    <Field
                      as="select"
                      name="country"
                      className={`w-full px-3 py-2 border ${
                        touched.country && errors.country
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200`}
                    >
                      <option value="">Select Country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="in">India</option>
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-yellow-400 text-black font-medium py-3 rounded-full mt-4 ${
                      !(dirty && isValid) && 'cursor-not-allowed opacity-50'
                    } hover:bg-yellow-500 transition-colors`}
                    disabled={!(dirty && isValid)}
                  >
                    Create Account
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

export default RegistrationForm;
