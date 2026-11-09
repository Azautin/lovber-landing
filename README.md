# Lovber · Landing

Página de presentación de la app móvil. React + Vite + Framer Motion (JSX).

```powershell
cd landing
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera dist/
npm run preview   # sirve dist/
```

## Qué editar

| Qué | Dónde |
| --- | --- |
| Nombres y precios de los planes | `src/config.js` (`PLANS`) |
| Enlaces de tiendas, legales y lista de espera | variables `VITE_*` (copia `.env.example` a `.env`) |
| Textos | `src/components/*.jsx` |
| Colores y tipografía | `src/styles.css` (variables en `:root`) |

## Precios: qué es dato y qué es propuesta

- Se muestran tres planes: **Gratis**, uno de **USD 5/mes** y otro de **USD 10/mes**. Nombres y montos están en `src/config.js` («Lovber Plus» y «Lovber Pro» son nombres provisionales).
- Por ahora la landing **no describe qué incluye cada plan**: solo nombre, precio y «Detalles muy pronto». Tampoco publica cuotas ni marca qué funciones son de pago.
- Solo hay precio mensual. Debe coincidir con los productos reales de App Store, Google Play y RevenueCat antes de publicar. La página aclara que el precio final lo muestra la tienda.

## Contenido y fuente

Las secciones reflejan la app de `mobile/` (documentación en `mobile/docs/`, 17 de octubre de 2026): Hoy con el personaje, Mundo (notas por categoría, fechas, Bienestar), Planes (calendario e ideas), Recuerdos (fotos con película, rollo desechable, ideas de foto) y Juegos (Match, Sin filtro, Ruleta, Esto o aquello y Pregunta del día). Las maquetas de pantallas están en `src/components/Screens.jsx`; los estilos de las secciones nuevas, en `src/sections.css`. No se menciona el contenido +18 (apagado en producción).

## Honestidad del contenido

- Los botones de tienda dicen «Próximamente» hasta que se definan `VITE_APP_STORE_URL` y `VITE_PLAY_STORE_URL`.
- El formulario de lista de espera solo aparece si existe `VITE_WAITLIST_URL` (recibe `POST { email }`).
- No hay testimonios, cifras de usuarios ni valoraciones inventadas; las pantallas del teléfono son maquetas con datos de ejemplo.
- Las fotos «se quedan en el teléfono» refleja el comportamiento actual de la app (ver `mobile/docs/03_requerimientos_y_modulos.md`, §9).
- Las fotos de Recuerdos (`public/photos/`) son de Unsplash (licencia libre, sin obligación de atribución); las películas se aproximan con filtros CSS. Cambiarlas por fotos propias cuando las haya.
- El personaje se llama **Pinguitin**; en la barra de pestañas aparece sin nombre.

## Estructura de presentación (una sección a la vez)

La página se recorre como diapositivas. El detalle está en `src/components/Slide.jsx`:

- Cada `<section>` directa de `<main>` es una parada de scroll (`scroll-snap` en `styles.css`). Si una sección necesita varias paradas, lleva elementos `.snap-mark` dentro (así lo hace «Cómo funciona», una por paso).
- `useWheelSlides()` (en `App.jsx`) hace que cada gesto de rueda o trackpad pase a la parada siguiente con una transición de ~1 s. Dentro de una sección más alta que la pantalla el scroll es normal hasta su final. Teclado y pantallas táctiles usan el `scroll-snap` del navegador.
- Transición entre dos secciones: la de arriba usa `useStack()` (queda fija y recibe `covered` 0 → 1 mientras la tapan) y la de abajo `useEnter()` (0 → 1 mientras sube). Ambas van dentro de un `.deck`. Ejemplo: `Hero.jsx` + `Steps.jsx`.
- La barra es flotante en el inicio y ocupa todo el ancho en el resto. Una sección con fondo oscuro declara `data-nav="dark"` y la barra cambia de tema.
