import { useState, forwardRef, useImperativeHandle } from "react";

const ImageUpload = forwardRef(({ onImageChange, currentImageUrl }, ref) => {
  const [image, setImage] = useState(null); // Archivo seleccionado
  const [preview, setPreview] = useState(currentImageUrl || null); // Prioriza la URL actual
  const [uploadedUrl, setUploadedUrl] = useState(currentImageUrl || ""); // Prioriza la URL actual
  const [isUploaded, setIsUploaded] = useState(!!currentImageUrl); // Marca como subida si existe una URL actual

  // Exponer reset al padre
  useImperativeHandle(ref, () => ({
    reset: () => {
      setImage(null);
      setPreview(currentImageUrl || null);
      setUploadedUrl(currentImageUrl || "");
      setIsUploaded(!!currentImageUrl);
    },
  }));

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Nueva vista previa
    setIsUploaded(false); // No está subida hasta confirmar
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
        setUploadedUrl(data.url); // URL de la imagen subida
        onImageChange(data.url); // Pasar URL al componente padre
        setPreview(null); // Limpiar vista previa temporal
        setIsUploaded(true); // Marcar como subida
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
          <h2>Imagen cargada:</h2>
          <p>URL: {uploadedUrl}</p>
        </div>
      )}
    </div>
  );
});

export default ImageUpload;
