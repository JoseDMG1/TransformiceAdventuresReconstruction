# Implementación v0.136

Al iniciar la guardia, el cliente original reproduce `parade1` a volumen `0.5` (`ArmeBouclier.activation`). La reconstrucción ahora emite ese evento de audio al levantar el escudo y utiliza el alias local `parade1` → `metal1`, que es la muestra de metal recuperada que ya servía como aproximación para `parade`.

El recurso exacto `parade1` no aparece en el manifiesto de muestras recuperadas. Por tanto, `metal1` es una sustitución local identificada, no una coincidencia demostrada del sonido original. La guardia, animación, bloqueo y cargas no cambian. El filtro de repetición de audio existente limita activaciones duplicadas.

Evidencia: `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeBouclier.js`, método `activation`, invoca `jouerSon("parade1", 0.5)`; `dist/assets/original/audio/manifest.json` enumera `metal1` y no `parade1`; `dist/audio.js` contiene el alias previo `parade` → `metal1`.

Validación: no se ejecutaron pruebas en esta entrega. Requiere comprobar el sonido al levantar el escudo y confirmar que el bloqueo posterior conserva su sonido independiente.
