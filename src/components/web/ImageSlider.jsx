import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react"; // Importa el componente de botón de Material Tailwind
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"; // Íconos para los botones
import image1 from "../../assets/slide1.webp";
import image2 from "../../assets/slide2.webp";
import image3 from "../../assets/slide3.webp";

const images = [image1, image2, image3]; // Arreglo de imágenes

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Imagenes */}
      <div className="overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-90"
            }`}
          >
            {index === currentIndex && (
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-[300px] sm:h-[300px] md:h-[500px] object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Botones de Navegación */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          className="p-2 rounded-full shadow-md hover:bg-orange-400 focus:outline-none"
          onClick={prevSlide}
        >
          <ArrowLeftIcon className="h-5 w-5 text-black" />
        </Button>
        <Button
          className=" p-2 rounded-full shadow-md hover:bg-orange-400 focus:outline-none"
          onClick={nextSlide}
        >
          <ArrowRightIcon className="h-5 w-5 text-black" />
        </Button>
      </div>

      {/* Indicadores de Paginación */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
