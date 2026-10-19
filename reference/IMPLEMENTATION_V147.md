# v0.147 — animación de combate en reposo del jefe

## Cambio

El jefe local usa el clip original `statique:combat` del escarabajo ID45 cuando está en combate, quieto y fuera de una acción prioritaria (telegráfico, recuperación, carga, aturdimiento, daño o muerte). El clip avanza con el reloj local y repite su ciclo.

## Evidencia y límite

`dist/assets/original/creatures.json` contiene `statique:combat` para los jefes ID45 e ID47 como animación en bucle de 181 fotogramas. El nombre y la definición sustentan su uso como pose animada de combate. No se recuperó evidencia del servidor que establezca exactamente cuándo cambiaba a ese estado; mantener su selección local identificada como aproximación. La variante de video no permite distinguir ID45 de ID47, y esta entrega no modifica esa elección.

## Alcance

- Solo cambia la presentación del jefe quieto en combate.
- No cambia patrones, daño, tiempos, objetivos, progresión ni datos persistidos.
- Los demás tipos de enemigo y las acciones prioritarias conservan sus clips actuales.

## Verificación

Revisión estática del cambio y de los metadatos originales. No se ejecutó el juego ni una suite de pruebas; falta cotejar el resultado en navegador.
