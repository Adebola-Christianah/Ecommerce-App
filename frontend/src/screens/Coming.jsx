import React from "react";
import { useHistory } from "react-router-dom";
import Image from '../images/5135453_2673283.jpg'
const ComingSoon = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push("/"); // Redirect to the home page
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-200 via-pink-100 to-yellow-100">
      <div className="relative text-center">
        {/* Coming text */}
        <h1 className="text-4xl font-bold relative z-30 tracking-widest text-red-500">Still Cooking</h1>

        {/* Circle with gradient */}
        {/* <div className="absolute z-10 right-[-50px] top-0 w-64 h-64 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-full"></div> */}
        <p className="text-gray-600 mb-6">
        This feature will be available soon, stay tuned!
        </p>

        {/* Button */}
        <button
          onClick={handleGoHome}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
