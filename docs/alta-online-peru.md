# Alta online de Omyra Perú con Culqi Online · Lo que necesita la app

Este documento es para Sergio. La web de Perú (omyra.pe, repo `Omyra-es/omyra-webPE`) tiene el formulario de alta en
`/empieza`. **La web no cobra ni guarda claves:** abre el formulario de tarjeta de Culqi y manda el alta a la app, que es
quien crea la suscripción con la clave secreta. Perú y España van separados: otra cuenta de Culqi, otro precio y otros textos legales.

## Flujo
1. El cliente llena los 4 pasos de `/empieza` (cuenta, negocio, comprobante y revisión) y acepta las condiciones.
2. «Ir al pago» abre el checkout de Culqi en la propia página con la **clave pública** (`site.ts › signup.culqiPublicKey`)
   y monto 0 (solo captura de tarjeta, según la doc de suscripciones de Culqi). Culqi devuelve un token de tarjeta.
3. La web hace `POST` a `signup.endpoint` con el alta y el token (formato abajo).
4. **La app**, con la clave secreta:
   - crea el cliente, la tarjeta (con el token) y la suscripción al plan de S/ 39.90 mensual;
   - si Culqi pide **3D Secure**, devuelve a la web lo necesario para mostrar Culqi3DS y reintentar (a definir juntos);
   - crea la cuenta del negocio en Omyra y envía al cliente **sus accesos por correo** (la página `/gracias` lo anuncia);
   - responde `{ "ok": true }` → la web lleva a `https://omyra.pe/gracias`.
5. Webhooks de Culqi (CulqiPanel › Eventos › Webhook: Cargos y Suscripciones) → la app da o quita el acceso según los
   cobros mensuales y avisa al cliente si un cobro falla.
6. Cada cobro necesita su comprobante electrónico SUNAT: **factura** si el cliente dio RUC, **boleta** si dio DNI.

## Petición de la web a la app (propuesta)
```json
{
  "version": 1,
  "country": "PE",
  "culqiToken": "<token de Culqi>",
  "account": { "firstName": "", "lastName": "", "email": "", "phone": "+519XXXXXXXX" },
  "business": { "name": "", "sector": "", "teamSize": "", "city": "" },
  "billing": { "docType": "factura | boleta", "docNumber": "RUC (11) o DNI (8)", "legalName": "",
               "address": "", "district": "", "province": "", "department": "", "country": "PE" },
  "plan": "omyra-mensual-pe",
  "price": { "amount": "39.90", "currency": "PEN", "launchUntil": "2027-01-31" },
  "consent": { "terms": true, "termsVersion": "2026-11-pe", "privacy": true, "acceptedAt": "ISO-8601" },
  "source": { "page": "/empieza", "landingPage": "", "utm_source": "", "referrer": "" }
}
```
Respuestas que la web sabe mostrar: `200 {ok:true}` → /gracias · `409` cuenta ya existe · `422 {errors:{campo: mensaje}}`
→ marca el campo · `402 {message}` → tarjeta rechazada, se queda en el paso 4 · cualquier otro error → «No se te ha cobrado nada».

**La app debe repetir las validaciones**: RUC de 11 cifras con dígito verificador (módulo 11), DNI de 8 cifras, celular 9XXXXXXXX.

## Precio (decisión de la dueña)
S/ 39.90 al mes, IGV incluido, **precio de lanzamiento hasta el 31/01/2027**. Después, S/ 59.90. Quien se suscribe antes
mantiene S/ 39.90 mientras siga suscrito → conviene **un plan de Culqi de S/ 39.90** para estas altas y otro de S/ 59.90
para las posteriores. **El 01/02/2027 hay que cambiar el plan que usa la app** (y la web publica S/ 59.90).

## Lo que crea la dueña en Culqi
Cuenta con RUC 10 y cuenta bancaria · plan mensual S/ 39.90 (desde CulqiPanel o por API) · claves: la **pública** para la
web, la **secreta solo para la app** · webhooks hacia la URL que indique Sergio · primero todo en **modo prueba** (`pk_test`/`sk_test`).

## Puntos a confirmar en la documentación de Culqi antes de programar
- Checkout: la v4 «dejará de estar disponible pronto»; usar el **Checkout Custom** (docs.culqi.com › checkout-custom).
- Unidades de `amount` del plan (¿céntimos? 3990) e `interval_unit_time` para «mensual».
- Si la creación de la tarjeta dispara **3D Secure** y cómo se integra Culqi3DS.
- Nombres exactos de los eventos de webhook de suscripciones y cómo verificar su autenticidad.
- Yape no está documentado para suscripciones: el cobro mensual será solo con tarjeta.

Fuentes: docs.culqi.com › pagos-online › recurrencia › suscripciones (resumen, plan, suscripciones), checkout v4,
webhooks y culqi-3ds (consultadas el 20/11/2026).
