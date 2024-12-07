import React from "react";

const ImageUploader = ({ image, previewUrl, onImageChange, onRemoveImage }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2" htmlFor="image">
        Adjuntar Imagen
      </label>
      {previewUrl && (
        <div className="mb-2">
          <img
            src={previewUrl}
            alt="Previsualización"
            className="w-32 h-32 object-cover"
          />
          <button
            type="button"
            onClick={onRemoveImage}
            className="text-red-500 text-sm"
          >
            Quitar imagen
          </button>
        </div>
      )}
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={onImageChange}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
};

export default ImageUploader;
