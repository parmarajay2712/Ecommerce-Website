// Importing React library to use JSX and create React components
import React from "react";

// Importing reusable components for the Home page
import Carousel from "../Components/Carousel"; // Top hero carousel/banner slider
import MidBanner from "../Components/MidBanner"; // Middle promotional banner
import Features from "../Components/Features"; // Section highlighting key features of the site

// Define the functional component Home
const Home = () => {
  return (
    // Wrapper div to contain the entire Home page content
    // overflow-x-hidden prevents horizontal scrolling caused by overflowing elements
    <div className="overflow-x-hidden">
      {/* Hero section carousel */}
      <Carousel />

      {/* Middle promotional banner */}
      <MidBanner />

      {/* Features section displaying key offerings */}
      <Features />
    </div>
  );
};

// Exporting Home component as default to be used in routing or other components
export default Home;
