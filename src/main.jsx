// Importing React StrictMode for highlighting potential problems in the app
import { StrictMode } from "react";

// Importing React DOM createRoot method for rendering in React 18+
import { createRoot } from "react-dom/client";

// Import global CSS
import "./index.css";

// Import main App component
import App from "./App.jsx";

// Import authentication provider from Clerk
import { ClerkProvider } from "@clerk/clerk-react";

// Import custom context providers
import { DataProvider } from "./Context/DataContext.jsx"; // Provides product/data context
import { CartProvider } from "./Context/CartContext.jsx"; // Provides cart state context

// Import Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import scroll-to-top button component
import ScrollToTop from "react-scroll-to-top";

// ✅ Get Clerk Publishable Key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Throw error if Publishable Key is missing (prevents app from running without auth)
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in .env file");
}

// Create root and render the entire React app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ ClerkProvider wraps the entire app for authentication */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* Provide global data context */}
      <DataProvider>
        {/* Provide global cart context */}
        <CartProvider>
          {/* Main App component */}
          <App />

          {/* Scroll to top button with custom styling */}
          <ScrollToTop
            color="white"
            style={{
              backgroundColor: "#fa2d37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            smooth
          />

          {/* Toast notifications container */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </DataProvider>
    </ClerkProvider>
  </StrictMode>
);
