// Importing React and hooks for component state and lifecycle
import React, { useEffect, useState } from "react";

// Importing data context to fetch products
import { getData } from "../Context/DataContext";

// Importing reusable components for filtering and displaying products
import FillterSection from "../Components/FillterSection"; // Sidebar filter component
import MobileFilter from "../Components/MobileFilter"; // Mobile filter drawer component
import ProductCard from "../Components/ProductCard"; // Individual product card component

// Importing assets for loading animation and "not found" state
import Loading from "../assets/Loading4.webm"; // Loading video animation
import Lottie from "lottie-react"; // Lottie animation player
import notfound from "../assets/notfound.json"; // Not found animation JSON

// Main Products page component
const Products = () => {
  // Destructure data and fetch function from context
  const { data, fetchAllProducts } = getData();

  // State variables for search, filters, and mobile drawer
  const [Search, setSearch] = useState(""); // Search input state
  const [category, setCategory] = useState("All"); // Selected category
  const [brand, setBrand] = useState("All"); // Selected brand
  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range filter
  const [openFilter, setOpenFilter] = useState(false); // Mobile filter drawer open/close

  // Fetch all products on component mount and scroll to top
  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  // Handle category selection change
  const handlecategoryChange = (e) => {
    setCategory(e.target.value);
    setOpenFilter(false); // Close mobile filter after selection
  };

  // Handle brand selection change
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setOpenFilter(false); // Close mobile filter after selection
  };

  // Ensure data is in array format, handling different API response shapes
  const products = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  // Filter products based on search, category, brand, and price range
  const filterData = products.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(Search.toLowerCase());
    const categoryMatch = category === "All" || item.category === category;
    const brandMatch = brand === "All" || item.brand === brand;
    const priceMatch =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return titleMatch && categoryMatch && brandMatch && priceMatch;
  });

  return (
    // Main container with white background
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {/* Mobile Filter Drawer for small screens */}
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={Search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleCategoryChange={handlecategoryChange}
          handleBrandChange={handleBrandChange}
        />

        {/* Check if products are loaded */}
        {products.length > 0 ? (
          <>
            <div className="flex gap-8">
              {/* Sidebar Filters for desktop */}
              <FillterSection
                Search={Search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handlecategoryChange={handlecategoryChange}
                handleBrandChange={handleBrandChange}
              />

              {/* Product Grid */}
              {filterData.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                    {/* Map filtered products to ProductCard components */}
                    {filterData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ) : (
                // Display Lottie animation if no products match filters
                <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                  <Lottie animationData={notfound} className="w-[400px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          // Loading state while fetching products
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the Products component as default
export default Products;
