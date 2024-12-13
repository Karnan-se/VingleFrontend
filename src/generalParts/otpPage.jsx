import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { userApi } from '../axios/axiosInstance'

export default function OTPVerification({LoginRoute}) {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate("")

  const [timer, setTimer] = useState(()=>{
    const savedTimer = localStorage.getItem("otpTimer");
    return savedTimer ? parseInt(savedTimer, 10) : 60;
  })
  const location = useLocation();
  const data = location.state?.data

  

  useEffect(()=>{
    const interval = setInterval(()=>{
       setTimer((preTimer)=> {
        const newTimer = preTimer > 0? preTimer -1 : 0;
        localStorage.setItem('otpTimer', newTimer);
        return newTimer;
       })
    }, 1000)

    return ()=> clearInterval(interval)

  },[])

  const resendOTp = ()=>{
    console.log("called")
    localStorage.setItem('otpTimer', "60");
    setTimer(60)
    const userInfo=localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo") ) : ""
   const email = userInfo.emailAddress
   console.log(email, "email")
   console.log(data.emailAddress , "emailAdress")
    
    userApi.post("/resendOTP",{email})
  }



  const handleSubmit = async(e) => {
    e.preventDefault(); 
    console.log("submitted")
    const userInfo=localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo") ) : ""
    const payload = {userDetails:userInfo, otp }
  try {
    const verifyUser  = await userApi.post("/verifyUser", {payload}).then((data)=>{
      console.log(data)
      console.log(data.data.data.isVerfied)
      if(data.data.data.isVerfied == true){
        navigate("/", {replace:true})
       
      }
      console.log(data, "verified")
    })
    
  } catch (error) {
    console.log(error)
    
  }
  

    
    console.log('OTP submitted:', otp)
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="#" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <div className="mt-8 grid md:grid-cols-2 gap-12 items-start">
          
        <div className="mb-12">
            <h1 className="text-4xl font-normal mb-4">
              <span className="font-bold">V</span>ingle
            </h1>
            <p className="text-2xl">Hello. Your otp has been send to your E-mail</p>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg border p-8">
            <Link 
              href={LoginRoute} 
              className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
            >
              Back to Sign In
            </Link>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">OTP</h3>
              <p className="text-gray-600">
                Please enter your OTP that send on your E-mail address.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label 
                  htmlFor="otp" 
                  className=" text-sm font-medium text-gray-700 mb-2 flex">OTP 
                   <div className={`px-60 flex flex-row ${timer === 0 ? 'text-red-400' : ''}`}>
                    {timer === 0 ? (
                        <span className="flex px-5">Expired</span>
                    ) : (
                        <>
                        Expires_on
                        <span className="flex px-5">{timer}</span>
                        </>
                    )}
                    </div>
 
                     
                </label>
             
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your OTP"
                  required
                />
              </div>
                {timer ==0?(
                     <button type="button"className="w-full bg-red-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-colors" onClick={resendOTp}> Resend OTP</button>
                     
                ):(
                    <button type="button"className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-colors" onClick={handleSubmit} > Submit</button>
                   
                ) } 
             
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

