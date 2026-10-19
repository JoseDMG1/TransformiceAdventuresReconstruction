# Simulación local del caldero

`dist/cooking.js` es un módulo de datos sin DOM. La evidencia original se conserva en REA_COOK_CARDS.md y CHEF_INGREDIENT_ASSETS.md: tipos0/1/2 de ataque/defensa/curación, tres espacios visuales, cocción y lavado, ingredientes soltados por enemigos y limpieza que cura jugador y mascota.

Las siguientes reglas son decisiones locales explícitas; no se recuperaron del servidor:

- Solo se añaden o retiran ingredientes durante collecting; máximo3; retirar devuelve el último.
- Añadir devuelve ready al reunir3. El módulo no inicia la receta automáticamente: el llamador usa startRecipe.
- startRecipe requiere3 y cambia a cooking durante8 segundos por defecto. El tiempo se puede configurar y se limita a0–3600 segundos; duración0 termina inmediatamente en dirty.
- La receta calcula daño4 por ingrediente de ataque, curación4 por ingrediente de curación y armadura0.1 por ingrediente de defensa. El nombre describe cantidades y categorías; no inventa nombres ni IDs de recetas originales.
- tickCauldron descuenta tiempo finito no negativo y cambia a dirty al terminar. finished se emite solo en esa transición.
- washCauldron solo acepta dirty, devuelve curación24+4 por ingrediente y restablece collecting. No aplica vida directamente; el motor decide receptores y límites de vida.
- wash se conserva como contador finito no negativo de0–3600; queda0 al iniciar o limpiar. No simula una duración original de lavado recuperada.

normalizeCauldronState crea un objeto nuevo con solo campos conocidos, descarta tipos inválidos, limita ingredientes a3 y normaliza números finitos. cooking sin tiempo pasa a dirty; un caldero sin ingredientes vuelve a collecting. Las operaciones mutan el objeto de estado entregado y devuelven resultados simples. Se espera un objeto mutable creado o normalizado mediante estas funciones.

recipeStats describe la composición tanto al recoger como al cocinar o estar sucio. El motor debe aplicar efectos únicamente en la fase prevista; consultar estadísticas no causa efectos ni consume ingredientes.

Actualizacion v0.93: `recipeEffects` aplica talentos y dones a una receta activa y devuelve dano, curacion y defensa efectivos. La conversion de curacion en dano usa la curacion calculada de la receta, antes de modificadores particulares de quien la recibe. Sin ingredientes curativos no se genera ese dano. Un estado importado con menos de tres ingredientes vuelve a recogida, conservando los ingredientes validos. La simulacion y la defensa de areas comparten este calculo.

No se modificaron game.js, persistencia ni pruebas. No se ejecutaron pruebas en este encargo.
