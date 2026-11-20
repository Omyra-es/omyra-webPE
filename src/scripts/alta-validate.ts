// Validaciones del alta online de Perú. La app debe repetirlas en el servidor.

export const normalize = {
  doc: (v: string) => v.replace(/[\s.-]/g, ''),
  email: (v: string) => v.trim().toLowerCase(),
  // Celular peruano: 9 cifras que empiezan por 9, sin prefijo +51.
  phone: (v: string) => v.replace(/[\s().-]/g, '').replace(/^(\+51|0051|51(?=9\d{8}$))/, ''),
};

/** RUC de 11 cifras con su dígito verificador (módulo 11, pesos 5 4 3 2 7 6 5 4 3 2). */
export function isValidRuc(raw: string): boolean {
  const v = normalize.doc(raw);
  if (!/^(10|15|16|17|20)\d{9}$/.test(v)) return false;
  const w = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const sum = w.reduce((acc, k, i) => acc + k * Number(v[i]), 0);
  const dv = (11 - (sum % 11)) % 10; // 11 → 1 y 10 → 0
  return dv === Number(v[10]);
}

/** DNI: 8 cifras. */
export const isValidDni = (raw: string) => /^\d{8}$/.test(normalize.doc(raw));

const req = (msg: string) => (v: string) => (v ? '' : msg);

export const validators: Record<string, (v: string, all?: (n: string) => string) => string> = {
  firstName: req('Escribe tu nombre.'),
  lastName: req('Escribe tus apellidos.'),
  email: (v) => {
    if (!v) return 'Escribe tu correo electrónico.';
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? '' : 'Revisa el correo: parece que le falta algo (por ejemplo, «.com» o «.pe»).';
  },
  phone: (v) => {
    if (!v) return 'Escribe tu celular.';
    const p = normalize.phone(v);
    if (!/^\d{9}$/.test(p)) return 'El celular debe tener 9 cifras, por ejemplo 987 654 321.';
    return p.startsWith('9') ? '' : 'Escribe un celular: en Perú empieza por 9.';
  },
  businessName: req('Escribe el nombre de tu negocio.'),
  sector: req('Elige el sector de tu negocio.'),
  teamSize: req('Elige cuántas personas atienden.'),
  city: req('Escribe la ciudad o el distrito.'),
  docType: req('Elige si necesitas factura o boleta.'),
  docNumber: (v, all) => {
    const type = all?.('docType');
    if (type === 'boleta') {
      if (!v) return 'Escribe tu DNI.';
      return isValidDni(v) ? '' : 'El DNI tiene 8 cifras. Revisa los números.';
    }
    if (!v) return 'Escribe tu RUC.';
    const d = normalize.doc(v);
    if (!/^\d{11}$/.test(d)) return 'El RUC tiene 11 cifras, por ejemplo 20123456789.';
    if (!/^(10|15|16|17|20)/.test(d)) return 'El RUC empieza por 10 (persona con negocio) o por 20 (empresa). Revisa los números.';
    return isValidRuc(d) ? '' : 'Este RUC no es válido. Revisa los números: el último es un dígito de control.';
  },
  legalName: (v, all) => (v ? '' : all?.('docType') === 'boleta' ? 'Escribe tu nombre completo, como figura en tu DNI.' : 'Escribe la razón social, como figura en SUNAT.'),
  address: req('Escribe la dirección fiscal.'),
  department: req('Elige el departamento.'),
  province: req('Escribe la provincia.'),
  district: req('Escribe el distrito.'),
  terms: req('Para continuar, acepta las condiciones de contratación, el encargo del tratamiento y la política de privacidad.'),
};
