# Ingredientes y recetas del chef: evidencia recuperada

Se reutilizó la evidencia REA estática previa y se inventariaron todas las entradas `monsters` y `effects` de `original-data/animation-metadata.json`, buscando fuentes, nombres de clips y nombres de piezas de alimentos/ingredientes/caldero/trampa. Se leyeron como texto módulos originales enlazados por imports; no se ejecutó el cliente ni se probaron IDs adivinados.

## Resultado

El paquete de animaciones inicial no contiene clips de alimentos identificables ni IDs de recetas. Contiene caldero criatura8, trampa9, FX18–25 de trampa y60/87/88 de caldero, ya recuperados en effects.json. El arte de cada ingrediente real se entrega por registros móviles y por números suministrados por el servidor.

Sin embargo, se recuperaron **once PNG originales completos** para categorías de ingredientes y barras del caldero. El manifiesto independiente `chef-ingredient-downloads.json` conserva URLs exactas, estado200, dimensiones y SHA-256. No se modificó el cargador ni manifiestos principales.

| Tipo móvil | Icono original | Dimensiones | Identidad visual observada |
| --- | --- | --- | --- |
|100|`cuisto/i/100.png`|20×20|espada roja: ataque|
|101|`cuisto/i/101.png`|16×20|escudo azul: defensa|
|102|`cuisto/i/102.png`|20×20|cruz verde: curación|

Las tres identidades se corroboraron visualizando los PNG originales. Para cada tipo se recuperó también `cuisto/i/z{tipo}.png` de60×60 (indicador del suelo) y `cuisto/i/i{tipo}.png` de400×400 (máscara de categoría usada por el caldero, blanca/transparente antes de tintado). Los archivos `interface/jauge-lavage.png` y `interface/jauge-cuisson.png` son31×42. No son dibujos concretos de comida y no deben presentarse como tales.

## Fuente nueva y formato

Las URLs exactas de módulos se construyeron desde imports explícitos de TFMAdventure y MobileADV:

- `https://transformice-adventures.com/dist/Transformice-adventure-client/src/_monde/_mobile/types/MobileMarmiteADV.js`: guardado `original-data/MobileMarmiteADV-2021.js`,8757bytes, SHA-256 `7b275a62457a37cd5ee708c1aad9afc2ab8f1b0cc7bfa621cd55fb27a8d8d086`.
- `https://transformice-adventures.com/dist/Transformice-adventure-client/src/_monde/_mobile/types/EffetMobileADV.js`: guardado `original-data/EffetMobileADV-2021.js`,4642bytes, SHA-256 `ea1020b522c0cc8f40bb04f42f76578140c9771c71216d56aaddac39dce542dd`.

Estas lecturas nuevas no se atribuyen a un nuevo Evidence ID REA. La versión pública puede diferir del cliente de2019.

`MobileADV-2021.js:1349–1350` registra como ingredientes móviles de tipo100–102. `EffetMobileADV:23–60` selecciona el ingrediente quieto más cercano a distancia cuadrada≤40000; dibuja `cuisto/i/{typeMobile}.png` con anchor[0.5,1], y=-40, y `cuisto/i/z{typeMobile}.png` con anchor[0.5,0.5] en el plano del suelo. La rotación de este último avanza `DUREE_IMAGE/100`.

`MobileMarmiteADV:25–27` declara literalmente máscaras i100/i101/i102. `majMarmite:47–94` limpia slots i0/i1/i2/e; lee uint8 codeRecette y equipa `cuisto/e/{codeRecette}.png` en e con anchor[0.5,0.5]; lee uint8 cantidad y por ingrediente uint8 tipo, uint8 imagen, equipando `cuisto/{imagen}m.png` en i0–i2. El tipo0 selecciona i100 y tinte0x531A00, tipo1 i101/tinte0x002253, tipo2 i102/tinte0x005332. Esto enlaza inequívocamente índice0/1/2 con tipo móvil100/101/102.

No se descargaron `cuisto/{imagen}m.png` ni `cuisto/e/{codeRecette}.png` porque no hay valores de imagen/receta recuperados que permitan escoger rutas exactas. El rango uint8 no autoriza afirmar que cada número corresponde a un archivo existente. Tampoco se identificaron alimentos por suposición.

## Correlación con habilidades

`rea-cook-cards/skill-descriptions.json` y las traducciones originales establecen comp.desc.1009: recoge ingredientes dejados por enemigos, cocina daño/curación/defensa según receta y después permite limpiar el caldero para curar jugador y mascota. Comp.desc.1012 pertenece al mazo del Tramposo, no a ingredientes: trébol potencia ataque, diamante inmoviliza/aturde, pica atraviesa enemigos y corazón cura. No debe usarse1012 como evidencia de recetas del chef.

El módulo `MoteurEffetSpeciauxADV-2021.js` sólo implementa explícitamente paquete de efecto1 como quince instancias del FX9 distribuidas en un radio; no enumera ingredientes ni recetas. La tabla de recetas, su cálculo, cantidades, duración y arte alimentario siguen sin recuperarse. El material nuevo sí permite sustituir indicadores locales por categorías originales con certeza alta. No se ejecutaron tests.
