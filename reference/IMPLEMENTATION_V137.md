# Implementación v0.137

La revisión del sonido de guardia encontró que el cliente original solicita literalmente `parade1`. El archivo público correspondiente también está disponible en el CDN original (`https://data.atelier801.com/tfmadv/sons/parade1.mp3`), así que se recuperó a `dist/assets/original/audio/parade1.mp3` y se registró en `dist/assets/original/audio/manifest.json`.

El reproductor local ahora carga esa muestra por su nombre real; se retiró el alias provisional a `metal1`. Tamaño recuperado: 3,342 bytes. SHA-256: `f9a8545fc53e2c8028e601e41dece43debd9d9d924e1bd87081ad33bf662cdca`.

La acción continúa reproduciendo el sonido a volumen `0.5`, como `ArmeBouclier.activation()` en el cliente archivado. No cambia el sonido de impacto, la animación, las cargas, el combate ni el formato de guardado.

Validación: descarga respondió HTTP 200 con `audio/mpeg`, 3,342 bytes; SHA-256 calculado al guardar y entrada revisada en el manifiesto local. No se ejecutaron pruebas ni se verificó el audio en el navegador.
