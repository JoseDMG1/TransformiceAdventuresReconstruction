# REA: progresión, talentos, perfil y recompensas

Análisis estático real del cliente histórico, 16 de octubre de 2026, mediante `rea-agents@6.5.0`, operación `analyze_javascript_application` y el loader ya documentado en REA_FINDINGS.md.

- Evidence ID: `ev_914253233af4db5993ec0c78856d1924d1c7e243e817801207a3b5c1fa7cdebf`.
- SHA-256 del árbol: `ccc71968c42926c9d858070c4fdf96fb7a815034a3109f67d760333a4e8e821b`.
- Entrada: `rea-progression-input/`: siete copias byte a byte de archivos de `wayback-client/dist/Transformice-adventure-client/src/`, con nombres aplanados y dependencias omitidas.
- Evidencia completa: `rea-progression-evidence.json.gz`; resumen: `rea-progression-summary.json`.
- Siete archivos JS, 162109 bytes, 20671 nodos AST visitados, cero errores de sintaxis.

## Observaciones del artefacto

Las conclusiones siguientes provienen de lectura del código original inventariado por REA. Son evidencia estática: no ejecución ni recuperación de reglas del servidor.

| Sistema | Comportamiento confirmado | Archivo y función |
| --- | --- | --- |
| Categorías de talentos | Armas=0, Competencias=1, Ratón=2. | InterfaceTalents.js, TypeArbre |
| Árbol de talentos | Cuatro columnas con 1, 2, 1 y 2 nodos: seis escalones. | InterfaceTalents.js, afficherArbre |
| Precio mostrado | `1 + Math.round(2 * (palier - 1) / 3)`: 1,2,2,3,4,4. Las parejas 2/3 y 5/6 muestran coste cero si el hermano está poseído. | InterfaceTalents.js, initialisation |
| Requisitos | El servidor entrega ID, posesión y booleano debloquable por nodo. El botón sigue ese booleano; la compra envía árbol y escalón. No se calcula un requisito de nivel localmente. | InterfaceTalents.js, initialisation; ProtoADV.js:1168 |
| Flujo de pantalla | Pestañas de categorías, ramas y escalones seleccionables; el panel de detalle muestra icono/nombre/descripción y botón de adquisición. Cambiar pestaña/selección solicita al servidor los datos asociados; adquirir envía árbol y escalón. | InterfaceTalents.js, initialisation/afficherArbre |
| XP y puntos | Puntos disponibles, nivel, experiencia actual y requerida llegan por mensaje. No hay curva XP recuperada en esta selección. | InterfaceTalents.js, initialisation |
| Presentación XP | Animación de 2000 ms, sonidos xp/niveausup, cierre a los 5000 ms. Colores #60A52F y #1E140F. Recibe ganancia, XP, máximo y nivel antes/después. | BarreXPADV.js, initialisation |
| Don de Elisah | Cantidad variable de dones; ID y categoría por opción. Selección única que se puede deseleccionar; confirmación envía ID de cofre e ID del don. No prueba que siempre sean tres opciones. | InterfaceRecompenseRencontre.js, initialisation/clicBoutonValider |
| Recompensas generales | Pantalla distinta de selección de don. Lista deserializada con aparición escalonada cada 250 ms, rebote de 1000 ms y cierre por clic al terminar la última. | InterfaceRecompense.js, initialisation/ConteneurAnime.animation |
| Perfil | Manos equipadas, mascota, trabajos principal/secundario, nivel, cantidad de mascotas y títulos. El booleano `modificationPossible` llega en el mensaje del servidor; desactiva el botón de talentos y oculta maquillaje si es falso. El permiso concreto depende del estado enviado, no de una regla local de escena recuperada. | InterfaceJoueurADV.js, initialisation |
| Equipo | Grilla por tipo de arma/slot ordenada por código. Selección pendiente, confirmar y cancelar. Seleccionar de nuevo permite vaciar slot con código cero. El servidor identifica elementos no equipables; el cliente los atenúa. | InterfaceJoueurADV.js, selección de equipo |
| Estadísticas | IDs numéricos con listas de valores enteros. Traducción mediante $statequipement.ID; aquí no hay catálogo ni fórmulas. | EquipementADV.js, deserialiserStats |

### Candado de talentos exclusivo de la demo

`InterfaceTalents.js`, `afficherArbre()`: recorre cuatro niveles y calcula el precio por posición con `1 + Math.round(2 * (palierEnCours - 1) / 3)`. Cuando `prixTalent == 4`, añade `interface/petit-cadenas.png` y el tooltip `$talents.palierNonDisponibleDemo`. El precio 4 corresponde a las posiciones 5 y 6, los dos nodos del último nivel. Esto confirma que esas posiciones se marcan como no disponibles en la demo; los permisos y requisitos de los demás nodos continúan llegando del servidor.

## Claves y rutas originales

- `$talent.type.ID`, `$talent.arbre.ID`, `$talent.ID.nom`, `$talent.ID.description`.
- `interface/talent/ID.png`, `interface/titre-talent.png`.
- `interface/cadre_xp.png`, `interface/xp_niveau.png`, `interface/xp_halo.png`.
- `$don.ID.nom`, `$don.ID.description`.
- `$equipement.ID.nom`, `$statequipement.ID`, `$titre.ID`, `$SlotEquipementSLOT`.
- `interface/icones/ID.png`, `interface/icones/fond1.png`, `interface/icones/cadre1.png`, `interface/icones/armeTYPE.png`, `interface/icones/equipementSLOT.png`.

Son rutas declaradas por el cliente, no prueba de disponibilidad. Este análisis no descargó recursos ni inventó IDs.

## Inferencias y límites

La estructura respalda categorías y ramas de talentos, vista previa y confirmación de equipo, y animación de XP y premios. Mantener esos datos en tablas permite reemplazar decisiones locales cuando aparezca el catálogo.

El precio cero del hermano sugiere cambio entre alternativas de una rama; el cliente NO prueba exclusividad, reembolso, sustitución automática ni permanencia del talento anterior. Cualquier política local de cambio debe marcarse como reconstruida.

REA analizó texto inerte y no ejecutó el bootstrap. Su resolución de vínculos se centra en CommonJS/ESM: no resuelve todas las dependencias AMD; modules=0 no significa ausencia de módulos. La entrada reducida omite dependencias para responder una pregunta concreta.

Quedan pendientes catálogo y efectos completos de talentos, reglas de desbloqueo, puntos por nivel, curva XP, cantidades de premios, probabilidades, equipo y validaciones del servidor. La animación XP usa el máximo recibido para calcular el módulo de la barra; no demuestra una curva constante. Los seis nodos tampoco prueban contenido idéntico entre todas las versiones.

Categorías, estructura, costes mostrados, confirmación y presentación: respondidos estáticamente. Requisitos y balance: pendientes de datos de servidor o evidencia de gameplay.
