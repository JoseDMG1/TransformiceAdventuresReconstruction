# Inventario inicial de fuentes — Transformice Adventures

Fecha de consulta: 2026-10-16. Este documento registra fuentes e indicios; todavía no incorpora recursos al juego reconstruido; sí incluye archivos de referencia recuperados desde el archivo del sitio.

## Fuente primaria añadida

Se añadió el vídeo `transformice-adventure-gameplay.mp4` (18:04, 640×360) y se documentó su recorrido con capturas muestreadas en [`GAMEPLAY_VIDEO_NOTES.md`](GAMEPLAY_VIDEO_NOTES.md). Muestra tutorial, aldea, menús, combate, recompensas y retorno a la aldea.

## Estado del repositorio

El directorio estaba vacío al iniciar esta recopilación.

## Hallazgo técnico: el sitio histórico archivó partes del cliente

El índice CDX de Internet Archive contiene 169 rutas únicas. Recuperé el bundle `tfmadv.js`, 62 archivos de módulos fuente con nombres legibles y 18 recursos de soporte en [`wayback-client/`](wayback-client/). El listado de capturas está en [`wayback-assets.json`](wayback-assets.json). Las rutas registradas no garantizan que todo el contenido dinámico o todos los objetos del juego estén preservados; verifica cada archivo, ya que Wayback puede devolver HTML de error.

Fuentes:
- [Índice CDX de Wayback](https://web.archive.org/cdx/search/cdx?url=transformice-adventures.com/%2A&output=json&filter=statuscode:200&collapse=urlkey)
- [Portada archivada, captura 2018-08-06](https://web.archive.org/web/20180806065112/http://transformice-adventures.com/)
- [Página actual del dominio](https://transformice-adventures.com/)

## Demo ejecutable

La demo oficial tuvo App ID 1061770 y está vinculada al producto 1040240. La ficha de Steam conserva el texto descriptivo, capturas, idiomas y relato del juego. Hoy el botón de descarga de Steam dice que el juego todavía no está disponible; no hemos verificado si los archivos de contenido siguen accesibles mediante el cliente Steam. La comunidad mantiene un proyecto de parches que confirma que la demo web estaba hecha en HTML5 y que hubo una build Steam, pero ese repositorio no es el juego original.

Fuentes:
- [Ficha del juego y demo en Steam](https://store.steampowered.com/app/1040240/Transformice_Adventures/)
- [SteamDB: demo App ID 1061770](https://steamdb.info/app/1061770/depots/)
- [Repositorio comunitario de parches](https://github.com/Hadaward/transformice-adventures)

## Referencias de diseño y gameplay

La ficha Steam describe: juego cooperativo con mazmorras, roles de trabajo, habilidades, tres regalos de Elisah tras cada encuentro, continuidad de dificultad, mascotas con habilidades y progresión, cosméticos y trama en las llanuras de Mouscarpone. El tráiler oficial aporta secuencias de movimiento, combate, personajes y escenarios. La wiki comunitaria recoge detalles de la demo, incluidos tutorial, interfaz de mazmorra, armas, talentos, mascotas y lugares.

Fuentes:
- [Tráiler oficial (Atelier 801)](https://www.youtube.com/watch?v=tQyQ9RRxD_w)
- [Wiki: tutorial e interfaz](https://transformiceadventures.fandom.com/wiki/Tutorial)
- [Wiki: mazmorras y ubicaciones](https://transformiceadventures.fandom.com/wiki/Dungeon)
- [Wiki: talentos](https://transformiceadventures.fandom.com/wiki/Talent)
- [Wiki: mascotas](https://transformiceadventures.fandom.com/wiki/Pets)
- [Wiki: experiencia y desbloqueos](https://transformiceadventures.fandom.com/wiki/Experience)
- [Galería de capturas (Retrorama)](https://retrorama.fr/en/game/transformice-adventures)
- [Galería/capturas (Kotaku)](https://kotaku.com/games/transformice-adventures/gallery/1)

## Historia de desarrollo

El diario oficial de junio de 2019 dice que la demo se cerraría temporalmente mientras el juego quedaba en pausa para retomar el desarrollo con un equipo más pequeño. Una discusión de Steam cita la cancelación de la campaña Kickstarter y el plan anunciado entonces. Esto significa que una reconstrucción del "juego entero" debe definir su referencia: demo pública observable o juego completo planeado. No hay evidencia pública de una versión final con todos los sistemas descritos en Steam.

Fuentes:
- [Diario de desarrollo de Atelier 801, junio de 2019](https://atelier801.com/topic?f=5&p=1&t=921505)
- [Campaña y FAQ de Kickstarter](https://www.kickstarter.com/projects/atelier801/transformice-adventures/faqs)

## Lo que aclara el código archivado

Los módulos fuente de la demo exponen controles y estructura real de la interfaz. Por ejemplo, `ClavierADV.js` vincula movimiento a D/flechas y Escape abre el menú; `InterfaceLoginADV.js` indica que la pantalla de entrada usa un fondo de hierba/campo, un logotipo, campos de cuenta y conexión Steam. También se recuperaron módulos separados de armas (arco, vendas, escudo, daga y espada), trabajos, interfaz de talentos, establo de mascotas, diálogo, mapa y recompensas. Esto permite mapear pantallas y acciones aunque no todos los archivos de arte dinámico se hayan preservado.

## Cobertura pendiente para lograr fidelidad

1. Confirmar y capturar la demo original: instalarla desde una fuente oficial si Steam la entrega, recorrer tutorial, aldea y mazmorras, y grabar las interacciones y pantallas.
2. Descargar de Wayback, con timestamp exacto, el cliente, configuración y todos los recursos que realmente estén archivados. Verificar qué incluye cada bundle; el CDX apunta a rutas pero no siempre las capturó.
3. Extraer fotogramas del tráiler y comparar la galería de Steam con los escenarios y personajes de la demo.
4. Registrar la wiki con fecha y separar mecánicas observadas en demo de características solo prometidas para el juego completo.
5. Marcar cada dato con fuente, confianza y estado (observado, documentado o inferido). Determinar permisos antes de reutilizar código, arte, música o marcas; el inventario solo sirve como referencia y no presupone licencia.

## Prioridad de fuentes

1. Demo original (comportamiento y contenido de la demo).
2. Cliente y recursos históricos de `transformice-adventures.com` vía Wayback (estructura y detalles técnicos).
3. Material oficial de Atelier 801 en Steam, Kickstarter, foro y tráiler (intención de diseño y contexto).
4. Wikis, galerías y videos comunitarios (cobertura adicional, a verificar).





Las capturas/versiones del bundle principal están listadas en [undle-captures.json](bundle-captures.json). El bundle recuperado es la captura 0.68.2.






## Desarrollo local v0.1

La primera versión jugable se encuentra en dist/. Puede iniciarse con Jugar.cmd o npm start. La ingeniería inversa con REA se documenta en REA_FINDINGS.md; la recuperación posterior del binario data.bin y de las animaciones originales está documentada en ASSET_RECOVERY.md. El alcance implementado y sus límites están en IMPLEMENTATION_V01.md.
