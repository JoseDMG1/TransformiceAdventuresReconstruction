# Implementacion v0.115

Fecha: 2026-10-17

## Sonido de impacto de criaturas

Los impactos directos de jugador, Picpic y criaturas ahora usan la muestra archivada `bibli/2/touche.mp3`. Se omite si el dano no llega al actor, si el impacto esta bloqueado para el jugador, o si es un pulso periodico sobre un enemigo. Respeta la opcion de silencio y el limitador de repeticion compartido por el reproductor de audio. No cambia daño, invulnerabilidad ni guardado.

El volumen local de la muestra se fija en 0.55 porque el cliente archivado delega su nivel a `MoteurBibliothequeSonADV`, cuyo codigo de mezcla no esta en el paquete recuperado. Ese nivel es una aproximacion; la muestra y el punto de reproduccion estan respaldados por el cliente archivado.

## Evidencia

- `reference/original-data/MobileADV-2021.js`: `MobileADV.effetTouche()` llama a `bibliothequeSon.sonTouche()` en impactos no bloqueados.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ProtoADV.js`: el paquete de impacto invoca `effetTouche()` en el movil correspondiente.
- `dist/assets/original/audio/bibli/2/touche.mp3`, listado tambien en `dist/assets/original/audio/manifest.json`.
- El cliente archivado no incluye la implementacion de la biblioteca sonora; el volumen exacto y su posible variacion por criatura siguen sin confirmarse.

## Validacion

`npm run check` correcto. No se ejecuto la suite ni un recorrido de navegador.
