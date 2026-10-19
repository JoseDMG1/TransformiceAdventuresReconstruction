# Avance v0.15 · progresión de experiencia

## Ajuste basado en el gameplay

Las capturas del video aportado muestran:

- 06:20: nivel 2 y barra `5/120 XP`.
- 08:30: nivel 3 y barra `10/160 XP`.

Los requisitos visibles contradicen la curva anterior `80 + 45 × (nivel - 1)`, que producía 125 y 170 XP para esos niveles. La curva local ahora usa `80 + 40 × (nivel - 1)`, reproduciendo ambos requisitos observados. El requisito de 80 XP para nivel 1 se conserva del prototipo y no está confirmado por esas dos capturas.

Los valores 120 y 160 son evidencia directa; una progresión lineal después de nivel 3 sigue siendo una extrapolación. El cliente recuperado delega la progresión al servidor, así que no se afirma que la fórmula completa original haya sido recuperada.

## Persistencia y revisión

No se modifica el formato v12. La experiencia guardada se mantiene y pasa a compararse con el nuevo requisito al dibujar la barra y otorgar niveles. `HANDOFF.md` conserva los pendientes de progresión restantes.

Comprobación sintáctica con `npm run check`. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
