import React from "react";
import { useHistory } from "react-router-dom";
import Image from '../images/5135453_2673283.jpg'
const ErrorPage = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push("/"); // Redirect to the home page
  };

  return (
    <div className="bg-white w-full h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-white rounded-lg">
        {/* Image section */}
        <div className="flex justify-center mb-6 relative">
          <img
            src={Image} // Replace with the actual path to the image
            alt="No results found"
            className="w-[24rem] h-auto"
          />
          <div className="bg-white w-full h-12 absolute -bottom-4 right-0 z-40"></div>
        </div>

        {/* Title */}
        <h1 className="text-lg md:text-3xl font-bold text-red-600 ">
          No results found
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          We couldn't find what you searched for. Try something else.
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

export default ErrorPage;
