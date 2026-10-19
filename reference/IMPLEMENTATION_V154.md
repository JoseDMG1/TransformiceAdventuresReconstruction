# Implementación v0.154 — recuperación del catálogo visual de ropa

## Cambio

Se recuperaron las imágenes de apariencia referidas por las 198 definiciones `ElementLook` conservadas de `data.bin`. El conjunto contiene 1.670 rutas únicas: 1.645 descargaron PNG válidos del CDN original y 25 siguen en HTTP 404. Los archivos se guardan bajo `dist/assets/original/equipement/` y cada resultado conserva URL, estado, tipo, tamaño y SHA-256 en `dist/assets/original/clothing-downloads.json`.

El proceso es reproducible con `npm run recover:clothing`. Deriva exclusivamente rutas `equipement/{code}/{part}.png` de los metadatos locales; limita la concurrencia, verifica tipo MIME y firma PNG, conserva errores y reintenta fallos transitorios. No inventa sustitutos para las rutas ausentes.

## Evidencia y límites

- El catálogo local `reference/original-data/animation-metadata.json` contiene 198 definiciones y sus nombres de piezas/pivotes.
- `reference/CLOTHING_ASSET_COVERAGE.md` resume la cobertura y enumera los 25 archivos que el CDN no entrega.
- Los nombres de piezas y las imágenes no recuperan la relación entre objeto de inventario, ranura original y apariencias primaria/secundaria. Esa asociación sigue dependiendo de un perfil/exportación del servidor.
- Esta recuperación amplía los recursos disponibles para futuros trabajos de apariencia/modding, pero el selector actual sigue usando solo los presets ya integrados. Por eso no se aumenta la estimación de fidelidad del juego en esta entrega.

## Persistencia y alcance

- No cambia el código de juego, el esquema ni los archivos de guardado.
- No agrega funciones online ni realiza solicitudes al servidor de gameplay; descarga únicamente rutas estáticas deterministas del CDN original.
- No se ejecutó el juego ni pruebas automatizadas en esta subtarea.
