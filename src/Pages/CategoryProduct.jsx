import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../Components/ProductListView";

// ✅ Component to display products by category
const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryName } = useParams(); // ✅ Matches route param in App.jsx
  const navigate = useNavigate();

  // ✅ Fetch products for the selected category
  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products/category/${categoryName}`
      );
      // Response format: { products: [...] }
      setProducts(res.data.products);
    } catch (error) {
      console.error("❌ Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch products on mount or when category changes
  useEffect(() => {
    getCategoryProducts();
    window.scrollTo(0, 0);
  }, [categoryName]);

  // ✅ Loading screen
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-4xl font-medium text-gray-600 mb-6">Loading...</p>
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      </div>
    );

  return (
    <div className="mt-10 max-w-6xl mx-auto px-4">
      {/* ✅ Page Header */}
      <h1 className="text-2xl font-bold mb-6 capitalize text-gray-800">
        {categoryName} Products
      </h1>

      {products.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          {/* ✅ Back Button */}
          <button
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
            onClick={() => navigate("/")}
          >
            <ChevronLeft /> Back
          </button>

          {/* ✅ Render products */}
          {products.map((product, index) => (
            <ProductListView key={index} products={product} />
          ))}
        </div>
      ) : (
        // ✅ Fallback if no products are found
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;
