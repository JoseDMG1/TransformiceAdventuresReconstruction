# Avance v0.20 · Vitamina

## Don original 1709

El catálogo recuperado describe que el objetivo recibe menos daño durante la curación. Al completar una venda, la implementación concede dos segundos de reducción de daño al jugador y también a Picpic si recibió esa misma curación. El porcentaje local provisional es 20 %.

El texto no especifica porcentaje ni duración. El efecto solo comienza cuando la venda se completa, no mientras el jugador está inmóvil durante la incantación; el texto del cliente no permite precisar ese instante. Se aplica a daño antes de calcular mitigación y respeta los límites de daño existentes.

## Persistencia

Los temporizadores nuevos `player.states.bandageGuard` y `pet.bandageGuard` se normalizan al cargar. No se cambia SAVE_VERSION: son campos opcionales, validados y compatibles con partidas anteriores. La partida se guarda inmediatamente tras completar la venda para preservar los temporizadores.

ID y descripción proceden del catálogo analizado previamente con REA; valores locales. Se regeneró `dist/gifts.js`; la comprobación de sintaxis se registra en el HANDOFF. No se ejecutaron pruebas automatizadas ni recorrido de navegador.
