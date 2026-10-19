# Cobertura de imágenes de las apariencias originales

Actualizado: 2026-10-18. Recuperación local de recursos estáticos originales, asociada a v0.154.0.

## Resultado

El catálogo conservado en `original-data/animation-metadata.json` contiene **198 apariencias** y **1.670 rutas únicas** de piezas. Tras la recuperación, **1.645 rutas (98,5%)** tienen PNG válido descargado del CDN original. Sus archivos suman 5.067.709 bytes. Las 25 rutas restantes devolvieron HTTP 404 y no tienen sustituto local.

El manifiesto íntegro, con URL exacta, código de apariencia, pieza, estado HTTP, tipo de contenido, tamaño y SHA-256, está en `../dist/assets/original/clothing-downloads.json`. Las imágenes disponibles se encuentran bajo `../dist/assets/original/equipement/`.

| Código de apariencia | Piezas faltantes | Resultado |
| ---: | --- | --- |
| 4 | `jambes1.png`–`jambes6.png` | HTTP 404 en las seis rutas. |
| 13 | `tunique1.png`–`tunique3.png` | HTTP 404 en las tres rutas. |
| 84 | `FXshiny.png`, `FXstun1.png`, `FXstun2.png` | HTTP 404 en las tres rutas. |
| 86 | `FXshiny.png`, `FXstun1.png`, `FXstun2.png` | HTTP 404 en las tres rutas. |
| 87 | `FXshiny.png` | HTTP 404. |
| 88 | `FXshiny.png`, `FXstun1.png`, `FXstun2.png` | HTTP 404 en las tres rutas. |
| 89 | `FXshiny.png`, `FXstun1.png`, `FXstun2.png` | HTTP 404 en las tres rutas. |
| 154 | `brasavant7.png`, `brasavant8.png` | HTTP 404 en las dos rutas. |
| 185 | `brasavant8.png` | HTTP 404. |

## Reproducción

Desde la raíz del proyecto, `npm run recover:clothing` lee el catálogo local y consulta solo rutas que se derivan de `ElementLook`: `https://data.atelier801.com/tfmadv/equipement/{code}/{part}.png`. Descarga con ocho solicitudes simultáneas, comprueba `Content-Type` y firma PNG, escribe SHA-256 y actualiza el manifiesto cada 50 resultados. Las solicitudes fallidas no generan archivos falsos. Volver a ejecutarlo completa recursos ausentes si reaparecen en el CDN.

## Límite de uso en el juego

Recuperar el arte no recupera el mapeo del servidor entre objeto, `codeSlot` y apariencias primaria/secundaria. Por eso esta entrega solo amplía el banco local de recursos; no asigna automáticamente los 198 códigos al inventario ni altera los presets que aparecen en la partida. Para construir un catálogo equipable fiel hace falta una exportación/perfil original que conserve esas relaciones.
