import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get('reference');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 mx-auto" size={60} />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">
          "Thank you for choosing us! Your car rental booking has been confirmed successfully."
        </p>

        <div className="bg-gray-100 text-gray-700 rounded-md px-4 py-2 mt-6 text-sm">
          <span className="font-medium">Payment Reference:</span>
          <br />
          {reference || 'N/A'}
        </div>

        <Link
          to="/"
          className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
