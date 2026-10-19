# Desarrollo local v0.103: duracion de animaciones de ataque

## Evidencia

Los metadatos recuperados en `dist/assets/original/creatures.json`, criatura de raton ID2, declaran las animaciones principales de ataque como clips no repetibles: `ambi_attaque1` dura42 fotogramas, `epee2m_attaque1` dura47 y `arc_tir` dura41. La reproduccion propia avanza estos clips a60 fotogramas por segundo. No contienen eventos de impacto que permitan derivar el balance del servidor.

## Cambio

- `original-animation.js` expone la cantidad de fotogramas de un estado recuperado y cachea la consulta.
- `art.js` deja que el clip continue a60 fps despues de que termina la resolucion local del golpe. Para arco, `arc_tir` empieza despues de la preparacion y completa sus41 fotogramas; `arc_charge` conserva su reloj. La direccion de ataque queda asociada al clip hasta terminar.
- No se alteran dano, alcance, preparacion, recuperacion, entradas ni estados de juego. Se anade solo el reloj visual efimero; no cambia el formato de partida. Los tiempos de accion siguen siendo aproximaciones locales.

## Comprobacion y limites

`npm run check` revisa la sintaxis de los modulos. No se ejecutaron pruebas de comportamiento ni un recorrido de navegador. La evidencia establece longitud visual de los clips, no la duracion real de los ataques ni el momento de impacto del servidor. El estado visual extendido es efimero y no se guarda. La reconstruccion sigue parcial y el online excluido.
