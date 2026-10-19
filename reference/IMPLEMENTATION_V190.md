# Implementación v0.190 — menú de comandos de emote local

## Cambio

El botón de la pastilla de emotes ahora abre su propio menú vertical con los comandos originales **/hi**, **/sit** y **/dance**. La selección reproduce localmente los clips `emote_salut`, `emote_assis` y `emote_danse` del ratón original. La reproducción es temporal y solo afecta a la presentación: no altera combate, perfil ni guardado y no envía comandos.

El selector radial de diez iconos sigue abriéndose con **F** y conserva los sprites `T1.png`–`T10.png`. Al abrir un selector se cierra el otro; Escape, clic externo, diálogos y ventanas también los cierran.

## Evidencia REA

- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ClavierADV.js` asigna **F** a `InterfaceEmoteADV.afficher()`.
- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceEmoteADV.js` implementa el selector independiente de diez imágenes `interface/emote/T1.png`–`T10.png`.
- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/InterfaceCompetenceADV.js` asigna a la pastilla un menú distinto con `/hi`, `/sit` y `/dance`.
- El menú original presenta texto de 20 px, color `#EBDDC3`, contorno oscuro y separación vertical de 24 px sobre un fondo negro translúcido y redondeado. La reconstrucción adapta estas medidas a CSS; `police-nom` no está entre las fuentes recuperadas, así que usa Verdana como fallback disponible en la referencia.
- `reference/original-data/animation-metadata.json` identifica los clips 18–20: `emote_assis`, `emote_salut` y `emote_danse`.
- `dist/assets/original/creatures.json` conserva sus duraciones para el ratón ID2: sentarse 181 fotogramas en bucle, saludar 113 sin bucle y bailar 37 en bucle. Saludar usa sus 113 fotogramas originales; sentarse completa sus 181 fotogramas y bailar repite su ciclo hasta completar al menos dos segundos. Los límites de reproducción son una decisión local porque el cliente original recibía el comando de otro sistema.

## Persistencia y alcance

La animación se mantiene en una variable efímera de render y no forma parte del modelo de guardado. Los clips tienen prioridad visual durante su duración sin cancelar acciones ni cambiar sus resultados mecánicos. No se implementa red.

El porcentaje global permanece en 47% (rango 40–58%): todavía falta cotejar v0.190.0 en navegador contra el MP4 y la distribución/escala del menú contra el original. No se ejecutaron pruebas automatizadas ni una sesión de navegador durante este cambio.
