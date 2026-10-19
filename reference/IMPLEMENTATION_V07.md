# Entrega acumulada v0.5–v0.7

Fecha: 2026-10-16. Aplicación local para navegador. Versión distribuida: **0.7.0**; no se prepararon tres instalaciones separadas.

## Cambios funcionales

| Bloque | Implementación | Acceso |
| --- | --- | --- |
| v0.5 | Nueve árboles de seis nodos, cuatro niveles, costes por nivel, ramas alternativas, efectos en combate y redistribución confirmada | T, desde la aldea |
| v0.6 | Botín por victoria, mochila de 80 objetos, cabeza/túnica/amuleto, seis bases, común/raro, equipo confirmado, desequipar y vender | I → Mochila |
| v0.6 | Quince dones; se filtran los específicos de arco, cuerpo a cuerpo, escudo y cuatro trabajos por el equipo activo | Recompensa de encuentro |
| v0.7 | Recorrido corto de 3 o completo de 7 encuentros, ranas con saltos, variantes, jefes araña/avispa/rana y patrones anticipados | M, desde la aldea |
| v0.7 | Conservación de recargas entre salas, recompensa de limpieza marcada antes de guardar y validación del nuevo estado | Automático |

Los jefes cambian al continuar a la etapa siguiente: araña en etapa 1, avispa en etapa 2, rana en etapa 3; el ciclo se repite. El jefe aparece al final de cada recorrido, sea corto o completo. Las variantes visuales normales aparecen a partir de etapa 3.

## Ingeniería inversa utilizada

Se ejecutó REA de forma focalizada sobre siete módulos originales de talentos, perfil, recompensas, experiencia, equipo y protocolo. Informe: [REA_PROGRESSION_FINDINGS.md](REA_PROGRESSION_FINDINGS.md). Se conservan entradas, identidad, resumen y evidencia completa comprimida.

Evidencia: `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`.

El original confirma tres categorías de talentos y distribución de seis nodos en columnas 1/2/1/2. Los precios mostrados son 1/2/2/3/4/4; una alternativa hermana puede mostrar precio cero. Los requisitos efectivos los proporcionaba el servidor. El motor local elige requisitos y exclusión mutua para hacer jugable el sistema; **esas reglas no se recuperaron del servidor**.

Se recuperaron 386 PNG por referencias exactas del metadato de animaciones, con pivotes y jerarquías originales. [EXTRA_CREATURES.md](EXTRA_CREATURES.md) detalla procedencia, monstruos, ropa y ausencias. Se activaron en el renderer los jefes completos de araña/avispa/rana y variantes completas. Los accesorios nuevos de inventario son estadísticos, todavía no representan la ropa original recuperada.

## Formato y compatibilidad

- Guardado v7, misma clave local `tfma-local-v1`, sin reemplazar la partida habitual durante el desarrollo.
- Acepta versiones 1–7. Las versiones publicadas previas eran 1–4; no existen entregas separadas de v5/v6.
- `talentBuild`: mapa de ID de árbol a índices numéricos; se normaliza contra presupuesto, ramas y requisitos. El gasto de `talents` antiguo se descuenta hasta redistribuir voluntariamente.
- `inventory`: registros de ID, base, rango y calidad; nombres/valores se derivan del catálogo local, sin ejecutar contenido importado.
- `equipped`: IDs existentes, validados contra el slot correspondiente.
- `expeditions`: contador de victorias para identificar botín; volver a abrir una victoria no vuelve a otorgarlo.
- `encounters`: preferencia de duración. `journey.encounterCount`: duración de la expedición actual. Los guardados antiguos usan tres encuentros.
- `journey.encounterAwarded`: marca la bonificación de limpieza concedida antes del guardado de XP, evitando repetirla por recarga.
- Enemigos conservan variante, clase de jefe, patrón y salto en curso. Los dones nuevos pasan por la lista permitida del importador.

## Comprobación realizada

Comprobación de sintaxis de los módulos mediante `npm run check`. No se ejecutó un recorrido integral nuevo en Chrome para esta entrega; la validación jugable queda para la prueba del usuario. No confundir los resultados históricos de v0.4 con una certificación de v0.7.

El módulo de talentos incluye las pruebas aportadas durante su implementación. No se añadieron pruebas de inventario ni se amplió/ejecutó la suite integral en este cierre.

## Límites y próximos pasos

- Balance de talentos, dones, objetos, IA, economía y XP provisional. Armas y trabajos continúan libres para facilitar la prueba.
- Faltan catálogos originales de nombres/efectos y reglas de desbloqueo. El último nivel de talentos amplía lo disponible en la demo.
- Los mapas siguen siendo aproximados; faltan paquetes de sectores y sus catálogos, como explica MAP_RECOVERY.md.
- El don todavía se recibe con un clic; falta selección pendiente/confirmación y cofre interactivo del original.
- Falta componer ropa original por capas/profundidad y vincularla al inventario. El botín estadístico actual no debe confundirse con equipo auténtico.
- Mochila llena: no se añade otro objeto; se informa al completar la etapa. No hay almacén, descarte masivo ni compra.
- La mascota todavía no tiene el sistema completo de daño/curación original. También faltan estados, sonidos y patrones originales completos.
- Online sigue fuera del alcance solicitado.

## Recorrido sugerido para la prueba del usuario

1. Abrir Jugar.cmd, recargar con Ctrl+F5 y continuar la partida anterior.
2. En la aldea, T: aprender un talento, cambiar una alternativa al mismo coste y redistribuir si se desea liberar puntos antiguos.
3. M: completar el recorrido corto. Revisar regalo y objeto de victoria; recargar allí y comprobar que el objeto no se duplica.
4. Volver a la aldea. I → Mochila: ver el objeto, confirmar equipo, desequiparlo y venderlo.
5. M: elegir recorrido completo. Comprobar los siete encuentros y la recarga de la partida a mitad de expedición.
6. Continuar tras victoria hasta las etapas 2 y 3 para encontrar a los otros jefes. Observar las señales de proyectiles y de salto.
