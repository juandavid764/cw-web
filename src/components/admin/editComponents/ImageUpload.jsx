import { useState, forwardRef, useImperativeHandle } from "react";

// Usamos forwardRef para exponer funciones desde ImageUpload al componente padre
const ImageUpload = forwardRef(({ onImageChange }, ref) => {
  const [image, setImage] = useState(null); // Para almacenar el archivo seleccionado
  const [preview, setPreview] = useState(null); // Para la vista previa de la imagen
  const [uploadedUrl, setUploadedUrl] = useState(""); // URL de la imagen subida
  const [isUploaded, setIsUploaded] = useState(false); // Para controlar el estado de subida

  // Exponer la función reset al componente padre
  useImperativeHandle(ref, () => ({
    reset: () => {
      setImage(null);
      setPreview(null);
      setUploadedUrl("");
      setIsUploaded(false);
    },
  }));

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Generar vista previa
    setIsUploaded(false); // Reiniciar estado de subida al seleccionar una nueva imagen
  };

  // Subir la imagen
  const handleImageUpload = async () => {
    if (!image) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", image);

    try {
      const response = await fetch(
        "https://cartoonwarfastfood.com/upload_image.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUploadedUrl(data.url); // Guardar URL de la imagen subida
        onImageChange(data.url); // Pasar la URL al componente padre
        setPreview(null); // Limpiar vista previa
        setIsUploaded(true); // Marcar como subida
        alert("Imagen lista");
      } else {
        alert(data.error || "Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      {!isUploaded && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {preview && (
            <div>
              <h2>Vista previa:</h2>
              <img
                src={preview}
                alt="Vista previa"
                style={{ maxWidth: "300px" }}
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleImageUpload}
            className="mt-2 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
          >
            Confirmar Imagen
          </button>
        </>
      )}
      {isUploaded && (
        <div>
          <p>Completado</p>
          <p>Imagen lista: {uploadedUrl}</p>
        </div>
      )}
    </div>
  );
});

export default ImageUpload;
