# Medición auxiliar del movimiento del video

Se añadió `npm run reference:motion -- 0 60 0.25` para medir desplazamiento aparente del fondo entre fotogramas, mediante Chrome y JavaScript local. El MP4 no se modifica ni se ejecuta el cliente original. El extractor de PNG comparte el mismo lector de video.

El analizador reduce el cuadro a 160×90, toma bordes distribuidos, excluye zonas del HUD/personaje y busca traslaciones por comparación de parches. Registra coste, separación del segundo candidato, número de puntos y una marca heurística de fiabilidad. Un refinamiento parabólico estima desplazamiento subpíxel; los resultados se expresan en píxeles del video de 640×360. Dos pruebas sintéticas comprueban traslación con un actor central cambiante y rechazo de cuadros sin detalles.

La medición de 0–60 s con paso de 0,25 s produjo 240 segmentos; 171 pasaron el filtro heurístico y 69 no. El acumulado final no se considera fiable: suma incertidumbre, perspectiva y oclusiones. `cumulativeReliable` queda falso a partir del primer segmento incierto. **No se emplea ese acumulado para mover NPC, cambiar rutas ni afirmar coordenadas originales.** [Datos](motion-analysis/tutorial-0-60.json).

El resultado sí desaconseja asociar automáticamente dos tocones por su silueta repetida en capturas alejadas. Para reconstruir geometría continua hacen falta contactos de suelo inequívocos, seguimiento entre fotogramas y la proyección original, o los payloads de sectores. Por ahora, las posiciones dibujadas del tutorial se apoyan en referencias locales y se etiquetan como aproximadas.

Es análisis propio del video y no una salida de herramientas REA. La inspección estática de `MondeADV-2021.js` ya acredita que el original usa perspectiva; una traslación 2D no reproduce toda esa cámara.
