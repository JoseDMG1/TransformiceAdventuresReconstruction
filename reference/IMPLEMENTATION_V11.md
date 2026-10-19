# Avance v0.11 · desarrollo en curso

El usuario reanudó el trabajo después de revisar v0.10 y autorizó continuar hasta nueva indicación o un punto crítico. Este registro es un checkpoint; no indica pausa ni reconstrucción finalizada.

## Evidencia reutilizada y ampliación

- Se aplicó la skill REA, reutilizando las identidades de artefacto y análisis ya conservados. No se volvió a analizar el bundle completo.
- `GIFT_EXPANSION_V11.md`: revisión de los 94 dones pendientes mediante textos españoles y franceses originales. Se implementaron 33 adicionales; el catálogo ejecutable contiene 65.
- `TALENT_COVERAGE_V11.md`: revisión estática de los 84 nodos contra sus consumidores. No equivale a una prueba jugable.
- `ORIGINAL_EFFECTS.md`: 60 clips FX, siete invocaciones y 184 PNG recuperados por referencias exactas de metadatos. Renderer con espacios de IDs separados para criaturas y FX.
- Los sprites corroboran ID25 cardo,26 zarza,27 lirio;24/28 son variantes de lirio. No se atribuyen funciones de combate por el nombre del sprite solamente.

## Cambios

### Mecánicas y dones

- 65 dones con nombres y descripciones originales, elegibilidad por arma/mano/habilidad activa y cantidades provisionales separadas.
- Elixires: inmovilización, variantes de daño o cura, duración y bonificación a aliados. Variantes 10001/10002 se excluyen localmente para evitar anular ambos canales; esto no prueba una exclusión original del servidor.
- Desaparición: bonificación de daño, recuperación de cargas, drenaje de vida durante invisibilidad y explosión al terminar en su punto de origen.
- Caldero: radio, curación y daño vinculado a la receta curativa local.
- Trampas: atracción, daño por desplazamiento posterior, combinación de trampas distintas, bonificación por permanecer armadas, un objetivo y suelo incendiado.
- Cartas: alternancia, barrera y radio de corazones, más blancos de diamantes, vulnerabilidad y conversión de inmovilización a aturdimiento. La base de diamantes ahora inmoviliza; no impide atacar salvo talento/don que congela o aturde.
- Periodista: recuperación de informe/entrevista, frecuencia de testimonios, barrera curativa, duración/atracción y pulsos iniciales de entrevista.
- Las repeticiones de dones respetan las incompatibilidades aunque se haya agotado la oferta de dones nuevos.

### Correcciones

- Daño bloqueado calculado desde el ataque entrante, antes del daño residual. Se corrigen reflejo, cura, barrera y daño almacenado del escudo.
- Proyectiles enemigos conservan el índice del atacante. Debilitamiento y efectos de bloqueo pueden consultar a su fuente.
- Curación recibida centralizada para vendas, cartas, informes, calderos, plantas, desaparición y efectos periódicos.
- Talentos de daño de elixir/informe/picas dejan de aumentar plantas/entrevista/diamantes respectivamente.
- Se limita la vida de la mascota al redistribuir; resistencia por heridas ya no puede aumentar el daño por una relación de vida superior a uno.
- La invisibilidad afecta al personaje, sin atenuar accidentalmente el escenario completo.

### Presentación y equipo

- Efectos originales de impacto, curación, desaparición, cartas, elixires, testimonios y entrevistas.
- Caldero, trampa, cardo, zarza y lirio con sus clips originales, ordenados por profundidad con otras entidades.
- Tres tipos de plantas en rotación; las zarzas reciben la mejora de maduración y el cardo la de alcance. Su lógica exacta sigue siendo una reconstrucción local.
- Iconos originales en equipo y trabajos. Vista previa de arma/mano secundaria con confirmar o cancelar; el perfil cambia al confirmar.

## Guardado v11

Añade origen de desaparición, carta anterior, identidad de trampas, control de inmovilización, historial de golpes de elixir, trauma por movimiento y zonas incendiadas. Conserva el índice fuente de proyectiles. Las animaciones transitorias son efímeras y no se incluyen en la partida.

Se mantienen las partidas v1–v10 y la clave local. La ampliación no vuelve a devolver los talentos auténticos de v0.10.

## Comprobación y límites

Comprobación sintáctica de módulos; no se añadieron ni ejecutaron pruebas automatizadas. Las suites históricas deben actualizarse antes de usarse como cobertura de estas ventanas y mecánicas.

Quedan 61 dones del catálogo fuera del motor. Algunos requieren ingredientes/recetas completos, proyectiles de cartas, nuevas entidades o resolver contradicciones de traducción. El don14506 se mantiene excluido porque ES y FR describen comportamientos distintos. No combinar ambas versiones ni elegir una silenciosamente.

Los porcentajes, duración no explícita, requisitos de desbloqueo y balance siguen siendo locales. Los sectores y colisiones originales continúan ausentes: ver MAP_RECOVERY_FOLLOWUP.md. El online permanece fuera del alcance.
