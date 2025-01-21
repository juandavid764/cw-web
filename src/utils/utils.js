export function formatNumber(number) {
  if (typeof number === 'string') {
    number = parseFloat(number);
  }

   console.log('number', number);
  if (isNaN(number)) {
    throw new Error('El valor proporcionado no es un número válido');
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0 // Sin decimales
}).format(number);
}