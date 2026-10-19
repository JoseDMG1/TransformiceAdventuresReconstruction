# Versión local 0.4 — trabajos y tercera habilidad

Fecha: 2026-10-16. El juego continúa siendo individual y local para navegador.

## Evidencia y decisiones

El módulo archivado `InterfaceMetierADV.js`, incluido en la investigación REA previa, distingue trabajo principal, trabajo secundario y dos identificadores de habilidad por trabajo. `InterfaceCompetenceADV.js` representa sus ranuras. El video aportado menciona nivel 10 para el trabajo secundario.

La documentación comunitaria describe cartas y desaparición para Tramposo, y reportaje, testimonios y entrevista para Periodista. Se consultaron [talentos](https://transformiceadventures.fandom.com/wiki/Talent) y [regalos de Elisah](https://transformiceadventures.fandom.com/wiki/%C3%89lisah%27s_gift). Las fuentes tienen una discrepancia: [Experience](https://transformiceadventures.fandom.com/wiki/Experience) enumera nivel 9 para el secundario, mientras [Tutorial](https://transformiceadventures.fandom.com/wiki/Tutorial) y el video señalan 10. Esta versión usa 10, centralizado en `SECONDARY_JOB_LEVEL`.

No se recuperaron estadísticas ni todas las reglas del servidor. La secuencia fija de cartas, sus valores, duración de ocultación, generación/activación de testimonios y efecto de entrevista son aproximaciones locales ajustables. Los cuatro trabajos principales se ofrecen libremente para probarlos; los desbloqueos originales del Tramposo/Periodista aún están pendientes.

## Contenido

- Tramposo: cuatro cartas que alternan daño, curación, aturdimiento y potencia; ocultación temporal que detiene la adquisición de ataques nuevos y mejora el siguiente impacto. Los proyectiles existentes todavía pueden golpear y revelar al jugador.
- Periodista: hasta tres testimonios de curación/fuego/rayo alrededor del jugador durante combate. Se activan por proximidad o Reportaje. Entrevista activa los cercanos y genera una zona temporal de daño/curación.
- Trabajo secundario: desde nivel 10, una de las dos habilidades de otro trabajo, activada con F/3. No puede duplicar el principal y solo se cambia en la aldea. Las dos habilidades principales se conservan.
- HUD: tercera ranura, cartas, nombres y enfriamientos dinámicos; indicador de ocultación/potencia.
- Guardado v4: trabajo secundario, habilidad elegida, enfriamiento, secuencia de cartas, estados y testimonios/entrevistas. Se admiten versiones 1–3 sin inventar una selección secundaria.

## Verificación y pendientes

Pruebas unitarias de selección/desbloqueo y migración, además de las de combate/persistencia previas. Chrome recorre el juego y comprueba cambio de trabajo, cartas, ocultación y fin al atacar, elección y uso de una habilidad secundaria, recarga con enfriamiento, generación/consumo de testimonio y entrevista persistente. La partida nivel 10 de estas pruebas se importa en el perfil aislado de QA; no modifica el progreso habitual del usuario.

Faltan el catálogo completo de regalos y talentos específico de estos trabajos, estadísticas originales, todos los tipos/condiciones de testimonios, interacciones avanzadas de mascota y sus cosméticos/efectos originales. Las interpretaciones locales de esta versión no cierran esos pendientes de fidelidad.
