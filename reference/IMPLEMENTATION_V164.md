# Implementación v0.164 — composición fiel del árbol de talentos

## Cambio

La lista de ramas del panel de talentos ahora se presenta en una sola columna y cada rama usa la cenefa original `assets/original/interface/titre-talent.png`. La ventana se reduce a una proporción más cercana a la observada a 640×360; conserva un ancho mínimo adaptable para viewports pequeños. La composición de nodos mantiene los seis escalones en cuatro columnas, con parejas en las columnas 2 y 4.

No cambia el catálogo, los costes, los requisitos locales, los talentos adquiridos ni el esquema de guardado. Tampoco toca la lógica de redistribución ni añade comportamiento online.

## Evidencia

- En el fotograma `reference/video-v12/frame-380.png` (06:20), el panel original muestra dos árboles apilados en el lado izquierdo, con una cabecera ornamental de hojas; el detalle y la experiencia ocupan el panel derecho.
- El artefacto original estático `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceTalents.js`, función `afficherArbre()`, crea un contenedor vertical de ramas y utiliza `interface/titre-talent.png` como fondo del título.
- La reconstrucción ya tenía la cenefa original recuperada. Esta entrega corrige su composición CSS y reutiliza ese recurso.

## Verificación pendiente

No se ejecutó el juego ni pruebas. Falta cotejar la nueva ventana en navegador con la captura 640×360, especialmente ancho total, alto de ramas, legibilidad de la ficha y vista de tres ramas en la categoría Ratón. La puntuación global permanece en 47% hasta hacer esa comparación.
