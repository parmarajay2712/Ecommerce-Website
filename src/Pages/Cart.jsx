import React from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emptycart from "../assets/empty-cart.png";

// ✅ Cart Page Component
const Cart = ({ location = {}, getlocation }) => {
  // ✅ Cart and user context
  const { cartitem, updatequantity, deleteitem, setCartitem } = useCart();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const { country = "", state = "", postcode = "" } = location || {};

  // ✅ Calculate totals
  const totalItems = cartitem.reduce((total, item) => total + item.quantity, 0);
  const subTotal = cartitem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryCharges = subTotal > 500 ? 0 : 25;
  const handlingCharges = 5;
  const grandTotal = (subTotal + deliveryCharges + handlingCharges).toFixed(2);

  // ✅ Handle Checkout
  const handleCheckout = () => {
    if (cartitem.length === 0) return;

    toast.success("✅ Order placed successfully!");
    setCartitem([]); // Clear cart
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartitem.length > 0 ? (
        <>
          {/* ✅ Cart Items Section */}
          <h1 className="font-bold text-2xl">My Cart ({cartitem.length})</h1>
          <div className="mt-10 space-y-4">
            {cartitem.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 p-5 rounded-md flex items-center justify-between mt-3 w-full"
              >
                {/* ✅ Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md"
                  />
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* ✅ Quantity Controls */}
                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl items-center">
                  <button
                    onClick={() => updatequantity(item.id, "decrease")}
                    className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updatequantity(item.id, "increase")}
                    className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    +
                  </button>
                </div>

                {/* ✅ Delete Item */}
                <span className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl ">
                  <FaRegTrashAlt
                    onClick={() => deleteitem(item.id)}
                    className="text-red-500 text-2xl cursor-pointer"
                  />
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mt-6">
            {/* ✅ Delivery Information Form */}
            <div className="bg-gray-100 rounded-md p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label>Full Name</label>
                <input
                  type="text"
                  value={isLoaded && user ? user.fullName || "" : ""}
                  placeholder="Enter Your Name"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  value={location?.country}
                  placeholder="Enter Your Address"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    value={location?.state}
                    placeholder="Enter Your State"
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Post Code</label>
                  <input
                    type="text"
                    value={location?.postcode}
                    placeholder="Enter Your Post Code"
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    value={location?.country}
                    placeholder="Enter Your Country"
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700">
                -------OR-------
              </div>
              <div className="flex justify-center">
                <button
                  onClick={getlocation}
                  className="bg-red-500 text-white px-3 py-2 rounded-md"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* ✅ Bill Details Section */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Total Items
                </h1>
                <p>${subTotal.toFixed(2)}</p>
              </div>

              {/* Delivery Charges */}
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Charges
                </h1>
                <p className="text-red-500 font-semibold">
                  {deliveryCharges === 0 ? (
                    <>
                      <span className="text-gray-600 line-through">$25</span> FREE
                    </>
                  ) : (
                    `$${deliveryCharges}`
                  )}
                </p>
              </div>

              {/* Handling Charges */}
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charges
                </h1>
                <p className="text-red-500 font-semibold">${handlingCharges}</p>
              </div>

              <hr className="text-gray-200 mt-2" />

              {/* Grand Total */}
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">${grandTotal}</p>
              </div>

              {/* Promo Code Section */}
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">Apply Promo Code</h1>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="p-2 rounded-md w-full"
                  />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>

              {/* ✅ Checkout Button */}
              <button
                onClick={handleCheckout}
                className="bg-red-500 w-full text-white px-3 py-2 rounded-md mt-4 cursor-pointer"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        // ✅ Empty Cart View
        <div className="flex flex-col items-center justify-center mt-20 gap-4 h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl">Oh No Your Cart Is Empty</h1>
          <img src={emptycart} className="w-[500px] mb-5" alt="Empty Cart" />
          <button
            onClick={() => navigate("/Products")}
            className="bg-red-500 text-white px-6 py-3 rounded-md mb-5 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
