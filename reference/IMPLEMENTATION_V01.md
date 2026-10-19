# Primera versión local · 0.1

Implementada el 16 de octubre de 2026, para navegador de escritorio con teclado y ratón. El servidor solo sirve archivos; toda la simulación y persistencia están en el navegador.

## Aplicación de la evidencia

| Evidencia | Aplicación |
| --- | --- |
| REA, `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd` | WASD/flechas, dos manos de arma, menú Escape y organización de trabajos/regalos. Ver `REA_FINDINGS.md` para cobertura y limitaciones estáticas. |
| Video aportado (18:04) | Ciclo tutorial → aldea → bosque → encuentros/recompensas → regreso; compañero, jerarquía de la interfaz y composición de escenarios. |
| Imágenes públicas `data.atelier801.com/tfmadv/` | Logotipo, fondo e ilustración de entrada y accesos del HUD. Todas se sirven desde archivos locales. |
| `ressources/data.bin` público | Piezas de personajes, animaciones y pivotes. Parseado como datos inertes, sin ejecutar el cliente. Renderer Canvas propio de capas y keyframes. |

## Contenido implementado

Tutorial con compañero herido, vendas, tres enemigos y diálogo de viaje. Aldea con NPCs y selección de equipo/trabajo/talentos. Bosque de tres encuentros con jefe; una selección entre tres regalos tras cada encuentro; continuidad con dificultad creciente o retorno. Simulación local de armas, habilidades, efectos, daño, seguimiento/ataque de mascota, niveles y guardado.

Los valores de daño, enfriamiento, IA, experiencia y geometría son decisiones provisionales de implementación: el análisis estático del cliente no recuperó las reglas exactas del servidor. También son provisionales el repertorio de regalos y talentos, el uso del arco desde nivel 1 y los controles adicionales J/H/Q/R/E/Espacio. Los personajes originales se combinan con escenarios dibujados para esta versión.

## Verificación

`npm run check`: revisión sintáctica de módulos y servidor.

`npm run test:browser`: Chrome real con perfil aislado, entrada por teclado/ratón, render sin excepciones, movimiento, curación de Picpic, combate tutorial, diálogo con Papaille, llegada a la aldea, cambio de equipo y trabajo, los tres encuentros, selección de tres regalos, victoria contra el jefe, regreso, guardado y recuperación al recargar. Capturas de diagnóstico en `.local/`.

Resultado final: ambas comprobaciones pasaron. La prueba también verificó que los metadatos de animación y más de 180 piezas gráficas originales se cargan desde el servidor local. Se revisaron visualmente las capturas de la portada, el tutorial, la aldea y las recompensas. La prueba utiliza su propio perfil y no crea una partida en tu navegador habitual.

## Pendiente para fidelidad completa

Mapas/escenografía originales y su geometría, catálogo completo de equipo/cosméticos/trabajos/regalos, balance exacto y demás contenido de la demo. El escalado y algunas animaciones de ataque aún pueden diferir del video. El jefe utiliza una araña original ampliada. El prototipo no implementa networking ni cuentas remotas.
