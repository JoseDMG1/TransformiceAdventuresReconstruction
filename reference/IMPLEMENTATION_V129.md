# Implementacion v0.129

El cliente archvado actualiza la animacion `course` con el modificador de velocidad del movil, limitado a un minimo de 0.5 (`MobileADV.boucle()` llama `defVitesseLecture(Math.max(modificateurVitesse, 0.5))`). La version local mantenia el clip al ritmo del reloj global incluso durante efectos de lentitud.

Se anadio un reloj transitorio de locomocion para jugador, enemigos y Picpic. Avanza mientras el actor se mueve; la lentitud local del jugador (0.65) y los modificadores de enemigos reducen ese avance con el minimo original0.5. Al dejar de moverse el reloj se reinicia; durante acciones y clips de ataque del jugador, y durante golpes/aturdimientos de enemigos, no se usa para que los clips especiales mantengan sus relojes propios. Las muertes, telegráficos y carga de rana tambien conservan sus relojes.

No se cambia la velocidad fisica ni el guardado. Los valores de lentitud locales siguen siendo aproximados; no se atribuyen a las tablas originales del servidor.

Evidencia: `reference/original-data/MobileADV-2021.js`, alrededor de la linea585; `ProtoADV.js` asigna `modificateurVitesseBase` y `modificateurVitesse` desde valores recibidos del servidor. La correspondencia exacta de esos valores para el juego completo sigue pendiente.

Validacion: `npm run check` (sintaxis). Requiere recorrido manual en navegador; no se ejecuto bateria de pruebas.
