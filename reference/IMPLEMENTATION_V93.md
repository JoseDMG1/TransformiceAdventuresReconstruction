# Desarrollo local v0.93: efectos del caldero

## Evidencia y límites

Se reutilizan los artefactos y análisis REA de `REA_COOK_CARDS.md`, el catálogo español y los recursos de ingredientes documentados en `CHEF_INGREDIENT_ASSETS.md`. Se observan tres categorías y tres espacios. La tabla exacta de recetas sigue sin recuperarse: se conserva la combinación local descrita en `COOKING_LOCAL.md`.

Queso Juliana,11009, convierte los efectos curativos en daño; Queso frito,11008, causa fuego al añadir un ingrediente. Los talentos35/36 mejoran curación y daño. No se convierten las recetas ofensivas en un aumento de ataque inventado: se mantiene el daño del caldero que describe la habilidad.

## Implementación

- `recipeEffects` reúne curación, daño y defensa con sus talentos y dones. La curación se calcula una vez; la conversión a daño utiliza ese valor, en lugar de la constante2 que no representaba la receta. Los modificadores personales de curación recibida se aplican después y no forman parte de esta conversión local.
- Una receta sin componente curativo no obtiene daño de conversión por Queso Juliana. Las recetas de curación, ataque y defensa mantienen sus componentes separados.
- La defensa de áreas utiliza el mismo resultado que el caldero. Se conserva el límite defensivo local60%, además de los coeficientes ya existentes por ingrediente.
- `collectCauldronIngredient` coordina la adición tanto manual como por Picpic. Ambos caminos consumen el ingrediente, disparan el fuego del don si corresponde y comienzan la receta al completar tres. Antes la recogida automática omitía el fuego y duplicaba parte del flujo.
- La recogida automática guarda el resultado. La normalización de una receta incompleta vuelve a recogida y conserva los ingredientes válidos, en vez de permitir cocinar con menos de tres por un estado importado inconsistente.
- Se eliminó la segunda actualización de duración, edad y temporizador de ataque de `livingLeaf`. La actualización general ya realizaba esas operaciones; la hoja duraba la mitad de su tiempo configurado.

## Estado

`npm run check`: sintaxis correcta en61 archivos. No se añadieron ni ejecutaron pruebas de comportamiento en este lote. Falta recorrido en navegador de las incorporaciones posteriores a v0.81. Guardado13 compatible y online excluido. La reconstrucción todavía es parcial.
