import React, { useEffect, useState } from "react"; // React and hooks for state and lifecycle
import axios from "axios"; // Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically
import { getData } from "../Context/DataContext"; // Custom hook/context to get global data

const Category = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { data } = getData(); // Get global data from context
  const [categories, setCategories] = useState([]); // Local state to store categories fetched from API

  // Utility function to extract unique property values from data object
  const getuniqueCategories = (dataObject, property) => {
    const arrayData = Array.isArray(dataObject?.data) ? dataObject.data : []; // Ensure data is an array
    const newValues = arrayData.map((curElem) => curElem[property]); // Extract values of given property
    const uniqueValues = [...new Set(newValues)]; // Remove duplicates using Set
    return uniqueValues; // Return array of unique values
  };

  // Get unique categories from local data
  const Categoryonlydata = getuniqueCategories(data, "category");

  // Fetch categories from external API
  const getCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories"); // Fetch categories
      setCategories(res.data.slice(0, 7)); // Store first 7 categories in state
    } catch (error) {
      console.log(error); // Log error if API request fails
    }
  };

  // Fetch categories when component mounts
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-[#101829]">
      {" "}
      {/* Background color for category section */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center md:justify-around justify-center py-7 px-4 ">
        {/* Map over unique categories and display as buttons */}
        {/* ✅ Limit to 9 categories only */}
        {Categoryonlydata.slice(0, 9).map((item, index) => (
          <div key={index}>
            <button
              onClick={() => navigate(`/category/${item}`)} // Navigate to category page on click
              className="uppercase bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer "
            >
              {item} {/* Display category name */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Category component for use in other components
export default Category;
