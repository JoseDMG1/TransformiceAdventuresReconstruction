# Implementación v0.188 — emotes locales

## Cambio

Se integró el selector radial de diez emotes originales en la interfaz local. Se puede abrir con **F** o con el botón de emotes; las opciones usan `T1.png`–`T10.png` recuperadas del directorio de recursos original. Elegir una dibuja el emote al lado del ratón durante dos segundos, subiendo desde `y - 30` hasta `y - 60` con la curva de salida observada en el cliente.

La animación es efímera y vive solo en memoria. No se guarda, no se emite `S_EMOJI` ni se sincroniza con otros clientes. La tercera habilidad secundaria queda en la tecla **3**, para reservar **F** al emote como en el cliente original. El progreso y el formato de guardado no cambian.

## Evidencia REA

- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceEmoteADV.js` crea diez sprites desde `interface/emote/T1.png` a `T10.png`, los distribuye en radio 50 alrededor del cursor y selecciona un código al pulsar un icono.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ClavierADV.js` abre el selector con `KeyF`.
- `reference/wayback-client/dist/Transformice-adventure-client/src/_tfmAdventure/ProtoADV.js` muestra que el cliente original empaqueta el código para enviarlo y recibe códigos para dibujarlos en móviles. La reconstrucción local omite ambos caminos de red.
- Los diez PNG están archivados en `dist/assets/original/interface/emote/`; `manifest.json` registra tamaños y SHA-256.

## Alcance y validación pendiente

La expansión radial, botones, cierre con Escape/clic externo y animación local están implementados. Falta cotejar escala, distribución y posición en navegador contra una ejecución original comparable; la puntuación global de fidelidad no se modifica hasta ese cotejo. No se ejecutaron pruebas automatizadas ni una pasada de navegador en este cambio.
