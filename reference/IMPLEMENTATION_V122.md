# Implementacion v0.122

Fecha: 2026-10-17

## Variacion de animaciones cuerpo a cuerpo

Cada ataque cuerpo a cuerpo selecciona al azar una de las variantes1,2,3 de su postura: `ambi_attaqueN` para espada/daga y `epee2m_attaqueN` para espada de dos manos. Se guarda el ultimo codigo por arma durante la sesion y se hacen hasta tres intentos para no repetirlo, siguiendo el selector archivado. La animacion escogida se usa tanto durante la ventana del ataque como en el resto del clip tras desactivarse.

El cliente recibe desde el servidor la lista exacta de codigos permitidos para cada instancia de arma. Esa tabla no esta disponible; usar las tres variantes recuperadas es una aproximacion local. No cambia el daño, el tiempo, la seleccion de objetivos ni el guardado.

## Evidencia

- `reference/wayback-client/dist/Transformice-adventure-client/src/gameplay/armes/ArmeADV.js`: `recupCodeAnimAttaque()` elige un codigo aleatorio de `listeAnimAttaque` y prueba hasta tres veces para evitar el ultimo.
- `OutilsArmeADV.js`: la lista se lee de los datos de arma recibidos, confirmando que el conjunto permitido depende del servidor.
- `reference/original-data/data-strings.json`: nombres recuperados `ambi_attaque1-3`, `ambi_attaqueG1-3` y `epee2m_attaque1-3`. Los clips se conservan en `dist/assets/original/creatures.json`.

## Validacion

`npm run check` correcto: sintaxis en69 archivos. No se ejecuto la suite ni un recorrido de navegador.
