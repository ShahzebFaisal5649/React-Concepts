import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This component acts as a shield for private pages that only logged-in users should see.
// In App.jsx, we wrap private routes inside this component.
export function PrivateRoute({ isLoggedIn }) {
  // If the user is logged in, we render the 'Outlet' component.
  // The <Outlet /> is a placeholder that tells React Router to render the child route component here.
  // If they are NOT logged in, we use <Navigate /> to redirect them back to the login page.
  
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
export default PrivateRoute;
