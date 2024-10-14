// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = true;
  const isAdmin = true;

  return isAuthenticated && isAdmin ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
}
