// Datos globales. Cambiar aquí se refleja en toda la web.
export const site = {
  name: 'Omyra',
  url: 'https://omyra.pe',
  description:
    'Software de reservas online y gestión de citas para negocios que trabajan con citas: agenda, equipo, clientes, pagos, bonos y promociones.',
  locale: 'es_PE',
  contact: {
    email: 'ventas@omyra.pe', // ventas y solicitudes de demo
    legalEmail: 'contacto@omyra.pe', // aviso legal, privacidad, cookies y derechos ARCO
    // Teléfono y WhatsApp de Perú: pendientes. Mientras sean null, la web no muestra enlaces de llamada ni de WhatsApp.
    phone: null as string | null,
    phoneHref: null as string | null,
    whatsappHref: null as string | null,
    location: 'Perú',
    country: 'Perú',
  },
};

export const nav = [
  { label: 'Funcionalidades', href: '/funcionalidades' },
  { label: 'Reservas online', href: '/reservas-online' },
  { label: 'Gestión del negocio', href: '/gestion-del-negocio' },
  { label: 'Precios', href: '/precios' },
  { label: 'Contacto', href: '/contacto' },
];

// Botones de toda la web. Cambiar aquí el texto o la dirección se refleja en todas las páginas.
export const cta = {
  start: { label: 'Empieza ahora', short: 'Empieza', href: '/empieza' },
  buy: { label: 'Contratar Omyra', href: '/empieza' },
  demo: { label: 'Solicitar una demo', href: '/contacto' },
  discover: { label: 'Descubrir Omyra', href: '/funcionalidades' },
};

export const legal = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Condiciones de contratación', href: '/condiciones-de-contratacion' },
  { label: 'Encargo del tratamiento', href: '/encargo-del-tratamiento' },
];

// Formulario de demo: mismo portal y formulario de HubSpot que España.
// Cada envío incluye el campo «country» = «Perú» y la página de origen (omyra.pe) para filtrar Perú y España en HubSpot.
// ID del portal y del formulario: datos públicos, no secretos. Envío directo, sin script de seguimiento.
export const hubspot = {
  portalId: '149137748' as string | null, // portal HubSpot de Omyra (centro de datos UE)
  formId: 'a18c31d2-a5aa-46a0-a8ea-9c0f17253cc3' as string | null, // «Solicitud de demo · Web»
  endpoint: 'https://api-eu1.hsforms.com/submissions/v3/integration/submit',
};

// Calendly de Perú (cuenta propia, distinta de la de España): enlace público del evento «Omyra Demo».
// Mientras sea null, la página de contacto muestra solo el formulario.
export const calendly = {
  url: 'https://calendly.com/reuniones-omyra-qnly/30min' as string | null,
};

// Alta online de Perú (/empieza). Perú y España van separados: aquí no hay datos ni cuentas de España.
export const signup = {
  termsVersion: '2026-11-pe',
  plan: 'omyra-mensual-pe',
  // Pasarela elegida: Culqi Online (formulario de tarjeta de Culqi dentro de omyra.pe + suscripción creada por la app).
  // Contrato con la app: docs/alta-online-peru.md. Mientras culqiPublicKey o endpoint sean null, «Ir al pago» guarda
  // el alta en HubSpot como «5 · Ir al pago» y muestra «Te contactamos para completar el pago» con el correo de ventas.
  culqiPublicKey: null as string | null, // clave PÚBLICA de Culqi (pk_test_… o pk_live_…). La secreta (sk_…) NUNCA va aquí.
  endpoint: null as string | null, // dirección de la app que recibe el alta y el token de Culqi (la programa Sergio)
  // Alternativa sin programar (no se usa con Culqi Online): enlace público de pago de una pasarela.
  paymentLink: null as string | null,
  // Nombre de la pasarela para el texto de seguridad del paso 4. null = texto genérico.
  paymentProvider: 'Culqi' as string | null,
  // Parámetro de la URL de pago para dejar el correo ya escrito, si la pasarela lo admite (p. ej. 'email'). null = no se añade.
  paymentEmailParam: null as string | null,
  // Después de pagar, la pasarela vuelve a https://omyra.pe/gracias; si cancela, a https://omyra.pe/empieza?pago=cancelado.
  // Panel de clientes de Perú: pendiente. Mientras sea null, /gracias no redirige y avisa de que los accesos llegan por correo.
  appWelcomeUrl: null as string | null,
};

// Altas a medias: mismo formulario de HubSpot que España («Alta iniciada · Web»), con country = «Perú»
// para separar los contactos (si el formulario rechazara «country», se reenvía sin él; la página omyra.pe lo identifica).
export const hubspotSignup = {
  formId: '11190f17-b3bb-4dd9-b24f-fee44d58cd8b' as string | null,
  country: 'Perú',
};
