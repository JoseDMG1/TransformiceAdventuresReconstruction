# Transformice Adventures — versión local v0.208.0

Reconstrucción para navegador de escritorio basada en el cliente archivado, recursos originales recuperados y el gameplay aportado. Incluye tutorial, aldea, expediciones, combate, trabajos, mascota, equipo, talentos y dones. La interfaz está en español.

## Ejecutar en Windows

Necesitas Node.js. Haz doble clic en **Jugar.cmd**, mantén abierta la ventana del servidor y entra a **http://localhost:8010**. También puedes ejecutar desde esta carpeta:

```powershell
npm start
```

No requiere instalar paquetes ni compilar. Tras actualizar archivos, recarga el navegador con **Ctrl+F5**.

## Controles

| Acción | Control |
| --- | --- |
| Moverte | WASD o flechas |
| Apuntar / atacar | Ratón / clic izquierdo o J |
| Venda o escudo | H o clic derecho |
| Interactuar | E |
| Habilidades principales | Q y R, o 1 y 2 |
| Habilidad secundaria desde nivel 10 | 3 |
| Selector radial de emotes | F |
| Saludar / sentarse / bailar | Botón de emotes |
| Esquivar | Espacio |
| Perfil, equipo, mochila y dones activos | I |
| Talentos | T |
| Seleccionar expedición | M |
| Pausa / cerrar | Escape |
| Ocultar interfaz | P |

Las habilidades con objetivo muestran un área o línea: apunta y confirma con clic izquierdo o J. Escape o clic derecho cancelan la selección sin consumir la recarga. Las habilidades personales y la recogida de testimonios se activan directamente.

En el bosque puedes examinar con E un hacha y las pertenencias de un leñador. Los diálogos de Papaille proceden del cliente original; los hallazgos se conservan al guardar la expedición. Las posiciones y los dibujos de estas pistas son aproximados.

Los objetivos de viaje y los cofres tienen un marcador de suelo o una flecha si están lejos. En los diálogos, E o un clic muestra primero el texto completo; la siguiente pulsación avanza. Se respeta la preferencia del sistema para reducir animaciones.

Debes estar quieto durante un segundo para completar una venda. Moverte interrumpe la curación. Mantén H o clic derecho para bloquear con escudo. Los menús y el cambio de pestaña pausan la simulación.

## Funciones recientes

- Barra compacta en ventanas horizontales bajas y carro del tutorial despejado de árboles; captura y comprobaciones a la resolución original 640×360.
- Carro de Papaille con carga y ruedas trazadas del fotograma del tutorial; apariencia provisional.
- Claro, cercas y tocones del tutorial trazados a partir del gameplay; composición y arte todavía aproximados.
- Corregida la reanudación después de rescatar a Picpic: recargar conserva el tutorial y permite seguir con Papaille.
- Libreta visible con dos espacios, nombres e iconos de testimonios, incluidos los de muerte.
- Cursores de área y línea, confirmación de lanzamiento y cancelación.
- Veneno de reportaje independiente del veneno de la daga; ambos se conservan al guardar.
- Pestaña **Dones** con las bendiciones de la expedición, descripciones y cantidades.
- Iconos de equipo originales en la barra de acciones; los dones sin imagen recuperada muestran un símbolo alternativo.
- Conexiones transitables entre zonas y pantalla de recuperación que permite descargar la partida ante un error inesperado.
- Música original de título, exploración y combate, ambientes y tres controles de volumen locales separados del guardado.
- Música de combate vinculada a la fase activa del encuentro local y transiciones de exploración/combate ajustadas a los tiempos recuperados del cliente original.
- Corregida en v0.194 la reproducción de ambiente omitida en v0.193; comprobada la carga y reproducción en Chrome.

## Partidas

El progreso se guarda automáticamente. **Continuar mi aventura** recupera la zona y la expedición. Puedes exportar e importar una copia JSON desde el menú.

Usa siempre el mismo navegador y dirección: `localhost:8010` y `127.0.0.1:8010` mantienen partidas distintas. Borrar los datos del sitio elimina su copia local. Los guardados anteriores se migran y los nuevos campos opcionales reciben valores por defecto.

## Desarrollo

```powershell
npm run check
npm test
npm run test:features
npm run test:browser
```

`check` revisa la sintaxis. `test` comprueba combate, trabajos, talentos, guardados, testimonios y selección de objetivo. `test:features` utiliza Chrome instalado y un perfil aislado; necesita el servidor local activo. Sus capturas se guardan en `.local/`.

La arquitectura está en [CONTENT_ARCHITECTURE.md](reference/CONTENT_ARCHITECTURE.md). El estado actual y los pendientes están en [HANDOFF.md](HANDOFF.md). La estimación de fidelidad local está en [FIDELITY_STATUS.md](reference/FIDELITY_STATUS.md); el [backlog priorizado](reference/FIDELITY_BACKLOG.md) concreta qué falta, qué evidencia se necesita y cómo cerrar cada punto. Los cambios recientes y sus límites están en [IMPLEMENTATION_V208.md](reference/IMPLEMENTATION_V208.md).

## Evidencia y alcance

REA analiza estáticamente los artefactos originales sin ejecutar su cliente ni sus conexiones. Véase [REA_FINDINGS.md](reference/REA_FINDINGS.md).

Las animaciones de personajes y muchos recursos de interfaz son originales. Geometría, IA, tablas de botín, daño, tiempos y parte de las reglas siguen siendo reconstrucciones locales. Los sectores y las reglas completas del servidor todavía no están disponibles. El multijugador queda fuera del alcance actual.
