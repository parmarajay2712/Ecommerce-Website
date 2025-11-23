// Importing React and hooks
import React, { useEffect, useState } from "react";

// Importing React Router components for routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";

// Importing reusable components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute"; // Protect cart page from unauthorized access

// Importing axios for API requests
import axios from "axios";

// Importing custom cart context
import { useCart } from "./Context/CartContext";

// Main App component
const App = () => {
  // State to store user location
  const [location, setLocation] = useState(null);

  // State to manage dropdown menu in Navbar
  const [openDropdown, setOpenDropdown] = useState(false);

  // Destructuring cart state and setter from context
  const { cartitem, setCartitem } = useCart();

  // Function to get user's geolocation
  const getLocation = async () => {
    try {
      if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by your browser.");
        return;
      }

      // Get current position
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          // Reverse geocoding API call to get location details
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

          try {
            const response = await axios.get(url);
            const exactLocation = response.data.address;
            setLocation(exactLocation); // Store location in state
            setOpenDropdown(false); // Close dropdown after fetching location
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } catch (err) {
      console.error("Unexpected error getting location:", err);
    }
  };

  // Fetch location on component mount
  useEffect(() => {
    getLocation();
  }, []);

  // Load cart items from localStorage safely
  useEffect(() => {
    const storedcart = localStorage.getItem("cartitem");
    if (storedcart) {
      try {
        // Parse JSON and ensure it's an array
        const parsed =
          typeof storedcart === "string" ? JSON.parse(storedcart) : storedcart;
        setCartitem(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        setCartitem([]); // Fallback to empty array
      }
    }
  }, []);

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartitem", JSON.stringify(cartitem));
  }, [cartitem]);

  return (
    // BrowserRouter wraps the whole app for routing
    <BrowserRouter>
      {/* Navbar component with location and dropdown props */}
      <Navbar
        location={location}
        getlocation={getLocation}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      {/* Define all routes */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Products listing page */}
        <Route path="/Products" element={<Products />} />

        {/* Single product detail page */}
        <Route path="/Products/:id" element={<SingleProduct />} />

        {/* Category-specific product page */}
        <Route path="/category/:categoryName" element={<CategoryProduct />} />

        {/* Static pages */}
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Protected Cart page - only accessible if user is authorized */}
        <Route
          path="/Cart"
          element={
            <ProtectedRoute>
              <Cart location={location} getlocation={getLocation} />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer displayed on all pages */}
      <Footer />
    </BrowserRouter>
  );
};

// Export App component as default
export default App;
