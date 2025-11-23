import axios from "axios"; // For HTTP requests
import { createContext, useState, useEffect, useContext, useMemo } from "react"; // React hooks

// ✅ Create DataContext for product and category data
export const DataContext = createContext(null);

// ✅ DataProvider component to wrap the app and provide products/categories
export const DataProvider = ({ children }) => {
  // ✅ State to store fetched products; structure aligned with API
  const [data, setData] = useState({ data: [] });

  // ✅ Function to fetch all products from dummyjson API
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products?limit=200"
      );
      console.log("Fetched products:", response.data);

      // ✅ Store products in "data" property for compatibility
      setData({ data: response.data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ✅ Function to extract unique values for a given property (category/brand)
  const getuniqueCategories = (dataObject, property) => {
    const arrayData = Array.isArray(dataObject?.data) ? dataObject.data : [];
    const newValues = arrayData.map((curElem) => curElem[property]);
    const uniqueValues = ["All", ...new Set(newValues)]; // ✅ Include "All" as default option
    return uniqueValues;
  };

  // ✅ Memoized arrays of unique categories and brands
  const Categoryonlydata = getuniqueCategories(data, "category");
  const brandonlydata = getuniqueCategories(data, "brand");

  // ✅ Fetch products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // ✅ Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      data,
      setData,
      fetchAllProducts,
      Categoryonlydata,
      brandonlydata,
    }),
    [data, Categoryonlydata, brandonlydata]
  );

  // ✅ Provide context to children
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// ✅ Custom hook to consume DataContext easily
export const getData = () => useContext(DataContext);
