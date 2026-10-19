# Implementacion v0.116

Fecha: 2026-10-17

## Compresion al recibir dano de Picpic

Al recibir dano, Picpic inicia la misma compresion vertical breve que ya se aplicaba a criaturas enemigas. Se calcula desde el instante del golpe y se recupera visualmente; no cambia salud, invulnerabilidad, movimiento ni guardado.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `MobileADV.effetTouche()` aplica escala vertical 0.5 a movil que no sea jugador principal, si no esta congelado.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ProtoADV.js`: el paquete de impacto se entrega al movil identificado.
- La velocidad de recuperacion es una interpolacion local compartida con el renderizado de enemigos, ya que el cliente archivado recibe la escala restaurada desde el servidor (`C_REBOND_MOBILE`) y no permite recuperar el reloj exacto de interpolacion.

## Validacion

`npm run check` correcto. No se ejecuto la suite ni un recorrido de navegador.
