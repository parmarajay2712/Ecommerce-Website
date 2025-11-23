import React from "react"; // Import React to use JSX
import { getData } from "../Context/DataContext"; // Import custom hook to get global category and brand data

// FilterSection component for product filters (search, category, brand, price)
const FilterSection = ({
  search, // Current search text
  setSearch, // Function to update search text
  brand, // Current selected brand
  setBrand, // Function to update selected brand
  priceRange, // Current price range [min, max]
  setPriceRange, // Function to update price range
  category, // Current selected category
  setCategory, // Function to update selected category
  handleBrandChange, // Handler for brand dropdown
  handleCategoryChange, // (Optional) external handler for category, not used here
}) => {
  const { categoryOnlyData, brandOnlyData } = getData(); // Get unique categories and brands from context

  // Handler for category checkbox (single-select logic)
  // Clicking the same category again will uncheck it (reset to "All")
  const handleCategorySelect = (e) => {
    const selected = e.target.value;
    if (category === selected) {
      setCategory("All"); // Uncheck category
    } else {
      setCategory(selected); // Select new category
    }
  };

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search state
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />

      {/* Category Filter */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => (
          <div key={index} className="flex gap-2">
            {/* Single-select checkbox */}
            <input
              type="checkbox"
              name={item}
              checked={category === item} // Checked only if current category matches
              value={item}
              onChange={handleCategorySelect} // Use local handler for single-select behavior
            />
            <button className="cursor-pointer uppercase">{item}</button>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
        value={brand} // Current selected brand
        onChange={handleBrandChange} // Call external handler
      >
        <option value="All">All</option> {/* Default option */}
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range Filter */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]} // Current max value
          onChange={
            (e) => setPriceRange([priceRange[0], Number(e.target.value)]) // Update max value
          }
          className="transition-all"
        />
      </div>

      {/* Reset Filters Button */}
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setSearch(""); // Reset search
          setCategory("All"); // Reset category
          setBrand("All"); // Reset brand
          setPriceRange([0, 1000]); // Reset price range
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

// Export FilterSection for use in product pages
export default FilterSection;
