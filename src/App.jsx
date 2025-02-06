// src/App.jsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/web/Navbar";
import Footer from "./components/web/Footer";
import AdminNavbar from "./components/admin/AdminNavbar";
import { ProductsProvider } from "./context/ProductsContext";
import { useAuth } from "./context/AuthContext";
import CustomerRoutes from "./routes/CustomerRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const { user } = useAuth(); //Gepeto me dice que me ayuda con el rol del usuario

  return (
    <ProductsProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {user ? <AdminNavbar /> : <Navbar />}
          {user ? <AdminRoutes /> : <CustomerRoutes />}
          {user ? <></> : <Footer />}
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;
