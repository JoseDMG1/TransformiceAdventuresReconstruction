# Avance v0.16 · Desinfectante

## Don original 1708

El catálogo español recuperado describe que la curación periódica inflige daño al monstruo más cercano. El efecto local se conecta al pulso de `bandageHot`: en ese pulso, además de curar al jugador, hiere al enemigo vivo más cercano si está a 320 unidades o menos.

La cantidad (8) y el alcance (320) son valores provisionales; no aparecen en la descripción. El don pertenece a la familia de vendaje y requiere esa mano secundaria en la oferta. Se mantiene el estado de curación periódica existente y no se altera su duración ni su ritmo.

## Evidencia y persistencia

ID y texto proceden del catálogo de traducciones retenido y analizado con REA. La ruta de curación periódica se comprobó en el cliente reconstruido localmente; el cliente histórico delega el resultado al servidor. Por ello, la activación y cantidad exactas no quedan verificadas contra la implementación original.

No requiere campos nuevos de guardado: la duración del efecto y los dones ya se conservan. Se regeneró `dist/gifts.js` y se comprobó sintaxis con `npm run check`; no se ejecutaron pruebas automatizadas ni recorrido de navegador.
