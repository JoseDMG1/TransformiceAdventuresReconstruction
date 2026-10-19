# Implementación v0.142

## Aprender talentos durante una expedición

El panel local permite adquirir un talento durante la expedición cuando los requisitos y puntos disponibles lo permiten. La redistribución continúa restringida a la aldea. El perfil se guarda al aprender, usando el formato actual; no se añade estado ni cambia `SAVE_VERSION`.

Al aprender un talento que aumenta la vida máxima, la diferencia de vida máxima se aplica al jugador y a Picpic con el mismo criterio de ajuste que ya usaba el panel. Los talentos restantes no alteran la salud actual por este cambio.

## Evidencia y grado de certeza

- Observación directa: `reference/video-v12/frame-380.png` muestra el panel de talentos durante el bosque, nivel 2 y un punto restante. `frame-510.png` muestra el panel otra vez en el bosque, nivel 3, un punto restante y un talento de espada verde que se ve gris en la captura anterior.
- Inferencia: el cambio de estado es consistente con haber aprendido un talento durante la expedición. Al ser capturas fijas, no se observa el instante de compra ni se puede excluir que el talento ya estuviera adquirido antes de entrar.
- Evidencia estática REA: `reference/REA_PROGRESSION_FINDINGS.md` registra que el cliente original habilita el botón de talentos según `modificationPossible`, un booleano del servidor. `InterfaceJoueurADV.js` no impone por sí mismo una condición de “solo en aldea”; el servidor define si la edición se permite en cada estado.
- Decisión local: para reproducir el recorrido mostrado, el panel permite aprender durante la expedición con los requisitos locales ya existentes. Los árboles, precios y balance siguen siendo aproximaciones donde no hay datos de servidor.

## Guardado y verificación

No se cambió el esquema del guardado. El árbol de talentos ya se serializa en el perfil y sobrevive a las transiciones/recargas existentes. No se ejecutaron pruebas ni un recorrido de navegador para esta entrega; hay que verificar la compra durante una partida, efectos de salud máxima y reanudación del guardado.
