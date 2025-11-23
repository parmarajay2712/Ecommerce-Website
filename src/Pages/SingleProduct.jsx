// Importing required libraries and hooks
import axios from "axios"; // For API requests
import React, { useEffect, useState } from "react"; // React hooks for state and lifecycle
import { useParams } from "react-router-dom"; // To get dynamic URL params
import Loading from "../assets/Loading4.webm"; // Loading animation asset
import Breadcrums from "../Components/Breadcrums"; // Breadcrumb component for navigation
import { IoCartOutline } from "react-icons/io5"; // Cart icon
import { useCart } from "../Context/CartContext"; // Custom cart context for addToCart function

// SingleProduct functional component
const SingleProduct = () => {
  // Get product ID from the URL params
  const parms = useParams();

  // State to hold product details fetched from API
  const [singleProduct, setSingleProduct] = useState(null);

  // State to manage selected quantity for cart
  const [quantity, setQuantity] = useState(1);

  // Get addToCart function from Cart context
  const { addToCart } = useCart();

  // Function to fetch a single product from DummyJSON API
  const getsingleProduct = async () => {
    try {
      console.log("✅ Product ID from URL:", parms.id);

      // Fetch product data based on URL param
      const res = await axios.get(`https://dummyjson.com/products/${parms.id}`);

      console.log("✅ Full API Response:", res.data);

      // Update state with fetched product data
      setSingleProduct(res.data);
    } catch (error) {
      console.log("❌ Error fetching product:", error);
    }
  };

  // Fetch product on component mount and when the ID changes
  useEffect(() => {
    getsingleProduct();
  }, [parms.id]);

  // Show loader while product data is being fetched
  if (!singleProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <video muted loop autoPlay>
          <source src={Loading} type="video/webm" />
        </video>
      </div>
    );
  }

  // Calculate original price from discount (if any)
  const discount = singleProduct.discountPercentage || 0;
  const originalPrice = Math.round(
    singleProduct.price + (singleProduct.price * discount) / 100
  );

  // Handle adding product to cart with selected quantity
  const handleAddToCart = () => {
    const productWithQty = { ...singleProduct, quantity: Number(quantity) };
    addToCart(productWithQty);
  };

  // Render product details
  return (
    <>
      <div className="px-4 pb-4 md:px-0">
        {/* Breadcrumb navigation */}
        <Breadcrums title={singleProduct.title} />

        {/* Grid layout for product image and details */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:p-6">
          {/* Product Image */}
          <div className="w-full">
            <img
              src={singleProduct.thumbnail}
              alt={singleProduct.title}
              className="rounded-2xl w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            {/* Product title */}
            <h1 className="md:text-3xl text-xl font-bold text-gray-800">
              {singleProduct.title}
            </h1>

            {/* Brand and Category */}
            <div className="text-gray-700">
              {singleProduct.brand?.toUpperCase()} /{" "}
              {singleProduct.category?.toUpperCase()}
            </div>

            {/* Price display with discount */}
            <p className="text-xl text-red-500 font-bold flex items-center gap-2">
              ${singleProduct.price}
              <span className="text-gray-600 line-through text-lg ml-3">
                ${originalPrice}
              </span>
            </p>

            {/* Product description */}
            <p className="text-gray-500 ml-2">{singleProduct.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <label htmlFor="" className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} // Update quantity state
                className="w-20 border-gray-500 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart} // Add product with quantity to cart
                className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md font-semibold"
              >
                <IoCartOutline className="w-6 h-6" />
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export SingleProduct component as default
export default SingleProduct;
