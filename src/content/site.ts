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

export const cta = {
  demo: { label: 'Solicitar una demo', href: '/contacto' },
  discover: { label: 'Descubrir Omyra', href: '/funcionalidades' },
};

export const legal = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Cookies', href: '/cookies' },
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
