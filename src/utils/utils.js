export function formatNumber(input) {

  // Convertir el input a string si es un número
  const numberString = typeof input === 'number' ? input.toString() : input;

 // Eliminar cualquier punto existente
 const cleanedNumberString = numberString.replace(/\./g, '');
  
 // Aplicar el formato con puntos
 return cleanedNumberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}