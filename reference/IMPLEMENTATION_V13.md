# Avance v0.13 · dones botánicos

## Evidencia utilizada

Se reutilizó la extracción focalizada con REA del cliente y el catálogo español/francés retenido en `reference/original-translations/`. La captura `reference/video-v12/frame-350.png`, tomada a 05:50 del video, muestra la oferta original **Pollinating**, **Bee Team** y **Permaculture**, con sus descripciones. El catálogo confirma los IDs 10209, 10202 y 10201. No se infieren probabilidades de aparición ni valores de balance a partir de esa captura.

## Cambios

- scripts/build-gifts.mjs incorpora los dones originales 10201 Permacultura, 10202 Equipo de abeja, 10209 Polinizando y 10211 Lirio rosa de los valles, con el texto e icono auténticos. El catálogo resultante de dist/gifts.js contiene 69 dones ejecutables; los otros dones siguen pendientes.
- Las cuatro ofertas nuevas requieren Botánico principal o Botánico secundario con Pulgar Verde equipado. El cliente prueba que la oferta contiene requisitos/categoría, pero no que esas reglas locales de elegibilidad coincidan con el servidor.
- **Permacultura** permite el crecimiento pasivo de una planta madura cuando hay otra planta madura a menos de180 unidades. El intervalo de3s y la distancia son parámetros locales.
- **Equipo de abeja** crea una defensora cuando una planta recibe daño de un enemigo; persigue enemigos próximos y ataca cada 1.1s durante 5s. La conducta defensiva está confirmada por el texto original; daño, duración y ritmo son locales. El dibujo Canvas es provisional: no se recuperó un arte de abeja asociado a este don.
- **Polinizando** hace que un Lirio cure hasta3 puntos de vida a cada otra planta viva dentro de su radio, por pulso del Lirio. El catálogo confirma la relación de curación entre plantas, pero no esta cantidad ni frecuencia.
- **Lirio rosa de los valles** convierte en barrera el exceso de curación que reciba el jugador mediante el Lirio. El escudo usa el límite y duración generales de barrera del prototipo; el texto original confirma la conversión, no esos parámetros.
- El talento **Cosecha silvestre** conserva el aumento de alcance de ataque exclusivamente para Cardo. Antes se sumaba una vez al crear la planta y otra vez al buscar objetivos; ahora se aplica una sola vez. Lirio y Zarza usan el radio base.
- No cambió el formato de guardado. La lista de dones permitidos se deriva del catálogo importado, por lo que se preserva la compatibilidad de las partidas existentes.

## Estado y revisión

`package.json` y la versión del perfil local indican0.13. Se regeneró `dist/gifts.js` con el generador reproducible. Se comprobó la sintaxis con `npm run check`; no se ejecutaron pruebas automatizadas ni recorrido de navegador. Falta revisar las cuatro mecánicas jugándolas en el navegador.

## Pendiente

Quedan pendientes los dones 10203–10208 y 10210, el aumento numérico del Lirio rosa y los demás dones del catálogo. La abeja es una aproximación visual; sustituirla si se recupera el recurso original. Las ubicaciones/mapas originales siguen dependiendo de paquetes de sectores del servidor que no aparecen en los archivos recuperados; ver MAP_RECOVERY.md.
