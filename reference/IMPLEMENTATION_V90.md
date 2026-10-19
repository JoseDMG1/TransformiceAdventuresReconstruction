# Desarrollo local v0.90

## Informe y Entrevista

El Informe curativo ahora utiliza la posición elegida: cura al jugador o a Picpic si están dentro del área. Antes siempre curaba al jugador y aplicaba un límite de distancia de mascota respecto al dueño, aunque el cursor estuviera en otro lugar. El radio compartido vive en `REPORT_RULES`; el cursor y el efecto consumen el mismo valor. La asignación de un cursor circular a Informe y los 145 px siguen siendo decisiones locales, como se documentó en v0.78.

Los talentos originales 55,60,62 y63 se describen mediante «activar un testimonio». El módulo aplica sus efectos al activar testimonios tanto mediante Informe como mediante Entrevista. La recuperación elemental se limita a fuego y relámpago; muerte no se trata como elemento. El escudo personal del talento60 es independiente de que el personaje esté dentro de una zona curativa. Las cantidades de curación/escudo y reducciones de recuperación siguen siendo locales.

Portada, don14506, describe activar todos los testimonios visibles con una recuperación mayor. Antes mantenía el límite normal de220 px. La función `availableTestimonies` permite ahora usar la visibilidad de cámara inyectada por el juego. Se comparte entre validación previa y ejecución, evitando gastar la recarga con un criterio distinto. La proyección dentro del rectángulo de cámara es la interpretación local de visible; el mensaje exacto del servidor sigue ausente.

## Escudos y efectos para aliados

`barriers.js` comparte concesión, capacidad, absorción y caducidad entre jugador y mascota. Conserva el límite local100 y la duración local6s que ya utilizaba el jugador. Picpic puede recibir el escudo de las curaciones de As de corazones y de Informe cuando sea un objetivo válido. No resucitan a una mascota caída. Su cantidad y temporizador forman parte de la instantánea validada; partidas anteriores reciben cero y mantienen el formato13.

La absorción de daño ocurre tras las reducciones defensivas. Los indicadores sobre la mascota muestran el escudo activo. `area-effects.js` comparte las defensas de recetas y entrevistas, y el aumento de daño de aliados del elixir, comprobando la posición del actor beneficiado. Antes algunas reglas solo consultaban al jugador. La aplicación de la defensa de Entrevista a ambos aliados es una resolución local del texto del talento66; su descripción recuperada no identifica por separado a cada tipo de aliado.

## Icono de muerte

La inspección visual de los nueve pergaminos recuperados distingue la cruz de curación2, fuego3, hielo4, relámpago5 y calavera9. La elección anterior del4 para muerte era incorrecta. Se utiliza9 tanto en la libreta como en el suelo. `effects.json` vincula ese recurso con FX107 y su ancla original; se elimina el dibujo especial que distorsionaba el icono como un cuadrado.

Esto confirma la identidad visual de la calavera y la referencia del recurso, no el enum del servidor ni los efectos de combate del Testimonio de muerte. Estos siguen sin recuperarse. No se añaden tipos nuevos ni fórmulas solo por disponer de sus iconos.

## Evidencia y estado

Se reutiliza el cliente original y la evidencia REA retenida, particularmente `REA_TRACE_JOURNALISM.md`, `TRANSLATION_RECOVERY.md` y los catálogos originales españoles. La comprobación visual de iconos usa los PNG recuperados. No se ejecutó el cliente original ni se contactó con sus servidores.

`npm run check`: sintaxis correcta en57 archivos. No se añadieron ni ejecutaron pruebas de comportamiento en este lote. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. El desarrollo continúa, con online excluido y pendientes de fidelidad originales aún abiertos.
