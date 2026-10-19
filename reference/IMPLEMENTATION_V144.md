# Implementación v0.144

## Ventana de talentos

Se reemplazó la lista vertical de árboles por una ventana centrada en el flujo observado del cliente original:

- Pestañas de categoría **Armas**, **Habilidades** y **Ratón**.
- Ramas compactas con los iconos de los seis escalones.
- Seleccionar un icono presenta su imagen, nombre, descripción y acción de adquisición.
- La ficha muestra nivel, progreso de experiencia y puntos disponibles.
- Se reutilizan los iconos originales de talentos y los marcos recuperados `xp_niveau.png` y `cadre_xp.png`.
- En Armas se muestran las ramas asociadas al arma/mano secundaria equipadas; en Habilidades, las del trabajo principal y secundario; Ratón muestra la rama de mascota. Esta selección de ramas es una aproximación local del conjunto que el servidor original entregaba.

La compra sigue usando `canLearnTalent()`/`learnTalent()` locales, se guarda en el perfil existente y conserva la adquisición durante expediciones introducida en v0.142. No cambian costes, desbloqueos, efectos, formato ni migración de partidas. La redistribución local sigue disponible en la aldea.

## Evidencia REA y visual

- Las capturas `reference/video-v12/frame-380.png` y `frame-510.png` muestran pestañas de categorías, dos ramas compactas de talentos, iconos bloqueados/adquiridos, nivel y barra de experiencia, y un panel de descripción/compra.
- La lectura REA del `InterfaceTalents.js` archivado confirma categorías seleccionables, ramas/escalones seleccionables, panel de detalle y una acción separada de adquisición. Los requisitos y permisos concretos provienen del servidor; la UI local mantiene sus aproximaciones identificadas.
- El catálogo local proporciona nombres, descripciones e IDs de imagen recuperados; números y efectos continúan sujetos a las limitaciones documentadas en `REA_PROGRESSION_FINDINGS.md`.

## Verificación

No se ejecutó el juego ni pruebas. Pendiente cotejar el tamaño/encuadre en resolución 640×360, probar las tres pestañas, selección y compra de un talento, y confirmar que guardar/reanudar conserva el árbol adquirido.
