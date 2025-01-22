export function formatNumber(number) {

  if (isNaN(number)) {
    console.log('No es un número', number);
    return '0';
  }

  if (typeof number === 'string') {
    number = parseInt(number);
    console.log('Paseado a int', number);
  }

  console.log('tipo de dato', typeof number);
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0 // Sin decimales
}).format(number);
}