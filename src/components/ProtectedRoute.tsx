// import React from "react";
// import { Navigate } from "react-router-dom";

// interface ProtectedRouteProps {
//   element: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");

//   if (isAuthenticated && window.location.pathname === "/login") {
//     return <Navigate to="/admin" />;
//   }
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{element}</>;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

interface LoginRouteProps {
  element: React.ReactNode;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated) {
    return <Navigate to="/admin" />; // Redirect to your app's main page
  }

  return <>{element}</>;
};

export { ProtectedRoute, LoginRoute };
