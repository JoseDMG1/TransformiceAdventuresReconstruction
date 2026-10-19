# Implementación v0.163 — bloqueo del último escalón de talentos de la demo

## Cambio

Los dos nodos del último nivel del árbol (índices locales 4 y 5, nivel visual 4) ahora se muestran con el candado original `petit-cadenas.png`. La ficha informa que no están disponibles en esta demo y bloquea su compra. El resto del árbol conserva el coste y los requisitos locales existentes.

Si una partida local previa ya contiene uno de esos talentos, sus datos y efectos se conservan al cargar. No se migran ni eliminan adquisiciones existentes; solo se impiden nuevas compras. Una redistribución posterior devolverá esos puntos, pero esos dos nodos permanecerán bloqueados en la demo.

## Evidencia REA

- En `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceTalents.js`, `afficherArbre()` calcula el precio por posición con `1 + Math.round(2 * (palierEnCours - 1) / 3)`.
- Cuando el precio es 4, añade la imagen original `interface/petit-cadenas.png` y el tooltip `palierNonDisponibleDemo`. Esto se aplica a las posiciones 5 y 6 de cada árbol.
- La reconstrucción mantiene el orden y los precios locales existentes y marca el nivel cero-basado 3 como bloqueado, sin inferir desbloqueos del servidor para los niveles anteriores.

## Persistencia y verificación

- No cambia el esquema de guardado. Builds guardadas con nodos 4/5 continúan cargando sin pérdida.
- No añade funciones online ni traducciones al francés.
- Se actualizó la expectativa del test unitario existente, pero no se ejecutaron pruebas ni navegador. Falta cotejar aspecto del candado, texto de la ficha y redistribución en el juego.

