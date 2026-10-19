# Implementacion v0.126

La sacudida direccional de la camara seguia el evento equivocado: se activaba al acertar con un arma cuerpo a cuerpo. El cliente archivado la inicia cuando el jugador principal recibe dano directo (`MondeADV.afficherEffetChiffre`, `MondeADV.tremblement`). Ahora se activa desde `hurtPlayer`, usando la direccion desde el atacante hacia el jugador, solo si queda dano positivo tras los bloqueos. Mantiene 100 ms, desplazamiento direccional de 10 px con salida exponencial y vibracion aleatoria de potencia 1. El dano periodico de la espina del escenario marca expresamente su llamada y no sacude la camara.

Se conserva el desplazamiento de camara de 25 px al cerrar el ataque cuerpo a cuerpo y el retroceso del arco. No cambian dano, invulnerabilidad ni persistencia.

Evidencia: `reference/original-data/MondeADV-2021.js`, metodos `afficherEffetChiffre()` y `tremblement()` (alrededor de las lineas 1484 y 1770). La duracion y distancia son las constantes enviadas por el cliente para este evento.

Validacion: `npm run check` (sintaxis). Aun requiere recorrido manual en navegador; no se ejecuto una bateria de pruebas.
