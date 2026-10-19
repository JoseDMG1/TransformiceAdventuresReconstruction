# Avance v0.12 · habilidades según descripciones originales

Checkpoint de desarrollo activo. El usuario autorizó continuar; no implica pausa ni finalización.

## Evidencia

Se reutilizó la skill REA y se realizó una investigación focalizada de calderos y cartas: `REA_COOK_CARDS.md`, evidencia `ev_861f1b9d4051117231e2e78d7073ef84fac0f44625f71b427a72cd8f1085f1b9`. Cinco fuentes seleccionadas, unos48KB, sin errores de parseo. Evidencia y descripciones originales ES/FR retenidas en `reference/rea-cook-cards/`.

`CHEF_INGREDIENT_ASSETS.md` documenta las fuentes adicionales y once PNG originales: los móviles100/101/102 representan ataque/defensa/curación. El caldero original muestra tres espacios; las imágenes concretas de alimentos y recetas usan IDs enviados por el servidor y no se adivinaron.

`VIDEO_MECHANICS_V12.md` conserva trece capturas nuevas del MP4 aportado. Confirma requisitos de120XP en nivel2 y160XP en nivel3; la fórmula completa sigue sin estar determinada por esas observaciones. No se extrapoló una curva a partir de dos números ni se afirmó que las muestras de Botánico demuestran reglas de Chef o cartas.

## Chef

- Al morir, los enemigos dejan ingredientes cuando está activo el Chef principal o secundario. La trampa aumenta localmente la posibilidad de uno adicional.
- La habilidad de caldero crea una entidad persistente en el encuentro; volver a usarla permite cargarlo/dejarlo. Clic o E cerca añade el ingrediente más próximo. X devuelve el último mientras aún recoge ingredientes.
- Al llegar a tres, cocina. La composición determina daño, curación y defensa en el área. Al terminar, clic/E limpia y cura al jugador y la mascota.
- El talento de mascota recoge ingredientes reales próximos al compañero, en vez de otorgar una mejora sin ingrediente existente.
- Se conservan fases, ingredientes, reloj y estado de transporte al guardar.
- Las cantidades, frecuencia de drops, duración8s y fórmula de combinación son reglas locales explícitas; ver `COOKING_LOCAL.md`. El cliente recibe el resultado de receta del servidor, no lo calcula. Los controles locales tampoco prueban la distribución original de herramientas entre manos.

## Periodista

- Informe recoge un testimonio próximo y lo almacena. Después de dos, la siguiente activación lanza sus efectos hacia el área apuntada.
- Entrevista consume un testimonio del suelo y coloca allí una zona del mismo tipo. La curativa cura; las ofensivas infligen daño.
- Los testimonios ya no se consumen automáticamente al caminar sobre ellos. La libreta se ve en el estado del HUD y sobrevive a recargas y cambios de encuentro dentro de la expedición.
- Los tres tipos y sus combinaciones son simplificaciones locales. El catálogo original muestra más tipos; falta recuperar las recetas exactas de Informe y todas sus interacciones.

## Estafador

- Picas y diamantes son proyectiles con historial de blancos. Picas atraviesa; diamantes inmoviliza y aturde al primer blanco según la descripción base.
- Corazones cura en el área apuntada. Tréboles potencia el siguiente ataque físico, en vez de todos los ataques de una ventana temporal.
- La descripción de habilidad y ciertos dones difieren sobre diamantes y daño directo de tréboles. Se mantiene como referencia la descripción de habilidad para la base y se documenta la ambigüedad; no se atribuye una versión histórica exacta a endpoints actuales.
- El orden cíclico de cartas sigue siendo local; no se recuperó una regla que pruebe sorteo o elección de una mano de tres cartas.

## Plantas

Cardo, zarza y lirio conservan roles separados. Permanecer cerca permite dos crecimientos; números, radios y tiempos son locales. La zarza absorbe ataques y refleja parte del daño cuando ha crecido. El daño reflejado conserva la fuente para evitar bucles de efectos.

Elixir ahora se lanza como frasco con trayectoria hasta el punto apuntado; la zona comienza al aterrizar, sin curar inmediatamente al lanzador. Se utiliza el sprite57 original y se conserva el vuelo al recargar. Los0.45s de vuelo son provisionales; comp.desc1006 confirma lanzamiento/impacto, no ese tiempo.

## Guardado y revisión

Formato v12 compatible con las partidas anteriores. Añade libreta de dos testimonios, tipo de proyectil de carta, ingredientes, estado del caldero y crecimiento de plantas. No vuelve a devolver talentos auténticos de v0.10/v0.11.

Comprobación de sintaxis, sin nuevas pruebas automatizadas ni recorrido integral de navegador. Las suites históricas no describen todavía las interfaces actuales.

Pendientes: ingredientes/recetas exactos de servidor, más tipos/combinaciones de testimonios, FX y eventos de habilidades completos,61dones restantes, curvaXP/desbloqueos, mapas originales y contraste visual/temporal más profundo con el MP4. El online sigue fuera del alcance.
