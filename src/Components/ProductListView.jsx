import React from "react"; // Import React
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useCart } from "../Context/CartContext"; // Import custom cart context

// ProductListView component to display products in list layout
const ProductListView = ({ products }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const { addToCart } = useCart(); // Get addToCart function from cart context

  return (
    // Outer container with spacing and rounded corners
    <div className="space-y-4 mt-2 rounded-md">
      {/* Product card container */}
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        {/* Product image */}
        <img
          src={products.images} // Display product image
          alt={products.title} // Fallback alt text
          className="md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer"
          onClick={() => navigate(`/Products/${products.id}`)} // Navigate to product detail page
        />

        {/* Product information */}
        <div className="space-y-2">
          {/* Product title */}
          <h1 className="font-bold text-lg md:text-xl line-clamp-3 hover:text-red-400 md:w-full w-[220px]">
            {products.title}
          </h1>

          {/* Product price and discount */}
          <p className="font-semibold flex items-center md:text-lg text-sm">
            $<span className="md:text-4xl text-3xl">{products.price}</span>(
            {products.discountPercentage}% OFF)
          </p>

          {/* Delivery info */}
          <p className="text-sm">
            FREE Delivery <span className="font-semibold">Fri, 18</span> <br />
            or Fastest Delivery
            <span className="font-semibold"> Tomorrow, 17 Apr</span>
          </p>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(products)} // Add product to cart
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Export ProductListView component
export default ProductListView;
