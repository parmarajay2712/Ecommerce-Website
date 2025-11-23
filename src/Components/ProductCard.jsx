import React from "react"; // Import React
import { IoCartOutline } from "react-icons/io5"; // Import cart icon
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useCart } from "../Context/CartContext"; // Import custom cart context

// ProductCard component to display individual product
const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const { addToCart, cartitem } = useCart(); // Get cart functions and items from context

  return (
    // Card container with border, rounded corners, and hover effects
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max">
      {/* Product image */}
      <img
        src={product.thumbnail || product.images?.[0]} // Use thumbnail or first image
        alt={product.title || "Product Image"} // Fallback alt text
        className="bg-gray-100 aspect-square"
        onClick={() => navigate(`/Products/${product.id}`)} // Navigate to product details page
      />

      {/* Product title */}
      <h1 className="line-clamp-2 p-1 font-semibold">{product.title}</h1>

      {/* Product price */}
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>

      {/* Add to Cart button */}
      <button
        onClick={() => addToCart(product)} // Add product to cart
        className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-1 items-center justify-center font-semibold"
      >
        <IoCartOutline className="w-6 h-6" /> {/* Cart icon */}
        Add to Cart
      </button>
    </div>
  );
};

// Export ProductCard component
export default ProductCard;
