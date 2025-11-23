import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react"; // Import authentication components from Clerk
import { MapPin } from "lucide-react"; // Import MapPin icon
import React, { useState } from "react"; // Import React and useState hook
import { CgClose } from "react-icons/cg"; // Import Close icon
import { FaCaretDown } from "react-icons/fa"; // Import caret icon
import { IoCartOutline } from "react-icons/io5"; // Import cart icon
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink for navigation
import { useCart } from "../Context/CartContext"; // Import custom hook for cart state
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"; // Import menu icons
import ResponsiveMenu from "../Components/ResponsiveMenu"; // Import responsive mobile menu

// Navbar component
const Navbar = ({ location, getlocation, openDropdown, setOpenDropdown }) => {
  const { cartitem } = useCart(); // Get cart items from context
  const [opennav, setopennav] = useState(false); // State for mobile menu toggle

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    // Navbar container with shadow, background, and padding
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      {/* Content wrapper with max width and flex layout */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and location section */}
        <div className="flex gap-7 items-center">
          {/* Logo linking to home */}
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">E</span>commerce
            </h1>
          </Link>

          {/* Location display (desktop only) */}
          <div className="md:flex gap-1 cursor-pointer text-gray-700 items-center hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                // Display country and state if location exists
                <div className="-space-y-2">
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                // Fallback text
                "Add Address"
              )}
            </span>
            {/* Dropdown toggle */}
            <FaCaretDown onClick={toggleDropdown} />
          </div>

          {/* Location dropdown panel */}
          {openDropdown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 p-5 rounded-md border-gray-100">
              {/* Dropdown header */}
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown}>
                  <CgClose />
                </span>
              </h1>
              {/* Button to auto-detect user location */}
              <button
                onClick={getlocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect My Location
              </button>
            </div>
          ) : null}
        </div>

        {/* Navigation menu */}
        <nav className="flex gap-7 items-center">
          {/* Desktop menu links */}
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            {/* Home link */}
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            {/* Products link */}
            <NavLink
              to={"/Products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            {/* About link */}
            <NavLink
              to={"/About"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            {/* Contact link */}
            <NavLink
              to={"/Contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>

          {/* Cart icon with badge */}
          <Link to={"/Cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white px-2 rounded-full">
              {cartitem.length} {/* Display number of items in cart */}
            </span>
          </Link>

          {/* User authentication buttons */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu toggle icons */}
          {opennav ? (
            <HiMenuAlt3
              onClick={() => setopennav(false)} // Close menu
              className="h-7 w-7 md:hidden"
            />
          ) : (
            <HiMenuAlt1
              onClick={() => setopennav(true)} // Open menu
              className="h-7 w-7 md:hidden"
            />
          )}
        </nav>
      </div>

      {/* Responsive mobile menu */}
      <ResponsiveMenu opennav={opennav} setopennav={setopennav} />
    </div>
  );
};

// Export Navbar component
export default Navbar;
