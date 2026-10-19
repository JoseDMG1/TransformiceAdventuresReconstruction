# Rastros REA focales: dones de Periodista

Se reutilizó la evidencia completa ya conservada del artefacto histórico:

- Aplicación: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.
- SHA-256 del árbol analizado: `b1de32ffbe96f5c7715fb6fde4a82c35513789e597ee244e6da71e5d5c5c6288`.
- REA CLI 6.5.0 corrido con el loader local documentado en `REA_FINDINGS.md`, sin editar configuración o el paquete publicado.

## Búsqueda del don 12000

`trace_application_feature`, semilla literal `12000`, dirección `both`, no encontró entidades (`matched_seeds: 0`, `traced_nodes: 0`, coverage `no-match`). Evidence: `ev_dc97bf6a2a3840a1c4a15f4f103edcb7a6718a2dec728e155c25655f6f555803`.

La cobertura del grafo fuente es parcial; el resultado indica que ese literal no aparece en las entidades alcanzables del grafo retenido, no que Testimonio de muerte falte del juego ni que su comportamiento no exista. El catálogo español recuperado sí confirma el ID y el texto “Permite recoger testimonio de muerte”; el resultado posterior del testimonio sigue sin estar establecido.

## Módulo de competencias

Rastro de `dist/Transformice-adventure-client/src/gameplay/InterfaceCompetenceADV.js`, dirección `both`: dos coincidencias (módulo y asset), 198 nodos, 199 aristas y cinco caminos en cobertura parcial. Evidence: `ev_155ad2f58c9ecc4fa197168be037c238f4851d38f3962fb56fd5c38cbe06a71d`.

Es evidencia estática de relaciones del grafo, no prueba de ejecución. Los caminos alcanzan módulos adyacentes y hechos desconocidos; no establecen la mecánica de dones delegada al servidor. No se tomó el rastro como fundamento para inventar una regla de Testimonio de muerte.
