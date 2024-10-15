// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import Navbar from "./components/web/Navbar";
import AdminNavbar from "./components/admin/AdminNavbar";
import { ProductsProvider } from "./context/ProductsContext";
import { useAuth } from "./context/AuthContext";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Routespage from "./pages_admin/RoutesPage";

function App() {
  const { isAdmin } = useAuth(); //Gepeto me dice que me ayuda con el rol del usuario

  return (
    <ProductsProvider>
      <Router>
        {isAdmin ? <AdminNavbar /> : <Navbar />}
        {isAdmin ? <AdminRoutes /> : <CustomerRoutes />}
      </Router>
    </ProductsProvider>
  );
}

export default App;
