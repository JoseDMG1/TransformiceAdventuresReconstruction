# Entrega v0.10 · cierre y pausa

Fecha: 2026-10-16. El usuario pidió finalizar el bloque en curso y detener el desarrollo para revisarlo. No continuar hasta nueva instrucción.

## Cambios desde v0.7

| Bloque | Funcionalidad |
| --- | --- |
| Recompensas | Cofre con E después de limpiar; elegir/deselegir y confirmar don; oferta y selección persistentes; XP agrupada por encuentro |
| Presentación | XP animada, iconos originales de talentos/dones, ropa y armas originales por capas, vista previa de apariencia |
| Talentos | 14 árboles y 84 nombres/descripciones originales, efectos locales correspondientes y puntos devueltos de los árboles provisionales |
| Dones | 32 opciones originales con requisitos, incompatibilidades y efectos: multihit, cargas, veneno, penetración, barreras y habilidades |
| Mascota | Vida, daño, caída, curación/ayuda, nombre e invocación/retirada en aldea; interacciones de talentos y trabajos |
| Acciones | Incantación de vendaje de 1 s cancelable al moverse; cargas regenerables; plantas que maduran/alternan, trampas de disparo y caldero transportable |
| Audio | 75 MP3 originales locales; efectos integrados de XP, nivel, cofre, arma, arco, cura y bloqueo |
| Persistencia | Formato v10 con cargas, estados, proyectiles, venenos, efectos de campo, mascota, apariencia y don pendiente; misma clave local |

## Evidencia original

- [REA_PET_REWARDS.md](REA_PET_REWARDS.md): mensajes de salud/muerte/reanimación, establo, XP, cofre y confirmación. Evidencia `ev_a3138d73947b6f9ea98c6d58534cc96475c5af79ec790105947a5dd09792d891`.
- [TRANSLATION_RECOVERY.md](TRANSLATION_RECOVERY.md): Trad801 y endpoints reales español/francés. Evidencia `ev_b384c8ddf9355e911dc8c0fc7d857fb955734407b00671135b0c27d9786b491c`. Se recuperaron 84 talentos, 126 dones, 111 equipos, cuatro trabajos y 15 títulos.
- [CLOTHING_RENDERER.md](CLOTHING_RENDERER.md): piezas, slots, pivotes y capas. ClipAnim/Look originales recuperados refuerzan la composición; las profundidades son bytes con signo.
- [ORIGINAL_AUDIO.md](ORIGINAL_AUDIO.md): rutas exactas, hashes y límites del audio.
- [ORIGINAL_ICONS.md](ORIGINAL_ICONS.md): 326 recursos recuperados. Faltan dos referencias exactas, documentadas; no se adivinaron rutas de mascotas.
- [AUTHENTIC_GIFT_PLAN.md](AUTHENTIC_GIFT_PLAN.md): familias y primer lote de dones, con números locales separados del texto original.
- [MAP_RECOVERY_FOLLOWUP.md](MAP_RECOVERY_FOLLOWUP.md): los escenarios y colisiones siguen dependiendo de mensajes de servidor ausentes. Las claves de caché no son URLs descargables.

Las traducciones descargadas actualmente no fijan una versión histórica exacta. Agrupar talentos en bloques consecutivos de seis tiene apoyo semántico, pero no sustituye la tabla que enviaba el servidor. Cantidades, porcentajes, probabilidades, requisitos y tiempos no confirmados son balance local provisional.

## Compatibilidad

- Perfil, nivel, experiencia, monedas, mochila y equipo anteriores se conservan.
- Los tres talentos legacy permanecen. Los puntos gastados en los árboles inventados de v0.5–v0.7 quedan disponibles para aprender los árboles recuperados; se avisa al cargar.
- Un encuentro anterior continúa con su reparto antiguo de XP. Los encuentros nuevos agrupan la misma recompensa local al finalizar, evitando pagar de nuevo los enemigos ya derrotados.
- Los 15 dones anteriores permanecen reconocidos para reanudar partidas. Las nuevas ofertas priorizan los 32 originales implementados.
- Ofertas agotadas pueden repetir dones compatibles. Es una decisión local para permitir etapas sucesivas; no es una regla de servidor recuperada.
- Los seis accesorios estadísticos siguen siendo un catálogo local y su relación con las prendas es una asignación local.

## Comprobación del cierre

Se comprobó la sintaxis de los módulos. No se ejecutó un recorrido integral de navegador para esta entrega. Las pruebas históricas todavía esperan nueve árboles y selección de don con un clic: deben actualizarse antes de usarlas para certificar v0.10.

## Revisión sugerida

1. Abrir `Jugar.cmd`, recargar con Ctrl+F5 y continuar la partida.
2. En la aldea, T: revisar puntos y aprender talentos. I → Apariencia: revisar prendas y vista previa; I → Mascota: nombre e invocación.
3. M: iniciar un recorrido. Comprobar cargas y vendaje sin moverse; caminar durante la incantación debe cancelarla.
4. Al limpiar, acercarse al cofre central y pulsar E. Seleccionar sin confirmar, recargar y comprobar la elección. Confirmar una vez.
5. Revisar veneno con daga, trayectoria del arco y efectos de los dones obtenidos. El proyectil penetrante conserva los objetivos ya golpeados al guardar.
6. Revisar vida de mascota, ayuda con venda o E y las interacciones de plantas, trampa y caldero.

Pendientes completos y estado de pausa en HANDOFF.md. Online continúa fuera de alcance.
