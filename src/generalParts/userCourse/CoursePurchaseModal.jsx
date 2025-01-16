import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { XIcon } from 'lucide-react';
import { confirmPayment } from '../../features/api/confirmPayment';

const CoursePurchaseModal = ({ course, isOpen, onClose, onPurchase }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit clciked")

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true)
    setPaymentError(null);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,

      });

      if (error) {
        setPaymentError(error.message || 'An error occurred');
        setIsProcessing(false);
      } else {
        console.log(paymentMethod)
       const paymentDetail = await confirmPayment(paymentMethod.id, course._id , course.price , course.name)
       if(paymentDetail){
        console.log(paymentDetail)
        
       }

        
     
          onPurchase(course._id);
          setIsProcessing(false);
          onClose();
       
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="relative">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.name} className="w-full h-48 object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{course.name}</h2>
          <p className="text-gray-600 mb-4">by {course.tutorName}</p>
          <div className="text-3xl font-bold mb-6">₹{course.price}</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
                Card details
              </label>
              <div className="border border-gray-300 rounded-md p-3 bg-white shadow-sm">
                <CardElement 
                  id="card-element"
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>
            {paymentError && (
              <div className="text-red-500 text-sm mb-4">{paymentError}</div>
            )}
            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className={`w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded 
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${course.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursePurchaseModal;
