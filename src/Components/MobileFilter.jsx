import React from "react"; // Import React to use JSX
import { FaFilter } from "react-icons/fa6"; // Import filter icon from react-icons
import { getData } from "../Context/DataContext"; // Import custom hook to get categories and brands

// MobileFilter component for rendering filters on small screens
const MobileFilter = ({
  openFilter, // Boolean to show/hide mobile filter panel
  setOpenFilter, // Function to toggle mobile filter panel
  search, // Current search text
  setSearch, // Function to update search text
  brand, // Current selected brand
  setBrand, // Function to update brand
  priceRange, // Current price range [min, max]
  setPriceRange, // Function to update price range
  category, // Current selected category
  setCategory, // Function to update category
  handleBrandChange, // Handler for brand dropdown
  handleCategoryChange, // Handler for category checkbox
}) => {
  // Get unique categories and brands from context
  const { categoryOnlyData, brandOnlyData } = getData();

  // Toggle the mobile filter panel visibility
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <>
      {/* Header bar for mobile filters */}
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        {/* Filter icon to toggle panel */}
        <FaFilter onClick={toggleFilter} className="text-gray-800" />
      </div>

      {/* Mobile filter panel: displayed if openFilter is true */}
      {openFilter ? (
        <div className="bg-gray-100 p-2 md:hidden">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search.."
            value={search} // Current search value
            onChange={(e) => setSearch(e.target.value)} // Update search state
            className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
          />

          {/* Category Filter Section */}
          <h1 className="mt-5 font-semibold text-xl">Category</h1>
          <div className="flex flex-col gap-2 mt-3">
            {categoryOnlyData?.map((item, index) => {
              return (
                <div key={index} className="flex gap-2">
                  {/* Category checkbox */}
                  <input
                    type="checkbox"
                    name={item}
                    checked={category === item} // Checked if current category matches
                    value={item}
                    onChange={handleCategoryChange} // Call external handler
                  />
                  {/* Category label */}
                  <button className="cursor-pointer uppercase">{item}</button>
                </div>
              );
            })}
          </div>

          {/* Brand Filter Section */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
          <select
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
            value={brand} // Current selected brand
            onChange={handleBrandChange} // Call external handler
          >
            {brandOnlyData?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item.toUpperCase()}
                </option>
              );
            })}
          </select>

          {/* Price Range Filter Section */}
          <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
          <div className="flex flex-col gap-2">
            {/* Display current price range */}
            <label>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            {/* Range input to select maximum price */}
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]} // Current maximum price
              onChange={
                (e) => setPriceRange([priceRange[0], Number(e.target.value)]) // Update max price
              }
              className="transition-all w-[200px]"
            />
          </div>

          {/* Reset Filters Button */}
          <button
            className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
            onClick={() => {
              setSearch(""); // Reset search
              setCategory("All"); // Reset category
              setBrand("All"); // Reset brand
              setPriceRange([0, 5000]); // Reset price range
              setOpenFilter(false); // Close mobile filter panel
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : null}
    </>
  );
};

// Export MobileFilter component for use in small screen views
export default MobileFilter;
