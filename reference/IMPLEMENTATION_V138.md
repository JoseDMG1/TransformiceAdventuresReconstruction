# Implementación v0.138

Al dejar de defenderse, el cliente original ejecuta `jouerAnimation("statique", 0, true)`. Antes, el renderer local volvía inmediatamente a la pose de reposo genérica seleccionada por arma. Ahora guarda una marca transitoria de fin de guardia y presenta `statique` congelada en el primer fotograma. Al moverse, atacar o realizar otra acción, esa animación prevalece; al detenerse, vuelve a la pose estática.

Las salidas de la guardia usan una función común para cubrir liberación de H/clic derecho, agotamiento de cargas, pérdida de foco y cancelación por otra acción. La marca no se persiste; `persistence.js` ya restablece `guarding` a falso al cargar. No cambia el formato v13 ni las reglas de bloqueo.

Evidencia: `reference/original-data/MobileADV-2021.js`, `modeParade(false)`; `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeBouclier.js`, `desactivation()`; renderer local en `dist/art.js`.

Validación: no se ejecutaron pruebas en esta entrega. Requiere revisar visualmente levantar, mantener y soltar el escudo, y comprobar la transición desde la pose estática hacia movimiento/ataque.
