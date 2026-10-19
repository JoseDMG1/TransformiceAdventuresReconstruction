# Implementación v0.186 — retrato del jugador con arte original

## Cambio

El emoji del panel de estado fue reemplazado por un retrato Canvas generado con el mismo renderer de ratón y los mismos datos de apariencia que usa el personaje jugable: color de pelaje, arma, mano secundaria y ropa equipada. El lienzo se actualiza durante el ciclo de dibujo y conserva la insignia de nivel.

No modifica animaciones de combate, controles, perfil ni guardado. Si los recursos originales aún están cargando, el retrato se dibuja cuando el renderer indica que están listos.

## Evidencia y procedencia

- El cliente usa composición de ratón y ropa mediante los recursos de `ClipAnim`/`Look`; el proyecto local ya reconstruye esa composición en el escenario y en el perfil.
- El fotograma `gameplay-frames/frame-1050.png` muestra la composición del personaje y su mascota en el retrato del perfil; el renderer integrado ya se coteja allí.
- La versión anterior mostraba un emoji genérico, que no reflejaba el pelaje, ropa o arma del personaje activo.

## Límite

El pequeño panel inferior es una adaptación local; el cliente original no demuestra ese mismo recuadro de retrato en esa ubicación. La mejora reutiliza arte original para evitar una cara genérica, pero todavía requiere cotejo visual en navegador.

Sin funciones online ni traducciones al francés.
