# v0.148 — segundo tocón visible en el corredor

## Cambio

Se añadió un tocón pequeño a la izquierda del tocón grande del tramo local `bramble-passage`. Ambos aparecen en el fotograma 840 (aprox. 14:00) del gameplay aportado. El nuevo objeto es solo decoración: no añade colisión ni cambia el recorrido.

## Evidencia y límite

La captura `reference/gameplay-frames/frame-0840.jpg` muestra claramente dos superficies de tronco cortado en el borde superior: una grande cerca del centro y otra menor a su izquierda, junto a vegetación. La posición `x:705, y:405` y la escala `1.12` son trazadas visualmente en coordenadas locales; no son datos recuperados del paquete de sector, que sigue ausente. La escena de navegador requiere cotejo para ajustar colocación y escala.

## Compatibilidad

- No cambia colisiones, ruta, encuentros, lógica de combate ni guardado.
- La decoración se integra en los objetos fijos existentes del mapa; no cambia el esquema de datos persistidos.

## Verificación

Revisión estática del fotograma de referencia y de `bramble-passage`. No se ejecutó el juego ni una suite de pruebas; falta comparar esta escena en navegador.
