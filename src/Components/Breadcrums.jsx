import React from "react"; // Importing React to use JSX and React features
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for programmatic navigation

// Functional component to display breadcrumb navigation
// Props: `title` – the current page or product title to display in the breadcrumb
const Breadcrums = ({ title }) => {
  const navigate = useNavigate(); // Initializing the navigate function to redirect users programmatically

  return (
    // Container div for breadcrumb with max width and vertical spacing
    <div className="max-w-6xl mx-auto my-10">
      {/* Breadcrumb heading */}
      <h1 className="text-xl text-gray-700 font-semibold">
        {/* "Home" breadcrumb item - navigates to the homepage when clicked */}
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </span>
        {/* Separator between breadcrumb items */}/
        {/* "Products" breadcrumb item - navigates to the products page when clicked */}
        <span className="cursor-pointer" onClick={() => navigate("/Products")}>
          Products
        </span>
        {/* Separator and current page title (non-clickable) */}/{" "}
        <span>{title}</span>
      </h1>
    </div>
  );
};

// Exporting the Breadcrums component so it can be imported and used in other files
export default Breadcrums;
