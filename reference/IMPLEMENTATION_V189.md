# Implementación v0.189 — HUD despejado y barra centrada

## Cambio

Se retira del HUD de exploración el panel permanente local de retrato, nivel, vida y experiencia que ocupaba la esquina inferior izquierda. El perfil/equipo sigue disponible desde su acceso, las barras de vida continúan sobre los actores en combate y los avisos de experiencia conservan su comportamiento. La barra de acciones queda anclada al centro inferior incluso sin el panel lateral.

## Evidencia REA y gameplay

- `reference/gameplay-frames/frame-0010.jpg` y `frame-0480.jpg` muestran el mundo y los mensajes/chat en la esquina inferior izquierda; no aparece el panel local de retrato y estadísticas.
- `InterfaceCompetenceADV.js` crea la barra de competencias y posiciona su contenedor en el centro inferior (`x = LARGEUR / 2`, `y = HAUTEUR - 50`). Los accesos de perfil y mazmorra se gestionan por separado; el perfil abre `InterfaceJoueurADV`.
- El juego local ya representa salud sobre jugador/mascota durante las expediciones mediante `drawActorOverlay`. La información detallada sigue accesible en el perfil.

## Persistencia y límites

Solo cambia la presentación CSS. No cambia estado, controles, archivos guardados ni formato de guardado. Esta corrección sigue pendiente de cotejo con una captura local de navegador; no se actualiza el porcentaje global de fidelidad. No se ejecutaron pruebas ni una sesión de navegador.
