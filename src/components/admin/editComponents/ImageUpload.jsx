import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

const ImageUpload = forwardRef(({ currentImageUrl, onImageSelect }, ref) => {
  const [preview, setPreview] = useState(currentImageUrl || null);
  const [image, setImage] = useState(null);

  // Actualizar preview si `currentImageUrl` cambia
  useEffect(() => {
    setPreview(currentImageUrl || null);
  }, [currentImageUrl]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setImage(null);
      setPreview(currentImageUrl || null);
      // Restablecer el valor del input file
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    },
  }));

  // Manejar selección de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Previsualización
      onImageSelect(file); // Pasar imagen al padre
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border rounded"
      />
      {preview && (
        <div>
          <h2>Vista previa:</h2>
          <img src={preview} alt="Vista previa" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
});

export default ImageUpload;
