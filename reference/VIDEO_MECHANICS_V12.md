# Evidencia visual para v0.12

Fuente: `transformice-adventure-gameplay.mp4`, usuario, duración18:04.7 y resolución640×360 según metadatos previamente conservados. Inspección de capturas ya existentes y13 capturas nuevas con tiempo explícito en `reference/video-v12/`. No se ejecutó el juego reconstruido ni el cliente histórico. No se realizaron pruebas.

`ffmpeg` no está disponible en PATH y no se instaló. Las capturas nuevas se extrajeron mediante reproducción/seek del MP4 en Chrome instalado y `canvas.drawImage(video)`, con script `video-v12/extract.mjs`. El MP4 no se modificó. `player.html` es un visor local auxiliar con ruta absoluta a este MP4. Cada archivo `frame-N.png` corresponde a N segundos solicitados del vídeo; la imagen decodificada puede variar aproximadamente un frame en la búsqueda. La hoja de contacto anterior permite orientación, pero sus miniaturas no deben usarse para asignar tiempos exactos sin contrastar.

REA se reutiliza como evidencia estática independiente, según `REA_FINDINGS.md` y `REA_PROGRESS...` existentes; no hace falta invocarlo de nuevo para describir píxeles de un vídeo suministrado. Distingo abajo observación directa, contraste de implementación e inferencia.

## Observaciones con tiempo

| Tiempo | Imagen | Observación directa |
| --- | --- | --- |
| 01:00 | `gameplay-frames/frame-0060.jpg` | Papaille junto a carro/buey a la salida del bosque. Diálogo inferior ofrece viajar a Mouse Village. La ayuda de curar mascota sigue a la derecha. No es pantalla de viaje tipo selector de mazmorra. |
| 05:00 | `gameplay-frames/frame-0300.jpg` | Combate en claro con árboles grandes, jugador/mascota y criaturas diferenciadas. HUD inferior tiene dos habilidades circulares destacadas y una tercera ranura oscura. |
| 05:30 | `video-v12/frame-330.png` | Flores blancas y moradas están colocadas sobre el suelo junto a los combatientes; rana azul y criatura gris son visualmente distintas. Contador5 sobre una habilidad. La imagen no permite determinar duración ni daño exactos. |
| 05:50 | `video-v12/frame-350.png` | Ventana “Elisah's Gifts”: exactamente tres opciones visibles, Pollinating, Bee Team, Permaculture; botones Submit y Close separados. Pollinating: lirio cura automáticamente otras plantas cercanas; Bee Team: una abeja defiende plantas atacadas; Permaculture: plantas crecen por sí mismas cerca de otra planta. Son efectos de plantas, no mejoras genéricas de daño. |
| 06:20 | `video-v12/frame-380.png` | Ventana Talents abierta en el bosque, nivel2,5/120XP,1punto restante. Árboles Sword y Bandage; “Warrior's path”, recuperación de usos, coste3. Últimas parejas tienen candado. Botón está gris con1punto para coste3; esta imagen NO prueba una compra en expedición. |
| 07:00 | `video-v12/frame-420.png` | Plantas blancas/moradas entre varios enemigos; anillo naranja de área bajo combatientes y números de daño. No hay evidencia de que ese anillo sea exclusivamente Elixir: podría ser zona enemiga. |
| 07:30 | `video-v12/frame-450.png` | Anillo naranja bajo jugador y grupo enemigo; barra de habilidad muestra11. No extraer cooldown base exacto: podrían influir dones y momento de activación. |
| 08:00 | `gameplay-frames/frame-0480.jpg` / `video-v12/frame-480.png` | Zona azul circular visible bajo criatura grande; jugador separado. No identifica por sí sola el origen de la habilidad ni su efecto. |
| 08:30 | `video-v12/frame-510.png` | Talents nuevamente abierto dentro de bosque, nivel3,10/160XP,1punto; primer talento Sword verde. La progresión2→3 es observable, la fórmula completa no. |
| 09:00 | `video-v12/frame-540.png` | Dos áreas naranjas separadas, grupo de criaturas y números violetas. No reducir toda habilidad visual a un único círculo centrado en jugador. |
| 10:00 | `gameplay-frames/frame-0600.jpg` | Papaille habla con caja inferior: “It looks like someone had a hard time here.” Personaje sigue en escenario. Esto corrige la nota previa que situaba este diálogo aproximadamente06:00. |
| 12:00 | `gameplay-frames/frame-0720.jpg` | Tronco enorme oculta completamente personaje, pero barra y dos iconos verdes siguen visibles por encima. El árbol no se vuelve transparente uniformemente. |
| 14:00 | `video-v12/frame-840.png` | Camino natural estrecho entre árboles/zarzas que lleva al siguiente claro; jugador y mascota recorren terreno con continuidad visual. |
| 16:00–17:00 | `gameplay-frames/frame-0960.jpg`, `frame-1020.jpg` | Enemigo grande con caparazón/patas, laguna a la derecha y plantas de combate alrededor; diseño de arena específico, no intercambiable por círculo vacío. |
| 17:20 | `video-v12/frame-1040.png` | Cofre grande rojo/dorado físico en arena, mascota y flor morada al lado. No se ve menú de dones en ese frame. |
| 17:30 | `video-v12/frame-1050.png` | Perfil abierto en aldea: jugador nivel5, Pets:1; accesos de equipo y Talents; árbol/paleta originales, avatar rodeado de flores. |
| 18:00 | `gameplay-frames/frame-1080.jpg` | Texto objetivo: hablar con Mura para cambiar trabajo; secundario nivel10; cambiar trabajo es gratis. |

## Consecuencias concretas para prototipo v0.11

1. **Dones de plantas deben producir entidades/interacciones visibles.** Las tres ofertas de05:50 describen curar otras plantas, abeja defensora y crecimiento por proximidad. Subir daño, radio o vida genéricos no reproduce esos efectos. Contrastar IDs del catálogo original con `gifts.js`; la captura demuestra una oferta histórica concreta, no su probabilidad ni que deba aparecer siempre.

2. **Separar lirio, cardo y espinas.** El vídeo muestra al menos flores blancas/moradas diferenciadas y el catálogo original distingue tres conceptos. Es inferencia razonable mapear blanca a lirio y morada a cardo; no afirmar identidad final solo por color. La implementación local anterior lily/thorn y círculo compartido no representa toda esa variedad. Las flores son entidades dibujadas y persistentes durante combate, no solo partículas al activar.

3. **Varios claros conectados merecen navegación real.**14:00 enseña un corredor flanqueado por zarzas entre zonas. La arena regenerada al pasar cada encuentro no recrea ese recorrido. Mantener escenarios y conexiones según referencia, con cofre en su lugar físico. No se puede reconstruir geometría exacta de todos los caminos con estas pocas capturas.

4. **Oclusión por primer plano.**12:00 demuestra que el árbol puede tapar por completo al ratón mientras barras/estados siguen visibles. v0.143 quita la transparencia local del árbol y mantiene los indicadores en la capa dibujada después de los actores y el decorado. Esto reproduce el caso observado; no demuestra la regla para cada clase de objeto ni sustituye una comparación en navegador.

5. **Menús en expedición y candados de demo.** El vídeo abre talentos en bosque: a06:20 muestra nivel2 y un punto restante; a08:30 muestra nivel3, un punto restante y un nodo de espada verde que estaba gris en la captura anterior. Esto es consistente con haber aprendido un talento durante la expedición, aunque las capturas fijas no prueban el momento de compra. v0.142 permite aprender si los requisitos y puntos locales lo permiten; la redistribución sigue en la aldea. v0.144 rediseña el panel con las tres categorías, ramas compactas, ficha seleccionable, progreso y recursos originales visibles en las capturas. REA encontró que el cliente archivado habilita el botón según `modificationPossible` recibido del servidor y que el servidor decide `debloquable` por nodo. Además, `InterfaceTalents.js` pone candado y muestra `palierNonDisponibleDemo` en las posiciones de precio4, es decir, los dos nodos del último nivel. v0.163 refleja ese límite de la demo; otros requisitos siguen siendo locales.

6. **Ritmo de nivel como referencia, no fórmula recuperada.** El jugador pasa nivel2 a06:20, nivel3 a08:30 y nivel5 al regresar17:30; barras muestran120 y160XP necesarios en niveles2/3. Esto contradice una fórmula local80+(nivel−1)*45: produciría125 y170. La implementación v0.15 usa80+40*(nivel−1), coincidente con los dos requisitos observados. El umbral de nivel1 y la extrapolación a niveles posteriores no están confirmados. Ver `reference/IMPLEMENTATION_V15.md`.

7. **Caja de diálogo integrada y viaje con Papaille.** La transición tutorial/aldea se presenta como interacción con NPC, no teletransporte arbitrario de borde. Existe segunda interacción narrativa a10:00 durante recorrido. Falta conservar esa continuidad narrativa si el prototipo solo tiene primera conversación y luego combates consecutivos.

## Chef, cartas y Elixir: qué NO establece este muestreo

No hay una activación identificada inequívocamente como caldero/trampa de Chef o truco de cartas/Vanish en los frames revisados. El HUD y las plantas sugieren Botánico, pero eso es inferencia visual que debe corroborarse con nombres de habilidades o cambio de trabajo. No usar este vídeo para justificar que Chef cure instantáneamente, cartas roten en orden fijo, Vanish dure3s o Elixir tenga radio115/cooldown7s. Esas reglas deben apoyarse en cliente/catálogos originales y marcar cantidades locales.

Anillos naranjas o azules no bastan para asignar habilidad propia: aparecen bajo enemigos y pueden ser telegráficos de ataque. Para medir tiempos reales hace falta revisar secuencia continua con inicio/fin identificados; una captura con contador11 no establece cooldown máximo11. La evidencia actual sí permite corregir XP en dos niveles, representación de plantas, oferta concreta de dones y continuidad del mapa.

## Correcciones del inventario anterior

`GAMEPLAY_VIDEO_NOTES.md` se corrigió después de esta inspección: ahora registra el SHA-256 local verificado y sitúa el diálogo de Papaille a las10:00 según `frame-0600.jpg`. El inicio de expedición entre04:30/05:00 sigue siendo aproximado y requiere revisar la secuencia continua del MP4.
