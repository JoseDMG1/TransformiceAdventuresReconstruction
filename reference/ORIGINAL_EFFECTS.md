# Efectos gráficos originales

Se siguió la skill REA reutilizando evidencia estática previa y el binario original decodificado. `original-data/animation-metadata.json` conserva IDs, clips, pivotes, secuencias, eventos, orientación y estiramiento de `data.bin`. Se recuperaron solamente rutas explícitas `@imagen` de esos clips: 184 PNG de 184 referencias, cero errores. `scripts/recover-effects.mjs` reproduce las descargas y `original-effects-downloads.json` conserva URL, SHA-256 y dimensiones. No se ejecutó el cliente histórico ni se modificó el manifiesto de animación principal.

## Formato para integrar

`dist/assets/original/effects.json` es JSON compacto con:

- `effects`: 60 entradas `{id, cache, clip, orientable, stretchable}` con el formato ClipAnim ya utilizado por el renderer.
- `summons`: siete criaturas originales `{id,cache,clip}`: ID8 caldero, ID9 trampa, ID24–28 plantas.
- `images`: lista de rutas relativas de los 184 PNG recuperados; resolver contra `./assets/original/`.

API implementada en `dist/original-animation.js`: `drawOriginalEffect(ctx,id,x,y,timeMS,scale=1,{once=false,rotation=0,facing=1,alpha=1}={})` y `drawOriginalSummon(ctx,id,animation,x,y,timeMS,facing=1,scale=1)`. Ambas devuelven false si falta el ID o un clip utilizable. `loadOriginalAnimations` carga effects.json e imágenes adicionales en mapas separados sin reemplazar criaturas existentes; si falta el paquete opcional, conserva el juego base.

Se reutiliza el renderer de clips A/I/C, conservando pivotes e interpolación. Los IDs de efecto y criatura pertenecen a espacios diferentes y no deben mezclarse. Para criaturas invocadas, seleccionar la animación nombrada del clip C. `once` limita la línea principal al último frame aunque el clip original marque loop; las subanimaciones mantienen su bucle interno dentro del tiempo limitado de la principal. La duración de vida original la controla el servidor. Ángulo en radianes; facing negativo refleja horizontalmente; alpha se limita a0–1.

## Selección útil

| Sistema | ID y clip principal | Frames |
| --- | --- | --- |
| Elixir | 57 fiole_botaniste.png, pivote[40,15]; 7 f1_pop; 13 nuage_soin; 15 nuage_poison | estático;120;110;91 |
| Plantas | 8 Ronce_Elixir;9 Pissenlit2;14 FleurPoisonFX;61 chardon_graine.png;85 engrais_magique_sol;86 engrais_magique |120;120;120;estático;121;125 |
| Veneno |2 HIT_poison7;3 poison_flaque.png;4 poison_flaque_nuage;11 DOT_poison;16 Zonepoison2;39 hit_test_poison;68 projectile_poison;69 projectile_poison_faible |42;estático;241;60;53;17;23;21 |
| Trampa |18 Pique1*;19 tissuvichy_particule;20 piege_choc_fx;21 Piege1;22 Piege4*;23 Piege3*;24 Piege6*;25 baluchon.png, pivote[84,36] |9;45;20;9;9;36;36;estático |
| Caldero |60 eponge;87 chaudron_fleche;88 chaudron_fleche3 |75;41;41 |
| Curación |26 hots;33 soinrecu;48 FXHEAL;75 projectile_buff_soin;108 zone_soin |40;40;58;23;121 |
| Cartas |41–44 carte1/2/3/4.png, pivote[15,10];62 Carte_trefle;63 Carte_coeur;76 Carte_carreau;77 Carte_pique;92 trefle1 |estáticos;39;31;31;21;21 |
| Desaparición |10 Poudre_disparition;93 Poudre_disparition_hit |160;165 |
| Periodista |17 FX_pages;50 temoignage_apparition;51 temoignage_disparition;72 Objectif;99–107 interface/temoignage/1–9.png, pivote[15,28] |75;75;48;121;estáticos |
| Otros |5 HIT_physique;12 Web |24;60 |

Las asociaciones de categoría se infieren de nombres y rutas; los IDs y clips son datos originales observados. Las reglas y el momento exacto de lanzamiento de cada habilidad siguen sujetos a evidencia de servidor/video. Las animaciones principales seleccionadas no contienen eventos de gameplay. Si se usa60fps como el renderer local, duración visual nominal=frames/60; eso no demuestra el cooldown ni la duración de la habilidad original.

## Fuente original adicional

Se recuperó `_monde/MoteurEffetSpeciauxADV.js` mediante la URL exacta declarada por import de MondeADV: `https://transformice-adventures.com/dist/Transformice-adventure-client/src/_monde/MoteurEffetSpeciauxADV.js`. Guardado en `original-data/MoteurEffetSpeciauxADV-2021.js`, 3000bytes, SHA-256 `fdf6421e8d68e502352381717781f7e9843bba5e25f6552439324b7559065470`. Se inspeccionó como texto; no se atribuye un Evidence ID nuevo de REA a esta lectura.

`afficherEffet:19–44` lee uint16 code, int16x/y y uint16 radio. El código de paquete1 genera quince instancias del **FX9**, escalas aleatorias0.5–1, distribuidas dentro del radio; pausa inicial `i*30ms` y destrucción al terminar animación. Esto sí establece un patrón visual concreto y distingue código de paquete del ID de clip. No establece que todos los FX usen ese patrón. Los demás FX del juego también pueden venir en mobiles y animaciones; esta fuente no recupera toda su lógica.

Los flags orientables de la selección son62,76,77,93. Todos conservan los flags originales en effects.json. No se ejecutaron tests en esta subtarea.
