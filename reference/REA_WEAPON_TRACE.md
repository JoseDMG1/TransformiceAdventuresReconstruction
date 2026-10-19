# REA — ciclo de vida de armas

Consulta realizada sobre la Evidence estática del cliente archivado, reutilizando su identidad de artefacto:

- Aplicación original: `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`.
- Rastreo REA de `ArmeEpee.js`: `ev_b5706481ee322c5908effe6faa0d46b10814fd37a54196af24c85d66c9c05dc6`; 2 seeds, 198 nodos, 199 relaciones, 5 caminos terminales. Cobertura parcial; 3 hechos no disponibles. El rastreo aporta grafo estático, no evidencia de ejecución.
- Código archivado: `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`, `ArmeEpee.js` y `ArmeBouclier.js`.

## Observaciones estáticas

- `ArmeADV` declara los estados `PRET`, `INCANTATION` y `ACTIF` y los transiciona desde un ciclo según pulsación, fin de preparación y desactivación.
- `activationInterne` rechaza una activación cuando han transcurrido 350 ms o menos desde la anterior.
- `ArmeEpee` configura la desactivación automática a `imageAttaque * 16.6666`; el valor base de `imageAttaque` es 10, alrededor de 167 ms.
- `ArmeBouclier` usa desactivación automática `-1` y termina al soltar el clic, de acuerdo con la observación estática del código.

El simulador local implementa el umbral de reactivación y estados explícitos, pero conserva sus ventanas actuales de impacto/animación (aproximaciones propias). El rastro y el cliente archivado no recuperan toda la autoridad del servidor ni prueban el equilibrio completo.
