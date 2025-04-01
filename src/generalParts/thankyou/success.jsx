
import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Snowflake as Confetti } from 'lucide-react';
import {useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { verifyPayment } from '../../features/api/verifypayment';
import { useNavigate } from 'react-router-dom';


const ThankYouPage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('');
  const sessionId = searchParams.get('session_id');
  const userInfo = useSelector((state)=> state.user.userInfo)
  const navigate = useNavigate()

  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    if(sessionId){
        
       try {
        const paymentUpdate =async()=>{
          const paymentVerify = await verifyPayment(userInfo, sessionId);
          console.log(paymentVerify)
          setLoading(false)
        }
        paymentUpdate();
        
       } catch (error) {
        console.log(error)

       } finally {

        setLoading(false)
       }
        
    }else{
        console.log("no sessionId")
    }
  },[userInfo , sessionId])

  useEffect(() => {
    setTimeout(() => setShowConfetti(true), 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/20">
        <div className="text-center">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 animate-bounce" />
          <h1 className="mt-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-red-600">
            Thank You!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your payment was successful.
          </p>
          <button
            className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-medium rounded-full shadow hover:from-blue-600 hover:to-purple-600 flex items-center justify-center transition-all"
            onClick={() => (navigate("/"))}
          disabled={isLoading}>
            Go to Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, index) => (
            <Confetti
              key={index}
              className="absolute text-yellow-400 w-6 h-6 animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                top: `-5vh`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti-fall 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage;
