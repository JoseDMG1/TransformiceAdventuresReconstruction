# Implementacion v0.133

Al cambiar de direccion, `MobileADV.versLaDroite()` pone `creature.scale.y = 0.9`. En el bucle del movil la escala vuelve hacia1 por fotograma con factor0.2. La reconstruccion ahora reproduce esa compresion y recuperacion para raton, enemigos y Picpic al invertir horizontalmente la orientacion.

Se unifico la recuperacion vertical con el squash de golpe (0.5) y reanimacion (0.6): el evento mas reciente define la escala inicial, que vuelve a1 con el mismo factor0.8 por fotograma. Esto evita multiplicar escalas cuando coinciden estados y refleja el hecho de que el original modifica una sola propiedad `scale.y`.

En la misma revision se encontro la tabla compilada de bibliotecas de sonido (`MoteurBibliothequeSonADV`): codigos1-4 y1000 asignan sonidos de ataque, muerte, toque y curso. Sin embargo, `MobileADV` recibe `codeBibliothequeSon` dentro de la serializacion de cada movil; ese dato no aparece en la evidencia local de sectores. No se asignaron muestras por tipo de enemigo para evitar una correspondencia inventada. Recuperar la tabla fue investigacion, no cambio de audio.

Evidencia: `reference/original-data/MobileADV-2021.js`, `versLaDroite()` (alrededor de la linea230) y bucle (alrededor de440); tabla de sonido extraida del bundle `reference/wayback-client/tfmadv.js`, asociada al modulo `MoteurBibliothequeSonADV`.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
