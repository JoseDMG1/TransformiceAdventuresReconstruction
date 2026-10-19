# Ranuras originales de equipo

Recuperado el 2026-10-18 desde la ruta exacta importada por el cliente archivado:

- URL: `https://transformice-adventures.com/dist/Transformice-adventure-client/src/_enums/SlotEquipementADV.js`
- `Last-Modified`: 2020-12-10 13:18:55 GMT
- Archivo conservado: `original-data/SlotEquipementADV-2020.js`
- SHA-256: `ad12305d6aa50e7725204660b31caaff61bfe316f87165ac5bfcc3873823f987`

## Códigos observados

| Código | Ranura original |
| ---: | --- |
| 1 | Cabeza (`TETE`) |
| 2 | Cuello (`COU`) |
| 3 | Cuerpo (`CORPS`) |
| 4 | Gafas (`LUNETTE`) |
| 5 | Boca (`BOUCHE`) |
| 6 | Orejas (`OREILLE`) |
| 7 | Pelaje (`FOURRURE`) |
| 8 | Cola (`QUEUE`) |
| 9 | Guantes (`GANT`) |
| 10 | Peinado (`COIFFURE`) |
| 21 | Mano derecha |
| 22 | Mano izquierda |

## Qué permite afirmar

El enum confirma que el perfil original tiene diez ranuras de apariencia y dos manos, más granularidad que las tres ranuras locales actuales (`head`, `body`, `charm`). En el protocolo de `InterfaceJoueurADV.initialisation`, el servidor envía un byte `codeSlot` antes de cada `EquipementADV`; el ID del objeto no sustituye ese código. `EquipementADV.deserialiser` lee el ID y las apariencias principal/secundaria del objeto, con sus piezas, bibliotecas y pivotes. El icono se busca de forma independiente como `interface/icones/{ID}.png`.

El enum no contiene una tabla `ID de objeto → ranura`, ni asigna los 111 textos traducidos a las 198 definiciones de apariencia en `data.bin`. Además, este módulo público informa fecha de 2020; no demuestra por sí solo que su enum sea idéntico en todas las versiones del gameplay de 2019. No se infiere la ranura de los prefijos numéricos de los IDs ni se agregan opciones de equipo por esa vía.

## Implicación para la reconstrucción

Para completar mochila, ranuras, apariencia y estadísticas sin alterar partidas antiguas se necesita una tabla de inventario/perfil original retenida o una exportación del servidor/editor con `codeSlot`, ID, apariencia primaria/secundaria y stats. Hasta entonces, las estadísticas/loot y asignaciones de aspecto locales siguen etiquetados como aproximados; la reconstrucción conserva compatibilidad y no migra los objetos existentes.

## Iconos y composición del perfil local (v0.157)

Se recuperaron los 12 iconos `equipement{code}.png` de la ruta `https://data.atelier801.com/tfmadv/interface/icones/`. El detalle verificable de URL, respuesta, tamaño y SHA-256 está en `equipment-slot-icons-downloads.json`; `npm run recover:equipment-slots` vuelve a solicitarlos y regenera el manifiesto. `dist/equipment-slots.js` conserva las etiquetas y el orden observado en `InterfaceJoueurADV.js`: izquierda `[1,2,3,9,7]`, derecha `[10,4,5,6,8]`, manos `[22,21]`.

La reconstrucción muestra esos iconos para ranuras sin asignación. Cabeza y cuerpo se conectan provisionalmente con los dos campos de cosmética local existentes, y las manos con las armas/equipo locales. Esto hace utilizable la pantalla, pero **no demuestra que la asignación de los guardados locales coincida con el protocolo original**. Los ocho demás slots cosméticos no tienen asignación local y permanecen vacíos hasta recuperar el mapeo correspondiente.

La lectura fue estática. No se ejecutó el cliente, no se inició una sesión ni se hicieron peticiones al servidor de juego. Se consultó únicamente el archivo público determinista señalado por la importación del cliente.
