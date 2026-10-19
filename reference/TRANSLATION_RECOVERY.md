# Recuperación de traducciones originales

El bundle original `wayback-client/tfmadv.js` contiene Trad801 minificado (módulo Webpack 3). Su plantilla real es `//data.atelier801.com/trad/%1_%2`; inicializa el namespace `tfmadv`, convierte el idioma a minúsculas y añade un parámetro `?v=` de caché. El lector separa entradas mediante U+00A4 (`¤`) y divide cada entrada por su primer `=`. Preservamos literalmente los textos, incluso traducciones incompletas o peculiares.

Se recuperaron el 16 de octubre de 2026, por HTTP 200:

- `https://data.atelier801.com/trad/tfmadv_es`: 55771 bytes, SHA-256 `871ae343c79d40c711d43851980cc70ac525ed9c6e141a689c181eb330f21d5b`.
- `https://data.atelier801.com/trad/tfmadv_fr`: 59237 bytes, SHA-256 `19bf68140f39f01366cfa83226d4537ed5b775799dac2ddad04a28340da43ff2`.

## Archivos conservados

En `original-translations/`:

- `tfmadv_es.raw` y `tfmadv_fr.raw`: bytes exactos recibidos; procedencia y hashes en `manifest.json`.
- `tfmadv_es.json` y `tfmadv_fr.json`: mapas completos clave→texto, 1017 y 1019 claves respectivamente.
- `catalog_es.json` y `catalog_fr.json`: subconjunto de talentos, dones, equipo, estadísticas, títulos, trabajos, establo y mazmorras.
- `indices_es.json` y `indices_fr.json`: índices por ID, con nombres/descripciones y tabla separada de nombres de árboles.
- `Trad801.original-factory.txt`: fábrica original extraída; rango exacto y hash en `source-range.json`.
- `rea-input/Trad801.factory.js`: misma fábrica entre paréntesis con punto y coma para analizarla como expresión inerte, sin ejecutarla.
- `rea-evidence.json.gz` y `rea-summary.json`: análisis REA real focalizado sobre esa fábrica. No se repitió el árbol completo.

Evidence ID REA: `ev_b384c8ddf9355e911dc8c0fc7d857fb955734407b00671135b0c27d9786b491c`. Un JS, 3241 bytes, 1244 nodos AST, cero errores de sintaxis. El resultado automático no clasifica hallazgos de aplicación para esta fábrica aislada; la conclusión de URL y formato procede de lectura de sus bytes originales conservados, inventariados por REA.

## Catálogo recuperado

Ambos idiomas incluyen 84 talentos, 126 dones, 111 equipos, 13 tipos de estadística, 15 títulos y cuatro trabajos. Nombres oficiales españoles: trabajo 1 Botánico, 2 Chef, 3 Periodista, 4 Estafador.

Los árboles declarados son 1 Espada, 2 Daga, 3 Escudo, 4 Arco, 5 Vendaje, 21 Chef-Caldero, 22 Chef-Trampa de picnic, 23 Botánico-Elixir, 24 Botánico-Pulgar Verde, 25 Periodista-Informe, 26 Periodista-Entrevista, 27 Estafador-Truco de cartas, 28 Estafador-Vanish y 29 Mascota. Categorías 0 Armas, 1 Habilidades y 2 Ratón.

Los talentos 79–84 describen mejoras de mascota: resistencia creciente al estar herida, curación recibida, velocidad de ataque, intento de levantar al jugador caído, daño y salud máxima. En particular, el francés de talento 82 confirma explícitamente la intención de la mascota de levantar al jugador cuando está en el suelo. Eso no recupera alcance, tiempos, probabilidad ni cantidades.

Los talentos 1–6 describen espada: máximo de usos, alcance, cantidad de objetivos por ataque, recuperación de cargas, daño temporal al golpear tres enemigos simultáneos y oportunidad de no consumir carga al golpear un objetivo único. Los demás textos se encuentran completos en los índices; permiten reemplazar nombres y descripciones provisionales y orientar mecánicas sin inventar números.

## Correspondencias y límites

InterfaceTalents.js recibe del servidor árbol, cantidad, ID de cada talento y posesión/desbloqueo. Las traducciones tienen títulos de árbol y nodos, pero NO una relación explícita árbolID→talentoID. La agrupación secuencial de seis talentos por árbol (1–6 espada, 7–12 daga, etc.; 79–84 mascota) es una inferencia apoyada en textos y en los seis nodos dibujados por el cliente. No se presenta como tabla recibida del servidor.

La descarga actual no tiene fecha de versión embebida: que el endpoint siga activo no demuestra que todos sus textos coincidan con el video o la demo de 2019. Los textos describen intenciones y efectos; no prueban que cada elemento fuera obtenible ni recuperan balance, duraciones, probabilidades o condiciones completas. Los archivos RAW conservan exactamente la respuesta para reproducibilidad.

No se modificó el juego ni se ejecutaron pruebas. REA analizó texto inerte y no observó ejecución del cliente; sus relaciones de módulos y hechos estáticos no equivalen a comportamiento probado.
