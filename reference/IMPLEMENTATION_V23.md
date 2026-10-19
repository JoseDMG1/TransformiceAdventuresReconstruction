# Implementación v0.23 — Manga larga

## Cambio

Se añadió el don original 13001, **Manga larga**, al conjunto local de dones del Tramposo. Cuando el As de corazones cura a un aliado dentro de su radio, ese aliado recibe una carga de reflejo. El siguiente daño recibido consume la carga y devuelve al enemigo fuente el daño base del golpe. La carga del jugador y la de Picpic son independientes.

El efecto se señala mediante texto flotante en la activación y al reflejar el golpe. Los estados se normalizan y conservan en el guardado existente; el esquema no cambia.

## Evidencia y aproximaciones

La traducción original recuperada dice: “Los aliados afectados por el as de corazones devuelven el siguiente ataque recibido.” La evidencia REA ya retenida para el flujo de cartas (`ev_155ad2f58c9ecc4fa197168be037c238f4851d38f3962fb56fd5c38cbe06a71d`) confirma el contexto de las cartas y la ruta de habilidad del cliente inspeccionado, pero no acredita el efecto del servidor.

El radio y las curaciones usan los valores ya implementados para el As de corazones. Se devuelve el daño base previo a mitigaciones del aliado; no se recuperó la fórmula original de retorno. Solo se refleja cuando se identifica una fuente enemiga válida. Estas son aproximaciones locales, no balance original verificado.

## Estado y validación

- Catálogo local: 86 dones.
- `npm run check`: aprobado.
- `node --check scripts/build-gifts.mjs`: aprobado.
- No se ejecutaron pruebas automatizadas ni recorrido de navegador.
- Próximo paso de revisión: equipar el don, lanzar el As de corazones sobre jugador/Picpic y recibir golpes de ataques cuerpo a cuerpo y proyectiles; comprobar una carga por aliado y guardado/carga.
- El proyecto queda pausado por indicación del usuario tras este checkpoint.
