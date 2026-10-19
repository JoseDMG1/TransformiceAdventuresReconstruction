# Implementación v0.135

Al levantar el escudo, el cliente original inicia `parade-prep` o `paradeG-prep` según la mano y encadena `parade`/`paradeG` al terminar la preparación. El escudo secundario local ocupa la mano izquierda, así que ahora reproduce `paradeG-prep` y continúa en `paradeG` mientras se mantiene la guardia.

Los metadatos recuperados del ratón indican que ambas preparaciones tienen 16 fotogramas. La reconstrucción usa el reloj de 60 fps de su renderer (duración local aproximada: 267 ms), y mide la animación desde el inicio de la guardia en vez del reloj global. El cliente pasa velocidad `10`, pero su unidad exacta no está en los artefactos legibles recuperados; por eso no se presenta la duración calculada como tiempo original confirmado.

La marca temporal es efímera y no se guarda. `persistence.js` ya cancela la guardia al restaurar la partida, por lo que las partidas existentes y el formato v13 no cambian. No se alteran bloqueo, cargas, daño, movimiento ni reglas de guardado.

Evidencia estática: `reference/original-data/MobileADV-2021.js`, `MobileADV.modeParade`; `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeBouclier.js`, activación y desactivación del escudo; `reference/original-data/animation-metadata.json` y `dist/assets/original/creatures.json`, clips `parade-prep`/`paradeG-prep` de 16 fotogramas. El rastreo REA previo del cliente está documentado en `reference/REA_FINDINGS.md`; esta revisión usa los artefactos originales conservados y no repite el análisis amplio.

Validación: no se ejecutaron pruebas en esta entrega. Requiere comprobar en navegador el inicio, mantenimiento y liberación de la guardia con escudo.
