# Implementación v0.161 — arbolito de hojas claras en el corredor

## Cambio

Se reutilizó el prop Canvas `sapling` en `bramble-passage`, en el borde derecho del pasillo. Queda ordenado por profundidad y no tiene colisión. No cambia el recorrido, el combate ni el guardado.

## Evidencia y límites

- `reference/video-v12/frame-840.png` (14:00) y `frame-900.png` (15:00) muestran una planta alta y delgada de hojas amarillas junto al lado derecho del encuadre.
- La colocación `(1200,530)` y escala `0.65` se trazaron por proporción con los tocones del mismo tramo. No son valores del sector original. Se reutiliza el prop del proyecto porque su silueta y paleta son una aproximación visual; no se recuperaron el identificador ni la clase de capa del objeto original.

## Persistencia y verificación

- Solo cambia decoración local; no altera el esquema de guardado ni partidas existentes.
- No añade funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas automatizadas. Falta cotejar ubicación, escala y oclusión en navegador contra ambos fotogramas.

