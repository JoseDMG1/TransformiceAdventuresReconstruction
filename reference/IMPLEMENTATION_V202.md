# v0.202 — explanada de la aldea

El camino ancho de contorno uniforme se sustituyó por una explanada amarillenta con cinco islas de césped de bordes irregulares y piedras claras de paso. El dibujo está en `dist/village-art.js`, llamado desde la generación del suelo de la aldea en `art.js`.

## Referencia y alcance

Los fotogramas del gameplay a 02:00 y 03:00 muestran suelo abierto amarillento, islas de césped con pequeños mechones en los bordes y piedras cerca de edificios/tableros. El nuevo trazado representa esos elementos. La posición, extensión y color son aproximaciones locales: no proceden de los payloads de sectores originales, que siguen ausentes.

| Evidencia | Captura |
| --- | --- |
| Original, 03:00: explanada e isla de césped | [frame-0180.jpg](gameplay-frames/frame-0180.jpg) |
| Original, 02:00: piedras de paso cerca de edificios | [frame-0120.jpg](gameplay-frames/frame-0120.jpg) |
| Antes, misma resolución local | [aldea v0.201](validation-v201/640/emote_danse.png) |
| Después, 640×360 | [aldea v0.202](validation-v202/village-640.png) |

Las capturas local/original tienen la misma resolución, pero no el mismo encuadre ni la misma geometría de edificios; no son una prueba de equivalencia por píxel. No se atribuye esta ilustración a arte original recuperado ni a una operación nueva de REA. La evidencia de capas/render conservada y la inspección del MP4 permiten mantenerla en la capa de suelo.

## Compatibilidad y validación

El módulo solo dibuja y restaura el contexto Canvas. No consume el generador aleatorio compartido ni altera objetos, NPC, interacciones, colisionadores o posiciones de partidas. Las piedras e islas son terreno plano decorativo, sin obstáculos nuevos.

- `npm run check`: sintaxis válida en 83 archivos.
- `npm run test:emotes -- --reference-size`: Chrome a 640×360; tutorial, rescate/reanudación, llegada a la aldea y comprobaciones de los menús aprobados sin excepciones. La captura posterior a los avisos de llegada permite inspeccionar la nueva explanada.
- Captura inspeccionada contra los dos fotogramas y la entrega anterior.

## Pendientes

Edificios, tableros, fuente, faroles, bancos, vegetación, escala y posiciones requieren cotejo por tramos. La fuente local todavía no tiene correspondencia acreditada en estos dos fotogramas; no se concluye de ello que no exista en otra parte de la aldea original. Falta reconstruir los límites de césped exactos y asociarlos a una cámara/posición comparables. La fidelidad global continúa estimada en 47%.
