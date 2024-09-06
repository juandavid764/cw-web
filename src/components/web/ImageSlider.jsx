import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Importar imágenes desde la carpeta assets
import image1 from "../../assets/slide1.webp";
import image2 from "../../assets/slide2.webp";
import image3 from "../../assets/slide3.webp";

const ImageSlider = () => {
  const images = [image1, image2, image3]; // Arreglo de imágenes

  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice de la imagen actual

  // Función para ir a la imagen anterior (circular)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Función para ir a la siguiente imagen (circular)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {" "}
      {/* Slider ocupa todo el ancho */}
      {/* Botón para ir a la imagen anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <ArrowBackIosIcon />
      </button>
      {/* Botón para ir a la siguiente imagen */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
      >
        <ArrowForwardIosIcon />
      </button>
      {/* Contenedor de las imágenes*/}
      <div
        className="md:min-h-lvh  sm:min-h-lvh flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Mueve el contenedor al índice actual
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            {" "}
            {/* Cada imagen ocupa todo el ancho */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-screen object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
