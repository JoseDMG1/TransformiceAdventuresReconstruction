# Desarrollo local v0.98: bloqueo y aliados

## Evidencia y límites

El cliente archivado mantiene el escudo activado hasta soltar la entrada; su evidencia está en `REA_WEAPON_TRACE.md`. El catálogo español1503–1509 describe reflejo, recuperación de usos, curación, escudo temporal, bloqueo automático, daño almacenado y aumento del radio de protección de aliados.

El radio base80px y el coste por impacto protegido son decisiones locales. El texto de aumento de radio respalda una protección previa, pero no recupera la forma exacta del área, el coste por aliado ni todos los eventos de servidor. No se afirma equivalencia completa.

## Implementación

- `shields.js` comprueba mano secundaria y compatibilidad con el arma principal, evitando un bloqueo pasivo de escudo con arma de dos manos.
- El bloqueo normal requiere una carga y un ataque frontal. El automático de Aspecto de la serpiente conserva su probabilidad30% y no consume una carga, incluso sin guardia levantada.
- La protección de aliados dispone de radio base; Aspecto del cuervo lo amplía. Antes solo funcionaba si estaba ese don y no consumía cargas.
- Proteger a Picpic o a una invocación consume una carga por impacto, usando la misma resolución que el bloqueo propio. Es una regla local de coste consistente con el bloqueo del jugador.
- Los efectos del bloqueo están coordinados en una sola función: recuperación de carga, reflejo, curación, barrera y siguiente golpe reforzado. También se aplican al interceptar un ataque de un aliado. Esta resolución de dones al proteger aliados no se recuperó del servidor y queda explícitamente provisional.
- El daño bloqueado incluye la reducción del talento de bloqueo, antes de la armadura plana o defensas de área. Es la cantidad usada para las conversiones de dones.
- Tras resolver posibles devoluciones, una reserva vacía baja la guardia; no mantiene inmóvil al jugador hasta recibir otro golpe. Una mascota herida, inactiva o invulnerable no consume cargas por una protección que no recibiría.
- La ayuda del escudo explica la protección cercana y su consumo. No cambia la lógica de soltar botón/tecla, desenfocar o abrir menús.

## Estado

`npm run check`: sintaxis correcta en67 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. Sin cambios de formato de partida y online excluido. La fidelidad integral continúa pendiente.
