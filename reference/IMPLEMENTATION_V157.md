# Implementación v0.157 — perfil con ranuras originales

## Cambio

La vista general del perfil ahora distribuye las diez ranuras cosméticas y las dos manos alrededor del retrato, según `InterfaceJoueurADV.js`. Las ranuras vacías conservan el icono original descargado del CDN; las manos muestran las armas locales y enlazan con el panel de Equipo. Cabeza y cuerpo muestran la apariencia que el guardado local ya puede representar y enlazan con Apariencia. Se añadió un acceso directo a Talentos.

Se recuperaron los doce iconos enumerados por el cliente (códigos 1–10, 21 y 22), con tipo, tamaño y SHA-256 en `equipment-slot-icons-downloads.json`. El script reproducible es `npm run recover:equipment-slots`.

## Evidencia y límites

- `reference/wayback-client/dist/Transformice-adventure-client/src/interfaces/InterfaceJoueurADV.js` define el orden visual: izquierda `[1,2,3,9,7]`, derecha `[10,4,5,6,8]` y manos `[22,21]`.
- Los nombres y códigos de ranura vienen de `SlotEquipementADV-2020.js`; el archivo conservado y su SHA-256 constan en `EQUIPMENT_SLOT_RECOVERY.md`.
- Se conservan iconos `equipement{código}.png` descargados desde `https://data.atelier801.com/tfmadv/interface/icones/` en `dist/assets/original/interface/icones/`.
- El perfil local solo modela apariencias editables de cabeza y cuerpo y armas en las manos. Las otras ranuras quedan vacías porque no se recuperó el vínculo de inventario/objeto a ranura y apariencia que enviaba el servidor. No se deduce de IDs ni de prefijos.
- La captura original del fotograma 1050 respalda retrato, nombre, nivel, una mascota y título sin asignar. No se inventan fecha de registro, ID de cuenta ni otros datos personales.

## Persistencia, alcance y verificación

- No cambia el esquema ni la clave de guardado. La vista utiliza campos locales ya existentes.
- No añade cuentas, servidores, sincronización ni ninguna función online.
- La distribución y los iconos están respaldados por archivos REA; el aspecto final en navegador aún requiere comparación a resolución y estado equivalentes.
- No se ejecutó el juego ni pruebas automatizadas en esta entrega.
