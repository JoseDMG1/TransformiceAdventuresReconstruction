# Desarrollo local v0.97: rescate mediante elixir

## Evidencia

El catálogo español original contiene `obj_soins`: permite curar a la mascota caída para levantarla mediante vendaje o elixir. Se reutilizan ese artefacto y la evidencia REA de traducciones conservada. La composición exacta del encuentro y la salud al levantarse no se recuperaron del servidor.

## Implementación

- La zona curativa del elixir puede levantar a Picpic si está dentro de su radio. La variante de elixir sin curación sigue sin hacerlo. La distancia se calcula desde la zona; no se exige que el dueño esté también junto a la mascota.
- `healPet` solicita completar el rescate cuando una curación deja a Picpic de pie. La transición comprueba escena de tutorial, fase0 y mascota viva antes de cambiar a fase1.
- Los tres enemigos iniciales se crean solo si no hay un encuentro existente. Los pulsos sucesivos no vuelven a crear enemigos ni repiten la transición. No se añade una recompensa por cada curación.
- La venda conserva su canalización y consumo de carga; ya no contiene directamente la creación del encuentro. Su curación llega al mismo punto de transición que el elixir.
- La carga de una partida puede recuperar el caso antiguo de fase0 con mascota sana, conservando enemigos existentes y usando la misma comprobación de fase.
- Se conservó la recuperación completa de salud que el guion local ya concedía al rescatar por primera vez. Se aplica al rescate inicial con ambos métodos; fuera del tutorial el elixir solo cura su cantidad normal. La recuperación completa es una decisión del guion local, no un valor recuperado.
- `tutorial-data.js` registra las posiciones originales del prototipo y resuelve la instrucción del elixir con la ranura efectiva del personaje, incluida la secundaria. No presenta esas coordenadas como sectores originales.

## Estado

`npm run check`: sintaxis correcta en66 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. El formato de partida permanece en13. Online excluido; faltan datos originales y contraste integral de fidelidad.
