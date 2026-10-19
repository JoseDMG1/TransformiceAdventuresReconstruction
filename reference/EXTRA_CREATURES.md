# Criaturas y piezas originales recuperadas

Esta ampliación reutiliza el análisis estático real de REA `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`, cuya identidad y límites están en `rea-client-summary.json`. El módulo `_tfmAdventure/TFMAdventure.js:30` declara la biblioteca de piezas `equipement/`. La estructura de imágenes, animaciones, pivotes e identificadores procede del binario original `dist/assets/original/data.bin`, decodificado por `scripts/recover-assets-data.mjs` y conservado íntegramente en `original-data/animation-metadata.json`. No se ejecutó el cliente histórico.

`scripts/recover-extra-creatures.mjs` lee exclusivamente esas referencias explícitas y descarga sus rutas exactas desde la biblioteca declarada `https://data.atelier801.com/tfmadv/`. No enumera ni adivina rutas. Los resultados completos, dimensiones PNG y SHA-256 están en `original-data/extra-image-downloads.json`: 394 referencias, 386 PNG recuperados, ocho HTTP 404.

Las ocho rutas 404 se volvieron a consultar el 2026-10-18 y todas siguen respondiendo 404. El índice CDX de Internet Archive no devolvió capturas HTTP 200 para las rutas exactas. Véase [ASSET_AVAILABILITY.md](ASSET_AVAILABILITY.md) para el impacto en el jefe local ID45 y los otros recursos ausentes. No se usan texturas sustitutas sin evidencia de equivalencia.

| ID original | Fuente declarada | Offset del clip en binario inflado | Evidencia visual recuperada |
| --- | --- | --- | --- |
| 15 | monstre/araignee1boss/ | 647125 | 37 imágenes completas; corps1 196×193, pivote [86,95]; tete1 101×110, pivote [48,59] |
| 43 | monstre/araignee1boss2/ | 1018260 | 37 imágenes completas; corps1 196×193, pivote [86,95] |
| 44 | monstre/guepe1boss/ | 1042282 | 20 imágenes completas; abdomen5 152×173, tete1 82×76, pivote [49,39] |
| 46 | monstre/grenouille1boss/ | 1110404 | 30 imágenes completas; corps1 219×252, pivote [103,207] |
| 30 | monstre/araignee1niv2/ | 802361 | 23 imágenes completas; corps1 115×115, pivote [57,57] |
| 32 | monstre/guepe1niv2/ | 823931 | 18 imágenes completas; tete1 43×42, pivote [22,21] |
| 38 | monstre/grenouille1niv2/ | 874097 | 28 imágenes completas; corps1 96×83, pivote [33,59] |
| 41 | monstre/scarabee1niv2/ | 936412 | 27 imágenes completas; corps1 147×104, pivote [73,81] |

También se conservaron ID 17 (mandrágora), 45/47 (escarabajo jefe), 49 (rana acompañante) y 50 (avispa acompañante). ID17 carece de speedline.png; 45/47 carecen de corne2/3/4.png; 49 carece de ombre1.png; 50 carece de ombre.png y FXstun1/2.png. El renderer omite imágenes ausentes. La identidad de jefe se observa en las rutas; el orden original de encuentros, sus estadísticas y su IA no quedan establecidos por estos archivos.

El runtime `creatures.json` conserva 21 criaturas seleccionadas y 14 conjuntos de piezas, 2.47 MB en JSON compacto. El manifiesto `animation-image-downloads.json` incluye las descargas exitosas para el cargador existente. Los 21 IDs seleccionados ya estan habilitados en `dist/original-animation.js`; el manifiesto local registra las imagenes descargadas. La disponibilidad de un ID no demuestra que esa criatura apareciera en el gameplay observado.

## Piezas de equipamiento disponibles

Los códigos siguientes tienen todas sus piezas descargadas y sus pivotes originales conservados en `creatures.json`. Los nombres son categorías inferidas del nombre de pieza; no se atribuye un nombre comercial original.

| Código | Piezas observadas | Uso posible |
| --- | --- | --- |
| 5 | arme1, armemanche1 y FX | arma de una mano |
| 6 | bouclier1/2/3 | escudo |
| 8 | chapeau1/2/3/4 y variantes up | sombrero con dos capas |
| 11 | brazos, tunique1/2/3, hombros | vestimenta de cuerpo |
| 14 | cape1/2 y chapeau1/2/3/4 | capa y cabeza |
| 15 | bijou1 | adorno |
| 16 | arme1-e2m, armemanche1-e2m y FX | arma a dos manos |
| 17,18,26 | chapeau1/2/3/4 | sombreros alternativos |
| 20 | partes de arc y flecha | arco |
| 22 | arme1, armemanche1 | arma alternativa |
| 27 | tunique1/2/3 | túnica |

Para dibujarlas fielmente, se necesita ampliar la resolución de slots `#parte` del renderer: usar todas las piezas equipadas que coincidan con el slot y conservar sus pivotes y profundidad, además de las piezas base código2. Una sustitución global por nombre perdería capas (p. ej. brazo base y manga). El orden de los slots ya se observa en las animaciones originales. La interpolación y dimensiones se conservan; colores, nombres traducidos y disponibilidad original de estas prendas no se han establecido.
