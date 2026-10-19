# Avance v0.21 · Polvo fertilizante

## Don original 10112

El catálogo español recuperado dice que invoca una hoja viva que puede atacar enemigos. Al terminar el efecto de Desaparición, la reconstrucción crea una hoja aliada en el punto donde se inició la habilidad. Comparte la entidad, el renderizado original Mandragore (criatura ID 17), la IA y el límite máximo de tres hojas con Naturaleza furiosa (10005).

El texto no indica el disparador exacto, duración ni parámetros de combate. La activación al final de Desaparición, cuatro segundos de vida, 45 HP, 10 de daño y el alcance de búsqueda son decisiones locales. La identidad visual ID 17 sigue siendo una inferencia, no una asociación demostrada por el protocolo.

## Persistencia y límites

La posición inicial de Desaparición ya se guarda; al terminar, la habilidad borra ese origen, crea la hoja y guarda el resultado para evitar duplicar la invocación al reanudar. La entidad viva se conserva en el guardado v12 existente.

Se reutiliza evidencia de catálogo recuperada con REA. El servidor original delega el comportamiento; revisar visualmente y afinar al comparar con gameplay continuo. No cambia el formato de guardado.
