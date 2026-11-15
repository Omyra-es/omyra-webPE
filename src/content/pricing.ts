// ÚNICA fuente del precio y sus condiciones. No duplicar cifras en las páginas.
export const pricing = {
  amount: '39.90',
  amountNumber: 39.9,
  currency: 'S/',
  currencyCode: 'PEN',
  tax: 'IGV incluido',
  period: 'al mes',
  launch: 'Precio de lanzamiento',
  // Precio con moneda delante, como se escribe en Perú: «S/ 39.90»
  get price() {
    return `${this.currency} ${this.amount}`;
  },
  get full() {
    return `${this.price} ${this.period}, ${this.tax} (${this.launch.toLowerCase()})`;
  },
  included: [
    'Todas las funcionalidades',
    'Profesionales ilimitados',
    'Sin comisiones de Omyra por reserva',
    'Sin comisiones de Omyra por pagos',
    'Sin costo de implementación',
    'Sin permanencia',
    'Sin paquetes ni sobrecostos de mensajes',
  ],
  thirdParty:
    'La pasarela de pago con tarjeta, Meta (WhatsApp) o tu banco pueden aplicar sus propias condiciones y tarifas, independientes de Omyra.',
};
