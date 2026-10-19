# Iconos originales recuperados

Esta recuperación sigue la evidencia estática REA retenida para interfaces: `rea-client-summary.json`, `rea-progression-summary.json` y `rea-pet-rewards-summary.json`. Las fórmulas se corroboraron leyendo los módulos originales; los IDs proceden exclusivamente del catálogo de traducciones recuperado `original-translations/catalog_es.json`. No se ejecutó el cliente original ni se enumeraron IDs adivinados.

`scripts/recover-icons.mjs` reproduce las descargas. `original-icons-downloads.json` conserva cada URL exacta, resultado HTTP y SHA-256, y dimensiones para PNG. Los archivos exitosos están bajo `dist/assets/original/` con su ruta original.

| Tipo | Fórmula dentro de biblioteca tfmadv | Fuente original | Recuperados |
| --- | --- | --- | --- |
| Talento | `interface/talent/{ID}.png` | InterfaceTalents.js:226,289; claves `talent.ID.nom` | 84/84 |
| Don | `interface/dons/{ID}.jpg` | InterfaceRecompenseRencontre.js:71; claves `don.ID.nom` | 125/126 |
| Equipo | `interface/icones/{ID}.png` | types/EquipementADV.js:29,53; claves `equipement.ID.nom` | 110/111 |
| Trabajo | `interface/metiers/icone-metier-{ID}.png` | InterfaceJoueurADV.js:236,240; claves `metier.nom.ID` | 4/4 |
| Marco/bloqueo | `interface/icones/fond1.png`, `interface/icones/cadre1.png`, `interface/petit-cadenas.png` | EquipementADV.js e InterfaceTalents.js | 3/3 |

Total: **326 recursos recuperados de 328 referencias exactas**. Los únicos errores son HTTP404 en `interface/dons/12000.jpg` y `interface/icones/4005.png`. Estos casos necesitan fallback visual; no se sustituyeron por imágenes atribuidas a otros IDs.

Los códigos de equipo de esta tabla son IDs de objetos del catálogo (p. ej.21001), distintos de los códigos de apariencia del renderer (p. ej.5). La interfaz debe usar su ID original explícito. Los cuatro trabajos corresponden a claves originales1–4; sus nombres se consultan en el catálogo. Los talentos se resuelven por `originalTalentId`, no por ID del árbol. Los dones se resuelven por `originalId` y mantienen extensión JPG.

No se descargaron marcos de categoría de dones: la fórmula `interface/dons/cadres/{categoria}.png` se observa en fuente, pero los números de categoría proceden del servidor y las categorías locales no establecen esos IDs. Tampoco se inventaron iconos para mascotas. InterfaceEcurie.js:85–100 recibe un ClipAnim por mascota y lo dibuja, sin fórmula de icono estático; la vía fiel es renderizar el clip original recuperado en una miniatura.

Las descargas se validaron por firma PNG/JPEG y se conservaron hashes; no se ejecutaron tests. No se modificó el manifiesto de animación ni módulos runtime. La integración puede cargar directamente rutas locales originales y mantener fallback para los dos IDs ausentes.
