import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="text-red-600 text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          Something went wrong during your transaction. Please try again.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;
