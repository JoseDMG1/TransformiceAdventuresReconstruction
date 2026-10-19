# Desarrollo local v0.91: plantas y sus interacciones

## Evidencia reutilizada

`comp.desc.1013` del catálogo español distingue Cardo ofensivo, Espinas que atraen ataques y reflejan daño tras crecer, y Lirio curativo. Los dones10206,10207,10208 vinculan Barbecho, Maleza pantanosa y Malas hierbas con Espinas. Los talentos49/51 describen crecimiento más rápido cerca de mascota y para Espinas. El talento54 añade curación al dueño cuando el Lirio cura a otro objetivo.

Se reutilizan los artefactos y la evidencia REA retenida, junto con `VIDEO_MECHANICS_V12.md` y `IMPLEMENTATION_V12.md`. No se ejecuta el cliente histórico. Los números y las fórmulas siguen siendo aproximaciones locales.

## Correcciones

- Los IDs históricos se mantienen por compatibilidad: `thorn` representa Cardo y `bramble` representa Espinas. Se documentan explícitamente en `plant-data.js`.
- Barbecho planta Espinas, mejora su salud y potencia localmente su reflejo. Antes plantaba y reforzaba Cardo. Se conservan los factores locales1.5 y el reflejo base25%; el original no especifica esas cifras.
- Maleza pantanosa aplica veneno desde Espinas. Malas hierbas genera Espinas en lugar del Cardo que aparecía antes.
- `enemy-targets.js` permite atraer ataques a Espinas, señuelos vivos y al caldero con el talento correspondiente. Los lirios y cardos siguen pudiendo sufrir impactos incidentales y áreas, pero no obtienen la atracción defensiva de Espinas.
- Los enemigos pueden seguir atacando una invocación válida cuando jugador y mascota están invisibles; antes solo se tenía en cuenta un señuelo de Desaparición en esa comprobación.
- Polinización utiliza el límite correcto de salud de cada planta, incluyendo crecimiento y Barbecho.
- Los talentos de velocidad actúan durante los dos crecimientos posteriores. Permacultura requiere otra planta viva próxima, sin exigir una maduración adicional no descrita en su texto.
- El Lirio escoge por salud relativa entre aliados válidos dentro de su propio radio. Una mascota caída no bloquea la curación del jugador, y un jugador herido lejos no impide curar a Picpic cerca.
- El exceso de curación del Lirio rosa beneficia con escudo al aliado curado, incluyendo a Picpic. La curación compartida del talento54 también puede generar exceso para el jugador.

## Venenos simultáneos

Las plantas escribían en el mismo estado que la daga y borraban sus marcas de daño de relámpago, acumulaciones finales y origen. `plant-effects.js` les proporciona temporizadores, daño y pulsos propios. Se mantienen4s,2 de daño por pulso, primer pulso a0.5s e intervalo1s como balance local. No se convierte el veneno vegetal en veneno de daga ni se consumen sus efectos especiales.

Los campos adicionales se validan y conservan en el guardado13; partidas previas reciben cero. `adventure.snapshot()` expone por separado los canales de veneno y el crecimiento/salud de plantas para diagnóstico de solo lectura.

## Estado

`npm run check`: sintaxis correcta en60 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Falta revisar en navegador los cambios posteriores a v0.81. Se mantienen abiertos los pendientes de fidelidad, las tablas y sectores originales, y online sigue excluido.
