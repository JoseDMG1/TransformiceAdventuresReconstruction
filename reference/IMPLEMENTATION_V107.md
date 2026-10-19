# Desarrollo local v0.107: sonidos de experiencia

## Evidencia original y REA

`reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/BarreXPADV.js`, analizado dentro del cliente archivado por REA, reproduce `xp` al inicializar la barra y `niveausup` cuando la animacion llega al umbral del nivel siguiente. La muestra recuperada `dist/assets/original/audio/xp.mp3` ya esta incluida en el catalogo local.

## Cambio

- Cada ganancia positiva reproduce `xp` a volumen relativo0.5, incluso si cruza un umbral de nivel.
- Si se cruza de nivel, `niveausup` se programa en el punto proporcional del recorrido visual de2 s, como la barra original; el reloj sigue durante ventanas locales. Ganancias que suben varios niveles producen un solo aviso de ascenso por concesion, como el `sonNiveauSupp` original.
- No se alteran puntos, niveles, guardado ni economia.

## Comprobacion y limites

`npm run check` revisa sintaxis. No se ejecutaron pruebas de comportamiento ni un recorrido de navegador. La secuencia y volumen proceden de llamadas estaticas del cliente; la progresion y el momento visual del nivel siguen siendo locales.
