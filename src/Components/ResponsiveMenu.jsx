import { UserButton, useUser } from "@clerk/clerk-react"; // Import user auth hooks and components from Clerk
import React from "react"; // Import React
import { FaUserCircle } from "react-icons/fa"; // Import default user icon
import { Link } from "react-router-dom"; // Import Link for navigation

// ResponsiveMenu component for mobile navigation
const ResponsiveMenu = ({ opennav, setopennav }) => {
  const { user } = useUser(); // Get currently authenticated user

  return (
    <>
      {/* ✅ Background overlay when menu is open on mobile */}
      {opennav && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setopennav(false)} // Close menu when overlay is clicked
        ></div>
      )}

      {/* ✅ Sliding menu container */}
      <div
        className={`${
          opennav ? "left-0" : "-left-full" // Slide in/out animation
        } fixed top-0 bottom-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all duration-300 ease-in-out`}
      >
        <div>
          {/* ✅ User section */}
          <div className="flex items-center justify-start gap-3">
            {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}{" "}
            {/* Show user or default icon */}
            <div>
              <h1>Hello, {user?.firstName || "Guest"}</h1>{" "}
              {/* Show first name or Guest */}
              <h1 className="text-sm text-slate-500">Premium User</h1>
            </div>
          </div>

          {/* ✅ Navigation links */}
          <nav className="mt-12">
            <ul className="flex flex-col gap-7 text-2xl font-semibold">
              <Link
                to="/"
                className="cursor-pointer"
                onClick={() => setopennav(false)} // Close menu on link click
              >
                <li>Home</li>
              </Link>
              <Link
                to="/Products"
                className="cursor-pointer"
                onClick={() => setopennav(false)}
              >
                <li>Products</li>
              </Link>
              <Link
                to="/About"
                className="cursor-pointer"
                onClick={() => setopennav(false)}
              >
                <li>About</li>
              </Link>
              <Link
                to="/Contact"
                className="cursor-pointer"
                onClick={() => setopennav(false)}
              >
                <li>Contact</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

// Export ResponsiveMenu component
export default ResponsiveMenu;
