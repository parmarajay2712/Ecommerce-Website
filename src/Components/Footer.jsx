import React from "react"; // Import React to use JSX
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa"; // Import social media icons from react-icons
import { Link } from "react-router-dom"; // Import Link for internal navigation
// import Logo from "../assets/Logo.png"; // Optional logo import

const Footer = () => {
  return (
    // Footer container with background color, text color, and padding
    <footer className="bg-gray-900 text-gray-200 py-10">
      {/* Main content container with max width and flex layout on medium screens */}
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
        {/* Company Info Section */}
        <div className="mb-6 md:mb-0">
          {/* Link to homepage */}
          <Link to="/">
            {/* Optional logo */}
            {/* <img src={Logo} alt="" className='w-32'/> */}
            <h1 className="text-red-500 text-2xl font-bold">Ecommerce</h1>
          </Link>
          {/* Company tagline */}
          <p className="mt-2 text-sm">
            Powering Your World with the Best in Electronics.
          </p>
          {/* Company address */}
          <p className="mt-2 text-sm">
            123 Electronics St, Style City, NY 10001
          </p>
          {/* Company email */}
          <p className="text-sm">Email: support@Ecommerce.com</p>
          {/* Company phone number */}
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service Links Section */}
        <div className="mb-6 md:mb-0">
          {/* Section title */}
          <h3 className="text-xl font-semibold">Customer Service</h3>
          {/* List of customer service links */}
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social Media Links Section */}
        <div className="mb-6 md:mb-0">
          {/* Section title */}
          <h3 className="text-xl font-semibold">Follow Us</h3>
          {/* Social media icons */}
          <div className="flex space-x-4 mt-2">
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>

        {/* Newsletter Subscription Section */}
        <div>
          {/* Section title */}
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          {/* Newsletter description */}
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          {/* Newsletter subscription form */}
          <form action="" className="mt-4 flex">
            {/* Email input */}
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {/* Subscribe button */}
            <button
              type="submit"
              className="bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        {/* Copyright notice */}
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500">Ecommerce</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

// Export Footer component for use in other pages
export default Footer;
