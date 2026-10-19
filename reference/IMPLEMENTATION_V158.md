# Implementación v0.158 — cofre original y apertura animada

## Cambio

El cofre de Elisah ya usa las piezas y los clips originales del monstruo ID 14, recuperados a partir de `reference/original-data/animation-metadata.json`. El estado visible cerrado usa `statique`; al interactuar se reproduce `ouverture` durante sus 70 fotogramas y después aparece la selección de dones; el estado abierto usa `ouvert`. La animación se reproduce a 60 fotogramas por segundo, el reloj del renderer local.

Se recuperaron los seis PNG citados por el clip (`coffre1.png`–`coffre5.png` y `ombre.png`) desde las rutas exactas de `monstre/coffre1/`. El manifiesto de imágenes registra URL, tipo, tamaño y SHA-256. `npm run recover:chest` repite la recuperación desde el metadata conservado y añade ID 14 y esos recursos a los catálogos locales del renderer. Si el renderer no puede dibujar el clip, se mantiene el cofre Canvas como respaldo.

## Evidencia REA y del gameplay

- El metadata derivado del `data.bin` retenido identifica el monstruo `id: 14`, cache `MST14` y los estados `statique`, `ouvert` y `ouverture`.
- `statique` referencia sombra y cinco piezas; `ouvert` define el cofre abierto y `ouverture` dura exactamente 70 fotogramas.
- `reference/video-v12/frame-1040.png` muestra el cofre físico rojo/dorado de Elisah en la arena a 17:20; la captura por sí sola no permite medir la duración de la apertura.
- REA/metadata aportan composición, pivotes y duración. La asociación de `ouverture` con la interacción E se deriva del significado del estado y del flujo local; no se recuperó el mensaje de servidor que activaba el clip en la demo.

## Persistencia, alcance y verificación

- Sin cambios del esquema, versión o clave de guardado. El estado transitorio de apertura no se persiste; la oferta de dones sigue usando el guardado v13 existente.
- Cerrar la oferta conserva la oferta y deja el cofre abierto; volver a interactuar reabre la misma selección.
- No se añade funcionalidad online ni traducción al francés.
- Los seis recursos respondieron `200 image/png` y quedaron recuperados localmente. No se ejecutó el juego ni pruebas automatizadas; falta cotejar la escala final en navegador con el fotograma de referencia.
