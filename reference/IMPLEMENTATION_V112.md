# Implementacion v0.112

Fecha: 2026-10-17

## Mira original del arco

La textura original `interface/zone/zl.png` ya estaba recuperada en `dist/assets/original/interface/zone/zl.png` y registrada en `dist/assets/original/manifest.json`. Se verifico que una descarga desde `https://data.atelier801.com/tfmadv/interface/zone/zl.png` tiene el mismo SHA-256 que el archivo local y el manifiesto: `bbb0043ece0885bfea8514e371751f17929982c22860cc3c476fcd9a0e6844ab`.

Se conecto al ciclo local del arco: aparece sobre el suelo mientras se carga o espera el margen de disparo, sigue el angulo actualizado del cursor, usa mezcla aditiva y sube su opacidad con el progreso de carga. Se oculta al interrumpir la accion o crear la flecha. El anclaje y la formula de progreso replican `ArmeArc.js` (`anchor.set(0.1, 0.5)`, `BLEND_MODES.ADD`, alpha ligado a la incantacion).

La carga base local permanece provisional, ya que el cliente recibe `tempsIncantation` mediante datos del servidor.

## Archivos

- `dist/game.js`: carga de la textura y renderizado de la mira original.
- `dist/assets/original/interface/zone/zl.png`: recurso original existente; no se duplico.
- `dist/assets/original/manifest.json`: procedencia y hash verificados.
- `package.json`, `HANDOFF.md`: version y pendientes.

## Fuente REA y codigo

- Evidencia REA archivada del cliente: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.
- Fuente enfocada: `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeArc.js`, creacion de `clipVisee` y metodo `boucle`.
- URL del recurso obtenida del propio modulo via `ConfigADV.DATA_TFMADV`.

## Validacion

`npm run check` correcto en69 archivos. SHA-256 del recurso coincide con la descarga y el manifiesto. No se hizo recorrido de navegador.
