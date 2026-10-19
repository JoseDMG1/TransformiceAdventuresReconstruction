# v0.149 — barra de XP por tramos al subir de nivel

## Cambio

El aviso de XP ahora anima durante dos segundos el progreso desde el XP anterior hasta el nuevo. Si la ganancia cruza un umbral, llena la barra del nivel actual, la reinicia y continúa con el remanente en el nivel siguiente; si termina exactamente en el umbral, queda reiniciada en cero. Cada cruce reproduce `niveausup`; el sonido `xp` se mantiene al recibir la ganancia. El aviso continúa visible cinco segundos.

## Evidencia

- REA Evidence `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`, análisis de `BarreXPADV.js`: animación de 2000 ms, sonidos `xp`/`niveausup`, cierre a los 5000 ms y actualización con XP antes/después, máximo y nivel anterior/nuevo. Ver [REA_PROGRESSION_FINDINGS.md](REA_PROGRESSION_FINDINGS.md).
- El cliente recibe el máximo de XP y los niveles como datos; no se deduce de ese artefacto una curva completa. Los umbrales locales 120 y 160 en niveles 2 y 3 se conservan por observación directa del video; los demás umbrales siguen siendo una extrapolación local.
- El metadato REA confirma duración e insumos, pero no el tween exacto al cruzar varios niveles. El llenado por tramos y el reinicio intermedio son una interpretación local del cambio de nivel y remanente.

## Persistencia y alcance

- La animación es temporal y no se guarda.
- No cambia XP, nivel, puntos de talento ni umbrales; solo reproduce visual y sonoramente el avance recibido.
- No cambia el esquema ni migra partidas existentes.

## Verificación

Revisión estática contra los hallazgos REA y el estado local. No se ejecutó el juego ni una suite de pruebas; falta cotejar un cruce de nivel y una ganancia sin cruce en navegador.
