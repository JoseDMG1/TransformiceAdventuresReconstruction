# Avance v0.22 · Portada

## Don original 14506

El texto recuperado indica que el tiempo de recuperación aumenta y que todos los testimonios visibles activan una entrevista. En la reconstrucción, Entrevista recoge todos los testimonios vivos dentro de 220 unidades del activador, consume cada uno y crea una zona con el tipo y reglas de entrevista actuales. El enfriamiento local aumenta 50 %.

El texto no especifica alcance de “visibles” ni cuánto aumenta el enfriamiento. Se reutiliza el radio de interacción actual de Periodista y un multiplicador provisional. La presentación de cada testimonio como su propia zona es una adaptación local; el servidor delega estos resultados.

## REA y persistencia

El ID y la descripción vienen del catálogo recuperado y analizado con REA. Se intentó un rastro focal de la cadena `12000`: el literal no tuvo coincidencias en el grafo (evidencia `ev_dc97bf6a2a3840a1c4a15f4f103edcb7a6718a2dec728e155c25655f6f555803`). El grafo de origen es parcial, así que esto no demuestra ausencia ni responde la mecánica de Testimonio de muerte.

Rastro REA de `InterfaceCompetenceADV.js`: `ev_155ad2f58c9ecc4fa197168be037c238f4851d38f3962fb56fd5c38cbe06a71d`, dos entidades coincidentes, 198 nodos/199 relaciones, cinco caminos, cobertura parcial. La relación estática no observa ejecución y no determina reglas del servidor. El dato de estos rastros se resume en `reference/REA_TRACE_JOURNALISM.md`.

No se añaden campos de guardado: las zonas de entrevista y el enfriamiento ya se serializan. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
