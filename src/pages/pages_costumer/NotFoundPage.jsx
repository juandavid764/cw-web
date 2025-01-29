import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/web/Footer";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-full max-w-xs mb-6 ">
        <div className="">
          <img src="https://cartoonwarfastfood.com/img/Papa.png" alt="patata" />
        </div>
      </div>
      <h1 className="px-3 text-center text-2xl md:text-4xl font-bold text-orange-500 mb-4">
        ¡Ups, te saliste del camino del super villano!
      </h1>
      <p className="px-3 text-center text-base md:text-xl text-black mb-6">
        No encontramos lo que buscabas, pero no te preocupes, ¡siempre hay algo
        delicioso esperando por ti!
      </p>
      <Link
        to="/"
        className="bg-orange-400 text-white px-6 py-3 rounded-lg md:text-lg hover:bg-orange-600 transition duration-300"
      >
        Volver al Menú
      </Link>
    </div>
  );
};

export default NotFoundPage;
