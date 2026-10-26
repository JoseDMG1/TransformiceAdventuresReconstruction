# Arena final: siguiente cotejo de escenario

Se decodificaron fotogramas adicionales del MP4 proporcionado mediante `npm run reference:frames -- 960 990 1020 1035 1060 1080`. El registro `comparison-frames/arena-extraction.json` conserva instantes solicitados/decodificados y resolución 640×360.

| Instante | Evidencia | Diferencia que revisar |
| --- | --- | --- |
| 16:00 | [Fotograma](comparison-frames/frame-960.png) | Entrada y continuidad del último tramo. |
| 16:30 | [Fotograma](comparison-frames/frame-990.png) | Troncos grandes en el borde superior/izquierdo, flores violetas altas, hojas amarillas y tela translúcida en primer plano. |
| 17:00 | [Fotograma](comparison-frames/frame-1020.png) | Agua celeste a la derecha, cantos de ribera, pradera abierta con islas amarillas y verdes; macizo de margaritas blancas arriba. |
| 17:15 | [Fotograma](comparison-frames/frame-1035.png) | Oferta de tres regalos después del encuentro, sin sustituir el escenario por una pantalla independiente. |
| 17:40 | [Fotograma](comparison-frames/frame-1060.png) | Revisar contenido/estado del retorno frente al flujo local. |
| 18:00 | [Fotograma](comparison-frames/frame-1080.png) | Última transición y colocación de personajes. |

El terreno actual `forest-pond` tiene un estanque y sendero dibujados localmente; las coordenadas no son un sector recuperado. Las capturas funcionales de victoria no permiten puntuar la composición: el bot combate desde otra posición y el modal tapa parte del mundo. Primero debe registrarse el encuadre con un punto de ribera y un tronco común, a igual resolución; después corregir siluetas, flora y capas. La acumulación de desplazamiento óptico anterior no sirve para inferir posiciones absolutas.

La cámara original usa perspectiva (`MondeADV`/`Camera3d`), mientras la local sigue siendo ortográfica. Una sustitución completa debe cubrir simultáneamente terreno, posición/escala de sprites, indicadores, proyección de efectos y conversión inversa del cursor. Aplicar solo compresión vertical a la imagen no cerraría esa diferencia. La geometría de movimiento y las partidas existentes se deben conservar.

Estos fotogramas fijan prioridades de cotejo; no prueban identidad de los mapas ni justifican aumentar la estimación global del 47%.
