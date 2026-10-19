# Análisis de gameplay — vídeo aportado por el usuario

Fuente primaria añadida al proyecto: `transformice-adventure-gameplay.mp4` (SHA-256 `22068F776D8D31FDCCB04CC4E99F4D748D1A5F04A10E11F9267DD307F1E18D0D`). Inspeccionado el 2026-10-16. Metadatos: H.264 + AAC, 640×360, 30 fps, duración 1084.743 s (18:04.7). El clip comienza con gameplay activo, no con inicio de sesión o arranque del juego.

## Material visual de consulta

- [Hoja de contacto, una captura cada 30 s](gameplay-contact-sheet.jpg)
- [Capturas individuales muestreadas](gameplay-frames/)

Los nombres de las capturas usan el segundo del vídeo: `frame-0600.jpg` corresponde aproximadamente a 10:00. Las capturas individuales no son una grabación exhaustiva; consultar el MP4 para animaciones, transiciones y tiempo de respuesta.

## Recorrido observado

| Tiempo aproximado | Evidencia visible |
| --- | --- |
| 00:00–01:20 | Tutorial en un bosque denso. El texto de ayuda indica curar a la mascota en el suelo con una venda; el jugador usa/selecciona habilidades y se mueve con su mascota. Hay un objetivo tutorial en texto pequeño a la derecha. |
| 01:30–04:00 | Llegada y recorrido por la aldea: plaza abierta, edificios de madera, tablón de anuncios, faroles, NPCs y otros ratones. Se abren la ventana de talentos (pestañas de armas, habilidades y ratón; árbol de mascota) y la pantalla de selección de mazmorra con huecos de grupo y botones para buscar jugadores o comenzar. |
| 04:00–09:59 | Inicio de la expedición al bosque; encuentros con grupos de criaturas, combate entre vegetación, troncos y hongos, regalos de Elisah y apertura del árbol de talentos. |
| ~10:00 | Diálogo con Papaille: “It looks like someone had a hard time here.” La cámara y el personaje quedan integrados en la escena, con caja de diálogo inferior (`frame-0600.jpg`). |
| 10:00–13:00 | Varios encuentros con enemigos de tamaños y colores distintos; se ven números de daño, estados/indicadores sobre aliados y efectos de habilidades. El encuadre sigue al jugador y, a veces, árboles del primer plano tapan parte de la acción. |
| 13:00–17:30 | Continúa la expedición; aparecen enemigos grandes tipo escarabajo/insecto y un enemigo grande con caparazón/patas en una arena con vegetación y agua. Se repiten combate, pausa de selección de regalo y desplazamiento entre áreas. |
| 17:00–17:20 | En `gameplay-frames/frame-1020.jpg` y `video-v12/frame-1040.png` una silueta estrecha ramificada con hojas verde-amarillas ocupa el primer plano, delante del claro y a la izquierda del cofre. Su posición mundial y clase de sector no se pueden recuperar de estas capturas. |
| ~15:00 | En el borde derecho del encuadre aparece una acumulación alta de tablones/madera oscura junto a la zona despejada (`reference/video-v12/frame-900.png`). Su tipo exacto y posición de sector no son recuperables del video. |
| 14:00–15:00 | `reference/video-v12/frame-840.png` y `frame-900.png` muestran una planta alta de hojas amarillas junto al borde derecho del pasillo abierto. A 14:00 también se ve una rama delgada sobre el suelo despejado. Forma, tamaño y ubicación de sector no son recuperables; las implementaciones v0.160/v0.161 son trazados locales aproximados. |
| ~18:00 | Regreso a la aldea. El texto de objetivo indica hablar con Mura para cambiar de trabajo y explica que el trabajo secundario se desbloquea al nivel 10 y que cambiar de trabajo es gratis. |

Las ventanas y textos pequeños se transcriben solo cuando son legibles en las capturas; los tiempos entre escenas son aproximados, tomados de una muestra cada 30 segundos.

## Rasgos útiles para reconstruir

### Escena y cámara

- Mundo 2D con vista lateralmente inclinada/desde arriba, desplazamiento fluido y cámara que sigue al personaje.
- Escenarios dibujados con mucha vegetación por capas: suelo irregular, senderos, hojas, helechos, flores, hongos, rocas, troncos cortados y árboles grandes. El primer plano puede ocultar al jugador de forma parcial.
- La aldea y el bosque usan la misma paleta cálida y contornos oscuros; la aldea añade edificios, tablón, bancos, faroles, NPCs y grupos de jugadores.

### HUD

- Cuatro pequeños accesos/iconos alineados en la esquina superior izquierda.
- Chat y líneas de estado en la parte inferior izquierda.
- Habilidades/equipamiento en una barra centrada abajo; los iconos tienen marco circular, selección y contador/cooldown numérico.
- Indicadores y barras de vida sobre criaturas/personajes. Objetivo activo en texto a la derecha.
- Los diálogos y ventanas del sistema usan panel marrón oscuro, bordes verdes/dorados y tipografía clara; el cuadro de diálogo de NPC queda cerca del borde inferior.

### Acciones y ciclo

- Movimiento continuo en el mapa, con combate de acción en tiempo real.
- Grupo formado por ratones y mascotas; las mascotas siguen al personaje y aparecen en combate.
- Ataques, curación/vendas y habilidades con proyectiles/área; aparecen cifras flotantes y barras de salud.
- Flujo observado: tutorial → aldea y NPCs/menús → selección de mazmorra → encuentros → regalos de Elisah/talentos → retorno a aldea y progreso de trabajo/quest.

## Límites de esta evidencia

El vídeo no muestra el creador de cuenta, la pantalla inicial, todas las opciones de configuración, todos los trabajos/armas ni el recorrido completo de cada mapa. Tampoco permite concluir cómo funciona una partida multijugador desde la perspectiva de los otros integrantes. Para esos sistemas hay que contrastar con el cliente histórico y la documentación inventariada en [RECONSTRUCTION_SOURCES.md](RECONSTRUCTION_SOURCES.md).
