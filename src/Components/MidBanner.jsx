import React from "react"; // Import React to use JSX
import banner from "../assets/banner1.jpg"; // Import banner image
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for programmatic navigation

const MidBanner = () => {
  // Initialize navigation function
  const navigate = useNavigate();

  return (
    // Container for the mid-page banner section
    <div className="bg-gray-100 md:py-24">
      {/* Banner image container with fixed background, responsive height, and rounded corners on medium screens */}
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px]"
        style={{
          backgroundImage: `url(${banner})`, // Set banner image
          backgroundPosition: "center", // Center the image
          backgroundAttachment: "fixed", // Fixed background for parallax effect
        }}
      >
        {/* Overlay with semi-transparent black background to improve text readability */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center">
          {/* Centered text content */}
          <div className="text-center text-white px-4">
            {/* Banner heading */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Next-Gen Electronics at Your Fingertips
            </h1>
            {/* Banner subtext */}
            <p className="text-lg md:text-xl mb-6">
              Discover the latest tech innovations with unbeatable prices and
              free shipping on all orders.
            </p>
            {/* Shop Now button */}
            <button
              onClick={() => navigate("/Products")} // Navigate to Products page on click
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export MidBanner component for use in other pages
export default MidBanner;
