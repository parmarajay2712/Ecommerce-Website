import React, { useContext, useEffect } from "react"; // Importing React and hooks
import { DataContext } from "../Context/DataContext"; // Importing the DataContext for global state
import "slick-carousel/slick/slick.css"; // Slick carousel core CSS
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme CSS
import Slider from "react-slick"; // React wrapper for Slick carousel
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"; // Importing arrow icons
import Category from "./Category"; // Category component to display below carousel
import { useNavigate } from "react-router-dom"; // useNavigate hook for navigation

const Carousel = () => {
  // Extract data from context
  const { data } = useContext(DataContext);
  const navigate = useNavigate(); // Initialize navigate function for programmatic routing

  // Debug: log carousel data whenever it changes
  useEffect(() => {
    console.log("✅ Carousel data:", data);
  }, [data]);

  // Custom previous arrow component for the carousel
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props; // Destructure props from Slider
    return (
      <div
        className={`arrow ${className}`} // Add default slick arrow class
        style={{ zIndex: 3 }} // Ensure arrow appears above slides
        onClick={onClick} // Trigger Slick's slide change
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style, // Merge default styles from Slick
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px", // Position left arrow
          }}
        />
      </div>
    );
  };

  // Custom next arrow component for the carousel
  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
        onClick={onClick}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px", // Position right arrow
          }}
        />
      </div>
    );
  };

  // Slider settings for react-slick
  const settings = {
    dots: false, // Hide navigation dots
    PauseOnHover: false, // Slider will not pause on hover
    infinite: true, // Infinite loop
    speed: 500, // Animation speed in ms
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // 2 seconds per slide
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom prev arrow
  };

  // Handle different data shapes: data.products or data.data
  const items = Array.isArray(data?.products)
    ? data.products.slice(0, 7) // Limit to 7 items
    : Array.isArray(data?.data)
    ? data.data.slice(0, 7)
    : []; // Fallback to empty array if no data

  return (
    <div className="w-full">
      {/* Show loading message if no items are present */}
      {!items.length && (
        <p className="text-white text-center py-10">Loading products...</p>
      )}

      {/* Render carousel only if items exist */}
      {!!items.length && (
        <Slider {...settings}>
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-linear-to-r  from-[#0f0c29] via-[#302b63] to-[#24243e]" // Gradient background
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-[600px] px-4 my-20 md:my-0">
                {/* Left side: Text content */}
                <div className="md:space-y-6 space-y-3">
                  <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wide">
                    Powering Your World With The Best in Electronics
                  </h3>
                  <h1 className="text-white text-xl md:text-4xl uppercase font-bold md:line-clamp-3 line-clamp-2">
                    {item.title} {/* Dynamic title */}
                  </h1>
                  <p className="text-gray-400 line-clamp-3">
                    {item.description} {/* Dynamic description */}
                  </p>
                  {/* Shop Now button redirects to Products page */}
                  <button
                    onClick={() => navigate("/Products")}
                    className="bg-linear-to-r from-red-500 to-purple-500 text-white px-5 py-2 rounded-md mt-2 hover:opacity-90 transition"
                  >
                    Shop Now
                  </button>
                </div>

                {/* Right side: Product image */}
                <div className="flex justify-center">
                  <img
                    src={item.thumbnail || item.image} // Use thumbnail first, fallback to image
                    alt={item.title}
                    className="w-[350px] h-[350px] hover:scale-105 transition-all shadow-2xl shadow-red-400 object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {/* Category component rendered below the carousel */}
      <Category />
    </div>
  );
};

// Exporting Carousel component
export default Carousel;
