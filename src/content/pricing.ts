// ÚNICA fuente del precio y sus condiciones. No duplicar cifras en las páginas.
export const pricing = {
  amount: '39.90',
  amountNumber: 39.9,
  currency: 'S/',
  currencyCode: 'PEN',
  tax: 'IGV incluido',
  period: 'al mes',
  launch: 'Precio de lanzamiento',
  // Fin del lanzamiento y precio después. Quien se suscribe antes mantiene el de lanzamiento.
  launchUntil: '31/01/2027',
  launchUntilISO: '2027-01-31',
  regularAmount: '59.90',
  get regularPrice() {
    return `${this.currency}\u00a0${this.regularAmount}`; // espacio que no se parte: «S/» nunca queda solo al final de una línea
  },
  get launchShort() {
    return `${this.launch} hasta el ${this.launchUntil}`;
  },
  get launchTerms() {
    return `${this.launchShort}. Después, ${this.regularPrice} ${this.period}, ${this.tax}. Quien se suscriba antes mantiene ${this.price} mientras siga suscrito.`;
  },
  // Precio con moneda delante, como se escribe en Perú: «S/ 39.90»
  get price() {
    return `${this.currency}\u00a0${this.amount}`;
  },
  get full() {
    return `${this.price} ${this.period}, ${this.tax} (${this.launch.toLowerCase()} hasta el ${this.launchUntil})`;
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
