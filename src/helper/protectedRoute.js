import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  // const { user } = useAuth();

  const user = {
    name:"abhi",
    role:"admin"
  }

  if (user) {
     <Navigate to="/login" replace />;
  }

  // Check if user has any of the required roles (admin or none)
  if (!roles.some((role) => user.role === role)) {
    // Redirect to appropriate page based on role or lack thereof
    return user.role === "user" ? (
      <Navigate to="/unauthorized" replace /> // Redirect unauthorized users
    ) : ( // Corrected indentation for the `else` block
      <Navigate to="/" replace /> // Redirect others to the default page
    );
  }

  return children; // Render the protected component if authorized
};

export default ProtectedRoute;