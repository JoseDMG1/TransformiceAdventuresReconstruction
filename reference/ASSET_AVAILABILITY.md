# Recursos originales ausentes tras revalidación

Actualizado: 2026-10-18. Se consultaron únicamente las rutas explícitas registradas en los manifiestos locales. La respuesta 404 no se sustituyó por una imagen o sonido inventado.

## Imágenes

Las ocho rutas de `reference/original-data/extra-image-downloads.json` que ya constaban como HTTP 404 se volvieron a solicitar. Todas devolvieron HTTP 404 (`text/html`, respuesta de 169 bytes), no un PNG. La consulta exacta al índice CDX de Internet Archive tampoco encontró capturas HTTP 200 para estas rutas.

| Recurso | Propietario del clip original | Impacto conocido |
| --- | --- | --- |
| `monstre/scarabee1boss/corne2.png` | Criatura 45 | Parte del arte del jefe local Escarabajo acorazado. El renderer omite solo esta pieza. |
| `monstre/scarabee1boss/corne3.png` | Criatura 45 | Parte del arte del jefe local Escarabajo acorazado. El renderer omite solo esta pieza. |
| `monstre/scarabee1boss/corne4.png` | Criatura 45 | Parte del arte del jefe local Escarabajo acorazado. El renderer omite solo esta pieza. |
| `monstre/grenouille1bossadd/ombre1.png` | Rana acompañante de jefe | Sombra ausente; las otras piezas recuperadas se dibujan. |
| `monstre/guepe1bossadd/FXstun1.png` | Avispa acompañante de jefe | Una pieza del efecto de aturdimiento ausente. |
| `monstre/guepe1bossadd/FXstun2.png` | Avispa acompañante de jefe | Una pieza del efecto de aturdimiento ausente. |
| `monstre/guepe1bossadd/ombre.png` | Avispa acompañante de jefe | Sombra ausente. |
| `monstre/mandragore1/speedline.png` | Mandrágora | Efecto de velocidad ausente. |

Las texturas `corne2–4` están declaradas para el ID45 en `animation-metadata.json`; el archivo `corne1.png` y las piezas `corne5–8.png` sí existen, pero no se usan como sustitutos porque el cliente no declara equivalencias entre esas piezas.

## Audio

Las rutas exactas `https://data.atelier801.com/tfmadv/sons/sloutch1.mp3` y `.../sloutch2.mp3` continúan devolviendo HTTP 404 (`text/html`, 169 bytes). `data.bin` las registra como sonidos ID70 y ID71. No se encontró captura HTTP 200 en el CDX consultado ni una asociación de evento visible en el gameplay que justificara crear un alias local.

## Efecto para el desarrollo

### Ropa, revalidación de v0.215 (2026-10-26)

`clothing-downloads.json` registra 1670 piezas: 1645 PNG disponibles y 25 ausencias. Se volvieron a consultar únicamente esas 25 rutas declaradas y todas devolvieron HTTP 404. Afectan a nueve códigos visuales:

| Código visual | Piezas ausentes |
| --- | --- |
| 4 | `jambes1`–`jambes6` |
| 13 | `tunique1`–`tunique3` |
| 84, 86, 88, 89 | `FXshiny`, `FXstun1`, `FXstun2` en cada código |
| 87 | `FXshiny` |
| 154 | `brasavant7`, `brasavant8` |
| 185 | `brasavant8` |

Las rutas son `equipement/{código}/{pieza}.png` según el manifiesto. Algunas ausencias solo afectan a estados/efectos y no al retrato estático. El cargador diferido omite solicitudes de piezas ya declaradas como ausentes y permite dibujar las disponibles; no inventa sustitutos. Ver [atlas y validación](IMPLEMENTATION_V215.md).

El resto del manifiesto consultado conserva 386/394 imágenes adicionales, 577/577 imágenes del lote de animación, 44/44 imágenes de interfaz y 76/78 sonidos. Esta cuenta describe solo esos manifiestos; no demuestra que todo el CDN o todos los recursos del juego estén recuperados.

El ID45 del jefe usa tres piezas ausentes, por lo que su arte local es incompleto. Recuperarlas fielmente requiere una copia original de esos archivos; reutilizar otras piezas de cuerno sería una aproximación visual no respaldada. El resto de las ausencias corresponde a sombras o efectos de criaturas que no se identifican como objetivo inequívoco del MP4.
