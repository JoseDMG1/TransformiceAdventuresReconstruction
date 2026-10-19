# REA: mascotas, salud, reanimación, cofres y sonidos

Análisis real de nueve originales del cliente archivado con REA 6.5.0, 16 de octubre de 2026. No se ejecutó el cliente ni se modificó el runtime local.

- Evidence ID: `ev_a3138d73947b6f9ea98c6d58534cc96475c5af79ec790105947a5dd09792d891`.
- SHA-256 árbol: `fe8b4b75516958b08272346c1e7c06e92d8d5d9b0ecb50e071842e7a41cdbf48`.
- Evidencia completa comprimida: `rea-pet-rewards-evidence.json.gz`; resumen: `rea-pet-rewards-summary.json`.
- Entrada focalizada: `rea-pet-rewards-input/`: nueve originales copiados sin alterar bytes, aplanando rutas. 146373 bytes, 18901 nodos AST, cero errores de sintaxis.
- Operación: `analyze_javascript_application`, mediante el CLI cacheado y `rea-loader.mjs`, como se documenta en REA_FINDINGS.md.

## Hechos observados estáticamente

| Pregunta | Evidencia original | Conclusión y límite |
| --- | --- | --- |
| Curación con vendaje | ArmeBandage.js, constructor/incantation/activation | Incantación de 1000 ms; el movimiento la interrumpe; animación incantation1 y posteriormente ambi_comp1 o ambi_compG1. Auto desactivación 15*16.6666 ms. No establece cantidad de cura, alcance, objetivo ni que reviva mascotas. |
| Muerte | ProtoADV.js:107 | C_MORT_MOBILE=0x8009 lee ID móvil l32s y llama declenchementMort con un booleano recibido. Su significado específico no se recuperó aquí. |
| Reanimación | ProtoADV.js:816 | C_REANIMATION=0x805D lee ID móvil l32s y llama reanimation(). Es genérico para móviles; no prueba el disparador ni duración específicos de mascotas. |
| Salud | ProtoADV.js:151 | C_MAJ_SANTE=0x8011: ID móvil l32s, tres l16 y un l8, enviados a clipNom.majSante(..., estVisible). Sin definición del receptor, no se asignan nombres inventados a estos campos. |
| Establo | InterfaceEcurie.js, initialisation/afficher | Cantidad de mascotas l32s. Por mascota: índice local como ID, código monstruo l8, nombre cadena y ClipAnim serializado. Tras la lista, ID activo l16. |
| Invocar y retirar mascota | InterfaceEcurie.js, cliqueBoutonAppel; ProtoADV.js:1097,1180 | Invocar envía ID l16 mediante S_SPAWN_FAMILIER=0x900A; retirar S_RAPPELER_FAMILIER=0x9024 no lleva ID. El botón cambia entre invocar/retirar según selección y mascota activa. |
| Renombrar mascota | InterfaceEcurie.js, cliqueBoutonChangementNom; ProtoADV.js:1100 | Hace trim del texto y envía ID l16 + cadena mediante S_CHANGEMENT_NOM_FAMILIER=0x900B. El cliente espera validación del servidor. No prueba límites de caracteres originales. |
| XP | ProtoADV.js:848; BarreXPADV.js, afficher | C_GAIN_XP manda tres l32s: ganancia, actual, máximo; después dos l16: nivel antes y después. Es un mensaje independiente, sin ID de encuentro/cofre en este receptor. |
| Cofre | ProtoADV.js:442; InterfaceRecompenseRencontre.js:45 | C_AFFICHER_COFFRE_RECOMPENSES=0x803A abre selector. Cuerpo: ID cofre l32s, cantidad l8, y por opción ID don l32s + categoría l32s. |
| Confirmación | InterfaceRecompenseRencontre.js, clicBoutonValider; ProtoADV.js:1059 | No hay envío sin opción seleccionada. Selección de nuevo desmarca. Confirmar manda S_SELECTION_RECOMPENSE_COFFRE=0x9009 + ID cofre e ID don e32, y cierra ventana. Esto no prueba deduplicación o persistencia originales. |
| Tipos de recompensa | RecompenseADV.js, TypeRecompenseADV/deserialiser | Equipo=1, mascota=2, moneda=3, título=4, trabajo=5, especial=6. El enum declara moneda, pero deserialiser no implementa esa rama y devuelve null. No tratarla como soporte funcional confirmado. |

## Presentación y rutas exactas

RecompenseADV.js confirma equipo deserializado, mascota (código l8 y ClipAnim), título l16, trabajo l8 y especial l8. El premio de trabajo muestra `$metier.nouveau`, `$metier.nom.ID` y `interface/metiers/preview-metier-ID.png`. El título usa `$titre.ID`. El especial usa `interface/recompense/icone-recompense-ID.png`.

La animación de levantar un objeto usa recompensestart, luego recompense y sonido swoosh (ProtoADV.js:445). La XP utiliza los nombres xp y niveausup, con volúmenes 0.5 y 1 respectivamente (BarreXPADV.js). Su animación dura 2000 ms y se cierra automáticamente a 5000 ms.

ConfigADV.js declara `http://data.atelier801.com/tfmadv/`. TFMAdventure.js:33 asigna `DOSSIER_MUSIQUE` a esa base + `sons/`; la música inicial es `musique/tfmadv_intro`, volumen 0.7 y bucle (línea 178). No se deduce extensión MP3/OGG ni carpeta específica de efectos: el módulo MoteurSon no está entre estos originales recuperados.

ProtoADV.js:48 carga el índice de sonidos desde datos recibidos: número l16, por entrada ID l16 y cadena. C_SON_MONDE usa ID de sonido y volumen l8/100, y una posición si no existe móvil; C_CHANGER_SON_AMBIANCE usa ese índice con modo ambiente. No se dispone de la tabla completa de ID→nombre.

TFMAdventure.js:135 llama `Trad801.chargerFichierLangue(LANGUE, "tfmadv", callback)`. La URL exacta del archivo de traducción depende del módulo ausente Trad801; no se ha inventado una ruta. Claves de mascotas confirmadas: `$ecurie`, `$ecurie.invoquerFamilier`, `$ecurie.rappelerFamilier`, `$texte.nom`, `$bouton.valider`. La descripción del establo se crea en la interfaz, pero esta implementación no rellena una descripción de mascota.

## Estado de las preguntas y límites

Respondidas estáticamente: forma de establo, invocar/retirar/renombrar, serialización XP, cofre y confirmación, enumeración de premios, algunos sonidos y rutas declaradas. Parcialmente respondidas: salud/muerte/reanimación. Pendientes: curación y revive específicos de mascota, tiempos, alcance, reglas y validaciones del servidor, catálogo de sonidos y URL final de traducciones.

REA analizó texto inerte: no observó ejecución, red ni recursos disponibles. Su resolución de enlaces se centra en CommonJS/ESM y no establece vínculos completos de AMD; modules=0 no significa ausencia de módulos. Se omiten dependencias para mantener el análisis focalizado. No se ejecutaron pruebas.
