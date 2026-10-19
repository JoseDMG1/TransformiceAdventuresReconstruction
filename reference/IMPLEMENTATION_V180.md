# Implementación v0.180 — validación visual del objetivo

## Cambio

Al cambiar la fase local del objetivo, su casilla muestra una marca de completado durante 500 ms y luego presenta la instrucción siguiente. Se cubren transiciones ya existentes de tutorial, combate, cofre, avance de expedición y objetivos de aldea.

## Evidencia y límites

- `InterfaceQueteADV.js` valida el objetivo activando su `I_BoutonEtat` y anima el cambio durante 500 ms (`valider`).
- `ProtoADV.js` confirma que el cliente recibe altas, validaciones y bajas de objetivos por mensajes separados.
- La reconstrucción detecta transiciones de sus estados locales; no reproduce la lista y ciclo de vida autoritativos que enviaba el servidor.

## Persistencia y verificación

- Estado de interfaz transitorio; no se añade ningún campo al guardado ni cambia la progresión.
- No añade funciones online ni traducciones al francés.
- No se ejecutó el juego ni pruebas; falta comprobar el ritmo y el tamaño de la marca en navegador.
- La estimación global permanece en 47% hasta el cotejo sincronizado.
