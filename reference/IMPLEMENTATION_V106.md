# Desarrollo local v0.106: sonido y salida del arco

## Evidencia original y REA

El modulo archivado `gameplay/armes/ArmeArc.js` enlaza `arc1` al comienzo de la incantacion y lo detiene al interrumpirla, `arc2` al completar la carga y `arc0` cuando sale la flecha. Tambien fija `TEMPS_MARGE_TIR` en150 ms entre carga completa y disparo. REA ya analizo el cliente AMD archivado (ver `REA_FINDINGS.md`); esta secuencia se contrasto directamente en el archivo fuente retenido.

## Cambio local

- Arco reproduce las muestras originales `arc1`, `arc2` y `arc0` en esas fases; `audio.js` permite detener solo las voces de `arc1` al cancelar o abrir una ventana.
- `combat.js` aplica la espera local de150 ms entre carga y lanzamiento. El cooldown de entrenamiento sigue en su valor previo.
- No se modifican espada, daga, dano, alcance ni persistencia. La duracion de carga base del cliente local sigue siendo provisional.

## Comprobacion y limites

`npm run check` revisa sintaxis. No se ejecutaron pruebas de comportamiento ni un recorrido de navegador. La secuencia y margen provienen del cliente estatico; no se ejecutaron su bootstrap ni sus conexiones. Online continua excluido.
