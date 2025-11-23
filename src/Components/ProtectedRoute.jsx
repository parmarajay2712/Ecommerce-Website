import { useUser } from "@clerk/clerk-react"; // Import useUser hook from Clerk for authentication
import React from "react"; // Import React
import { Navigate } from "react-router-dom"; // Import Navigate component for route redirection

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { user } = useUser(); // Get currently authenticated user

  // If user exists, render children; otherwise, redirect to home page
  return <div>{user ? children : <Navigate to={"/"} />}</div>;
};

// Export ProtectedRoute component
export default ProtectedRoute;
