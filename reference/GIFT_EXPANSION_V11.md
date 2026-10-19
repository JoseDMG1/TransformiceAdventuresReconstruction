# Expansion de dones autenticos: investigacion V11

Plan focalizado sobre los94 dones fuera del primer lote32:50 candidatos de trabajos y44 diferidos. Se reutilizan las traducciones originales recuperadas y la evidenciaREA retenida: TRANSLATION_RECOVERY.md,REA_PET_REWARDS.md,REA_PROGRESSION_FINDINGS.md. No se repite el analisis del bundle ni se modifica runtime.

## Como interpretar el trigger

Las columnas ES/FR reproducen literalmente el catalogo. Trigger significa evento semantico descrito por el texto, no observacion de ejecucion original ni formula de servidor. Los numeros ausentes requieren balance local. Las familias se infieren de los nombres/textos y no de categoryID servidor. El requisito de trabajo/habilidad debe admitir trabajo principal o SOLO habilidad efectiva devuelta por resolveJobSkill(profile,3).

## Lote propuesto de50

### 10000 - Espinas.

- Requisito: `botanist`, habilidad1.
- ES exacto: Los enemigos atrapados en el radio sufren daño físico adicional además de estar inmovilizados durante 5 segundos.
- FR exacto: Les ennemis touchés subissent des dégâts physiques supplémentaires en plus d'être immobilisés pendant 5 secondes.
- Trigger semantico: Al impactar el elixir: dano fisico adicional e inmovilizacion5s.
- Dependencias/limites: Separar root de stun; numero5s original.

### 10001 - Toxina mejorada.

- Requisito: `botanist`, habilidad1.
- ES exacto: Ya no curan aliados pero el daño aumenta.
- FR exacto: Ne soigne plus les alliés mais les dégâts sont augmentés.
- Trigger semantico: Pulso/impacto del elixir: deshabilitar cura aliada y aumentar dano.
- Dependencias/limites: Canales dano/cura separados; oposicion10002 sin exclusividad probada.

### 10002 - Aceite esencial.

- Requisito: `botanist`, habilidad1.
- ES exacto: Ya no inflige daño a los enemigos pero aumenta la curación.
- FR exacto: N'inflige plus de dégâts aux ennemis mais les soins sont augmentés.
- Trigger semantico: Pulso/impacto del elixir: deshabilitar dano enemigo y aumentar cura.
- Dependencias/limites: No generar impactos de dano cero que disparen procs.

### 10003 - Sustancia prohibida.

- Requisito: `botanist`, habilidad1.
- ES exacto: Aumenta el daño de los aliados durante la duración del efecto.
- FR exacto: Augmente les dégâts des alliés pendant la durée de l'effet.
- Trigger semantico: Aliado afectado por el elixir obtiene bonus de dano durante su efecto.
- Dependencias/limites: Estado buff con propietario/fuente y expiracion; aliado local incluye pet si se decide.

### 10004 - Destilación avanzada.

- Requisito: `botanist`, habilidad1.
- ES exacto: La duración de los efectos aumenta.
- FR exacto: La durée des effets est augmentée.
- Trigger semantico: Al crear efectos de elixir: prolongar sus duraciones.
- Dependencias/limites: No prolongar cooldown ni cualquier efecto global.

### 10006 - Esencia elástica.

- Requisito: `botanist`, habilidad1.
- ES exacto: El matraz rebota una vez más.
- FR exacto: La fiole rebondit, explosant une fois supplémentaire.
- Trigger semantico: Tras primer impacto del frasco: rebote que vuelve a explotar una vez.
- Dependencias/limites: Proyectil/recorrido e impacto adicional; FR precisa explosion.

### 10102 - Polvo cromático.

- Requisito: `trickster`, habilidad2.
- ES exacto: Aplica los efectos a los aliados cercanos.
- FR exacto: Applique les effets aux alliés proches.
- Trigger semantico: Al desaparecer: compartir efectos con aliados cercanos.
- Dependencias/limites: Definir listado de efectos compartibles; no duplicar dano inicial.

### 10103 - Polvo milagroso.

- Requisito: `trickster`, habilidad2.
- ES exacto: El daño ya no aumenta, pero los efectos curativos aumentan considerablemente.
- FR exacto: Les dégâts ne sont plus augmentés mais les effets de soins le sont fortement.
- Trigger semantico: Durante desaparicion: sustituir bonus dano por bonus cura fuerte.
- Dependencias/limites: Motor actual no tiene cura base propia de desaparecer; bloquear hasta definirla.

### 10104 - Polvo de contrabando.

- Requisito: `trickster`, habilidad2.
- ES exacto: Se aumenta la bonificación de daño.
- FR exacto: Le bonus de dégâts est augmenté.
- Trigger semantico: Durante desaparicion: incrementar su bonus de dano.
- Dependencias/limites: Distinguir ventana invisible y golpe sorpresa; alcance exacto no recuperado.

### 10105 - Polvo volátil.

- Requisito: `trickster`, habilidad2.
- ES exacto: Cuando el efecto finaliza se desencadena una explosión en el origen de la desaparición.
- FR exacto: Quand l'effet prend fin une explosion se déclenche au point d'origine de la disparition.
- Trigger semantico: Cuando finaliza el efecto: explosion en ORIGEN de desaparicion.
- Dependencias/limites: Guardar coordenadas iniciales y disparar una vez incluso si se rompe por ataque.

### 10108 - Polvo vampírico.

- Requisito: `trickster`, habilidad2.
- ES exacto: El daño infligido a los enemigos durante la duración del efecto te cura.
- FR exacto: Les dégâts infligés aux ennemis pendant la durée de l'effet vous soignent.
- Trigger semantico: Dano infligido durante efecto devuelve salud al jugador.
- Dependencias/limites: Canal lifesteal con guardia contra recursion; no cura por dano reflejado salvo decision.

### 10109 - Señuelo.

- Requisito: `trickster`, habilidad2.
- ES exacto: Invoca un señuelo que no ataque, pero que puede ser objetivo de tus oponentes.
- FR exacto: Invoque un leurre qui n'attaque pas, mais qui peut être pris pour cible par vos adversaires.
- Trigger semantico: Al desaparecer: crear senuelo sin ataque que puede recibir aggro.
- Dependencias/limites: Entidad targetable con salud/tiempo,seleccion IA y persistencia.

### 10110 - Polvo de energía.

- Requisito: `trickster`, habilidad2.
- ES exacto: Aumenta la velocidad de recuperación de uso de tu artículo durante la duración del efecto.
- FR exacto: Augmente votre vitesse de récupération d'utilisation d'objet pendant la durée de l'effet.
- Trigger semantico: Mientras efecto activo: aumentar recuperacion de usos de objetos.
- Dependencias/limites: Aplicar a cargas; no confundir cooldown habilidades.

### 10203 - Carduus ferox.

- Requisito: `botanist`, habilidad2.
- ES exacto: El daño de tu cardo aumenta pero puede atacarte.
- FR exacto: Les dégâts de votre chardon sont augmentés mais il peut vous attaquer.
- Trigger semantico: Ataque del cardo: dano aumentado y puede atacar a su dueno.
- Dependencias/limites: Plantas requieren objetivo aliado habilitado; riesgo selfdamage deliberado.

### 10204 - Carduus multa.

- Requisito: `botanist`, habilidad2.
- ES exacto: Tu cardo puede atacar a varios enemigos al mismo tiempo.
- FR exacto: Votre chardon peut attaquer plusieurs ennemis en même temps.
- Trigger semantico: Ataque del cardo: permitir multiples enemigos por ataque.
- Dependencias/limites: Motor actual pool AoE puede ya golpear todos: introducir limite base primero.

### 10205 - Carduus venenum.

- Requisito: `botanist`, habilidad2.
- ES exacto: Tu cardo envenena y frena a los enemigos atrapados en el radio.
- FR exacto: Votre chardon empoisonne et ralentit les ennemis touchés.
- Trigger semantico: Cardo golpea: aplicar veneno y ralentizacion a alcanzados.
- Dependencias/limites: No asignarlo a lirio/zarza; separar estados poison/slow.

### 10207 - Maleza pantanosa.

- Requisito: `botanist`, habilidad2.
- ES exacto: Tus espinas infligen periódicamente daño de veneno a los enemigos cercanos.
- FR exacto: Vos ronces infligent périodiquement des dégâts de poison aux ennemis proches.
- Trigger semantico: Pulso de zarza: veneno a enemigos cercanos.
- Dependencias/limites: Requiere subtipo zarza real; thorn ambiguo entre cardo y zarza.

### 10211 - Lirio rosa de los valles.

- Requisito: `botanist`, habilidad2.
- ES exacto: La sanación de tu lirio de los valles aumenta y la curación excesiva se convierte en escudo.
- FR exacto: Les soins de votre muguet sont augmentés et les soins excédentaires sont convertis en bouclier.
- Trigger semantico: Lirio cura: aumentar curacion y convertir exceso en barrera.
- Dependencias/limites: Requiere subtipo lirio real y calcular exceso antes del clamp.

### 11003 - Barbacoa.

- Requisito: `chef`, habilidad1.
- ES exacto: Aumenta el poder de las recetas mejorando el ataque.
- FR exacto: Augmente la puissance des recettes améliorant l'attaque.
- Trigger semantico: Receta de ataque del caldero: aumentar potencia.
- Dependencias/limites: Recetas/buffs ataque independientes; no aumentar dano de todas habilidades chef.

### 11004 - Doble fritura.

- Requisito: `chef`, habilidad1.
- ES exacto: Incrementa el poder de defensa potenciando las recetas.
- FR exacto: Augmente la puissance des recettes améliorant la défense.
- Trigger semantico: Receta de defensa del caldero: aumentar potencia.
- Dependencias/limites: Representar defensa como buff/barrier segun receta reconstruida.

### 11005 - Mirepoix.

- Requisito: `chef`, habilidad1.
- ES exacto: Incrementa el poder de las recetas proporcionando curación.
- FR exacto: Augmente la puissance des recettes prodiguant des soins.
- Trigger semantico: Receta curativa del caldero: aumentar potencia.
- Dependencias/limites: El pool de cura actual puede reutilizar canal heal de receta.

### 11006 - Fabricante de salsa.

- Requisito: `chef`, habilidad1.
- ES exacto: Aumenta los efectos de radio del caldero.
- FR exacto: Augmente le rayon des effets du chaudron.
- Trigger semantico: Crear/actualizar caldero: ampliar radio de sus efectos.
- Dependencias/limites: Radio persistente del caldero; no radio trampa.

### 11007 - Caldero fiel.

- Requisito: `chef`, habilidad1.
- ES exacto: Tu caldero te esta siguiendo!
- FR exacto: Votre chaudron vous suit !
- Trigger semantico: Mientras caldero activo: sigue al jugador.
- Dependencias/limites: Entidad autonoma con seguimiento y colision; evitar teletransporte de recetas.

### 11008 - Queso frito.

- Requisito: `chef`, habilidad1.
- ES exacto: El caldero causa daño de fuego a los enemigos cercanos cuando le agregas un ingrediente.
- FR exacto: Le chaudron inflige des dégâts de feu aux ennemis proches quand vous y ajoutez un ingrédient.
- Trigger semantico: AL ANADIR ingrediente: pulso de fuego desde caldero.
- Dependencias/limites: Necesita accion ingrediente; no reemplazar por dano cada tick.

### 11009 - Queso Juliana.

- Requisito: `chef`, habilidad1.
- ES exacto: Los efectos de curación también infligen daño a los enemigos.
- FR exacto: Les effets de soin infligent aussi des dégâts aux ennemis.
- Trigger semantico: Efectos de receta curativa: tambien dano a enemigos.
- Dependencias/limites: Dano escala con efecto de cura, no solo cura efectiva perdida por HPmax.

### 11200 - Trampa magnética.

- Requisito: `chef`, habilidad2.
- ES exacto: Antes de cerrar, la trampa atrae a los enemigos cercanos.
- FR exacto: Avant de se refermer, le piège attire les ennemis proches.
- Trigger semantico: Antes de cerrarse la trampa: atraer enemigos cercanos.
- Dependencias/limites: Fase previa activacion y movimiento forzado con colisiones.

### 11201 - Trauma.

- Requisito: `chef`, habilidad2.
- ES exacto: Una vez que se activa la trampa, los enemigos reciben daño cuando se mueven.
- FR exacto: Après l'activation du piège, les ennemis subissent des dégâts lorsqu'ils se déplacent.
- Trigger semantico: Victima tras activacion: dano cuando se DESPLAZA.
- Dependencias/limites: Guardar distancia/posicion; parado no recibe ticks.

### 11202 - Trampa mortal.

- Requisito: `chef`, habilidad2.
- ES exacto: El daño de tu trampa aumenta drásticamente si el objetivo ha sido alcanzado por otra trampa hace menos de 2 segundos.
- FR exacto: Les dégâts des pièges sont drastiquement augmentés lorsqu'ils touchent une cible ayant été touchée par un autre piège moins de 2 secondes plus tôt.
- Trigger semantico: Trampa impacta victima tocada por OTRA trampa hace menos2s: bonus.
- Dependencias/limites: Guardar ultimo trapId y tiempo;2s original; misma trampa no valida.

### 11203 - Gatillo oxidado.

- Requisito: `chef`, habilidad2.
- ES exacto: La trampa inflige un daño mayor si se ha configurado durante 2 segundos sin que se active.
- FR exacto: Si le piège reste armé pendant plus de deux secondes, ses dégâts sont augmentés.
- Trigger semantico: Trampa permanecio armada MAS de2s: bonus al activar.
- Dependencias/limites: Contar desde armedAt no createdAt;2s original y comparacion estricta FR.

### 11206 - Trampa de afeitar

- Requisito: `chef`, habilidad2.
- ES exacto: La trampa solo afecta a un objetivo, pero su daño aumenta considerablemente.
- FR exacto: Le piège n'affecte plus qu'une cible mais ses dégâts sont fortement augmentés.
- Trigger semantico: Trampa activada: un solo objetivo y dano fuerte.
- Dependencias/limites: Elegir objetivo determinista; posible oposicion11205 no probada.

### 11207 - Trampa incendiaria

- Requisito: `chef`, habilidad2.
- ES exacto: Después de la activación, la trampa quema el suelo y los enemigos allí.
- FR exacto: Après l'activation, le piège brûle le sol et les ennemis s'y trouvant.
- Trigger semantico: Despues activacion: zona suelo quemado con dano a enemigos dentro.
- Dependencias/limites: Nueva zona DOT fire con fuente; no conservar logica trampa que reexplote.

### 13000 - Tramposo.

- Requisito: `trickster`, habilidad1.
- ES exacto: Reduce el tiempo de reutilización de Card Trick cuando se juegan dos cartas diferentes en sucesión.
- FR exacto: Réduit le temps de récupération de Tour de Cartes lorsque deux cartes différentes sont jouées à la suite.
- Trigger semantico: Dos cartas DIFERENTES consecutivas: reducir cooldown de Truco.
- Dependencias/limites: Guardar carta anterior; no proc si repetir carta ni por cada enemigo golpeado.

### 13002 - Suave hablador.

- Requisito: `trickster`, habilidad1.
- ES exacto: El as de corazones le da un escudo extra.
- FR exacto: L'as de cœur prodigue un bouclier supplémentaire.
- Trigger semantico: As corazones afecta aliado: barrera adicional.
- Dependencias/limites: As corazones debe tener receptor aliado; escudo aunque HPmax.

### 13003 - Vendedor ambulante.

- Requisito: `trickster`, habilidad1.
- ES exacto: Incrementa el efecto de radio del as de corazones.
- FR exacto: Augmente le rayon d'effet de l'as de cœur.
- Trigger semantico: Resolver as corazones: ampliar radio aliado.
- Dependencias/limites: No ampliar radio de las otras tres cartas.

### 13004 - Trampas.

- Requisito: `trickster`, habilidad1.
- ES exacto: Se aumenta el daño infligido a un enemigo inmovilizado por el as de diamantes.
- FR exacto: Les dégâts infligés à un ennemi immobilisé par l'as de carreau sont augmentés.
- Trigger semantico: Victima inmovilizada POR as diamantes: recibe dano aumentado.
- Dependencias/limites: Marca de origen diamondsRoot; stun generico no satisface; persistencia.

### 13005 - Ajetreo.

- Requisito: `trickster`, habilidad1.
- ES exacto: Aumenta la cantidad de enemigos golpeados por el as de diamantes.
- FR exacto: Augmente le nombre d'ennemis touchés par l'as de carreau.
- Trigger semantico: As diamantes impacta: mas enemigos alcanzados.
- Dependencias/limites: Introducir limite base cardTargets; AoE ilimitado hace don placebo.

### 13006 - Chantaje.

- Requisito: `trickster`, habilidad1.
- ES exacto: El as de diamantes aturde a los enemigos en lugar de inmovilizarlos.
- FR exacto: L'as de carreau étourdit les ennemis au lieu de les immobiliser.
- Trigger semantico: As diamantes: sustituir inmovilizacion por aturdimiento.
- Dependencias/limites: Base actual stun contradice esta estructura; root base primero.

### 13008 - Tiro barato.

- Requisito: `trickster`, habilidad1.
- ES exacto: El as de tréboles inflige un mayor daño contra los enemigos ralentizados y un gran daño contra los enemigos aturdidos.
- FR exacto: L'as de trèfle inflige des dégâts augmentés aux ennemis ralentis et fortement augmentés aux ennemis étourdis.
- Trigger semantico: As treboles impacta: bonus si slow,mayor si stun.
- Dependencias/limites: Necesita ataque trebol real; hoy carta power buff no equivale.

### 13009 - Lengua venenosa.

- Requisito: `trickster`, habilidad1.
- ES exacto: Los daños del as de tréboles aumentan pero se infligen con el tiempo como veneno.
- FR exacto: Les dégâts de l'as de trèfle sont augmentés mais infligés sur la durée sous forme de poison.
- Trigger semantico: As treboles impacta: aumentar dano y convertirlo en veneno temporal.
- Dependencias/limites: Sustituir impacto,no sumarlo completo al DOT; pendiente ataque trebol.

### 14002 - Periodista independiente

- Requisito: `journalist`, habilidad1.
- ES exacto: Reduce el tiempo de recuperación.
- FR exacto: Réduit le délai de récupération.
- Trigger semantico: Activar reportaje: menor cooldown.
- Dependencias/limites: Modificar cooldown de skill1, no frecuencia testimonios.

### 14003 - Columnista

- Requisito: `journalist`, habilidad1.
- ES exacto: Los efectos de veneno infligen su daño al instante.
- FR exacto: Les effets de poison infligent leurs dégâts instantanément.
- Trigger semantico: Reportaje genera veneno: aplicar su total inmediatamente.
- Dependencias/limites: Solo veneno de reportaje; no convertir daga ni cualquier DOT.

### 14004 - Documental de la vida salvaje

- Requisito: `journalist`, habilidad1.
- ES exacto: Tú y tu mascota infligen daño de hielo extra.
- FR exacto: Vous et votre familier infligez des dégâts de glace supplémentaire.
- Trigger semantico: Jugador y mascota infligen hielo adicional.
- Dependencias/limites: Texto no fija duracion ni requiere reportaje previo: politica local explicita.

### 14005 - Papel sustantivo

- Requisito: `journalist`, habilidad1.
- ES exacto: Curación aplicar un escudo extra.
- FR exacto: Les soins appliquent un bouclier supplémentaire.
- Trigger semantico: Reportaje curativo: barrera adicional al receptor.
- Dependencias/limites: Distinguir heal de otros trabajos; no exige sobrecuracion.

### 14007 - Agencia de prensa

- Requisito: `journalist`, habilidad1.
- ES exacto: Aumenta la frecuencia de los testimonios desovados.
- FR exacto: Augmente la fréquence d'apparition des témoignages.
- Trigger semantico: Spawner testimonios: aumentar frecuencia.
- Dependencias/limites: Reloj spawn menor; no reducir cooldown reportaje ni superar limite objetos.

### 14501 - Conferencia de prensa

- Requisito: `journalist`, habilidad2.
- ES exacto: Aumentar la duración de las entrevistas.
- FR exacto: Augmente la durée des interviews.
- Trigger semantico: Crear entrevista: mayor duracion.
- Dependencias/limites: No prolongar testimonios globales ni invulnerabilidad.

### 14503 - Periódico tabloide

- Requisito: `journalist`, habilidad2.
- ES exacto: Los enemigos cercanos se sienten atraídos por las entrevistas.
- FR exacto: Les ennemis proches sont attirés sur les interviews.
- Trigger semantico: Mientras entrevista existe: atraer enemigos cercanos hacia ella.
- Dependencias/limites: Movimiento/aggro temporal; no teletransportar ni saltar colisiones.

### 14504 - Difamación

- Requisito: `journalist`, habilidad2.
- ES exacto: Los enemigos que están en una entrevista durante su activación están congelados.
- FR exacto: Les ennemis présents dans une interview lors de son activation sont gelés.
- Trigger semantico: EN ACTIVACION entrevista: congelar enemigos presentes.
- Dependencias/limites: Snapshot inicial; no congelar nuevos cada frame; estado freeze o stun local documentado.

### 14505 - Pequeños anuncios

- Requisito: `journalist`, habilidad2.
- ES exacto: Reduce el tiempo de recuperación.
- FR exacto: Réduit le délai de récupération.
- Trigger semantico: Activar entrevista: cooldown menor.
- Dependencias/limites: Solo habilidad2 efectiva; no reportaje.

### 14507 - Scoop

- Requisito: `journalist`, habilidad2.
- ES exacto: Dispara una explosión de fuego cuando se activa una entrevista.
- FR exacto: Déclenche une explosion de feu à l'activation d'une interview.
- Trigger semantico: AL ACTIVARSE entrevista: explosion de fuego.
- Dependencias/limites: Un pulso instantaneo, no todo tick de zona.

### 14508 - Investigación

- Requisito: `journalist`, habilidad2.
- ES exacto: Deja caer un rayo cuando se dispara una entrevista.
- FR exacto: Fait tomber la foudre quand une interview est déclenchée.
- Trigger semantico: AL DISPARARSE entrevista: rayo.
- Dependencias/limites: Un pulso lightning; distinguir del testimonio lightning de reportaje.

## Orden recomendado por dependencias

1. Parametros existentes sin nuevas entidades:10004,10104,10110,11005,11006,14002,14007,14501,14505.
2. Pulsos y barreras con fuente:10000,10001,10002,10003,10105,10108,11009,13002,13003,14003,14005,14504,14507,14508.
3. Origen e historial:11201,11202,11203,11206,11207,13000,13004; corregir root vs stun antes de13006.
4. Modelo de habilidad original ampliado:10006,10102,10103,10109,10203,10204,10205,10207,10211,11003,11004,11007,11008,11200,13005,13008,13009,14004,14503.

No ofrecer un don solo porque se puede representar su nombre: los de plantas,recetas y cartas requieren primero corregir diferencias estructurales de las habilidades locales.

## Contradicciones y riesgos de traduccion

- **14506 Portada: bloquear.** ES: El tiempo de recuperación aumenta, pero todos los testimonios visibles activan una entrevista. FR: Interview déclenche un témoignage proche supplémentaire. Son reglas distintas. No elegir una por inferencia ni combinar ambas.
- **13012 El prestigio:** ES: El primer enemigo golpeado por tu as de espadas se reduce, el segundo queda aturdido y el tercero explota. FR: Le premier ennemi touché par votre as de pique est ralenti, le deuxième est étourdi et le troisième explose. El primer efecto FR es ralentizacion; ES no significa reducir tamano ni estadisticas. Requiere proyectil ordenado con3impactos,por eso diferido.
- **10006:** ES solo menciona rebote; FR confirma explosion adicional. Un rebote cosmetico no cumple la descripcion francesa.
- **10206:** ES mas fuertes es impreciso; FR plus resistantes es resistencia/salud de zarzas, no dano. No ofrecer un aumento de dano usando ese ID.
- **11000-11002:** entradas ES siguen en ingles,pero coinciden semanticamente con FR: ciertos ingredientes aparecen MENOS a menudo. No traducir a mejora directa ni frecuencia mayor.
- **11203:** FR indica trampa armada mas de2s; ES configurada2s no prueba que tiempo desde creacion sea valido.
- **13006 y13008-13009:** ambos idiomas coinciden. El problema es divergencia del prototipo: diamantes usa stun y treboles es buff de potencia; los textos asumen diamantes root y treboles ataque de dano.
- **14004:** ambos idiomas confirman hielo jugador+pet,pero no ventana de buff ni requisito de un reportaje reciente. Marcar esa politica como reconstruccion local.
- **14504:** congeles no equivale a slow; si se reutiliza stun,explicar aproximacion visual/elemental.

## Dones restantes revisados al cierre de v0.11 (snapshot historico; ver IMPLEMENTATION_V111 para el estado actual)

- 1006 Parar: Da una oportunidad para detener los ataques recibidos.
- 1007 Rebote.: El daño aumenta contra el último enemigo que te ataca.
- 1008 Ballesta.: No atacar por un tiempo aumenta el daño del siguiente ataque.
- 1104 Contrato.: Atacar por la espalda aumenta el daño.
- 1106 Pararrayos.: El daño de veneno aumenta y se convierte en daño de relámpago.
- 1107 Dulces sueños.: La última aparición de veneno tratado por la daga aumenta considerablemente.
- 1201 Trituradora de armadura: El daño aumenta si se mitiga. Implementado en v0.111 con coeficiente y reglas locales; la entrada original no aporta cifras.
- 1202 Sap: Cada 3 golpes, el objetivo queda aturdido.
- 1301 Tiro pesado: Las flechas pasan por un enemigo adicional.
- 1405 Lado siego.: Las flechas rebotan en los enemigos cercanos.
- 1409 Flecha llameante: Las flechas pueden golpear varios objetivos, pero el daño se reduce.
- 1504 Aspecto del zorro.: Bloquear un ataque a veces agrega un uso a tu segunda arma.
- 1507 Aspecto de la serpiente.: Da un 30% de probabilidad de bloquear un ataque, sin consumir una carga, incluso si el escudo no está levantado.
- 1509 Aspecto del cuervo.: Aumentar el radio de protección de los aliados.
- 1704 Triaje.: Curar a dos aliados al mismo tiempo.
- 1706 Cirugía.: Se aumenta la curación del último uso.
- 1708 Desinfectante.: La curación con el tiempo inflige daño al monstruo más cercano.
- 1709 Vitamina.: Reduce el daño recibido por el objetivo durante la curación.
- 1710 Efecto placebo.: Aumenta la duración de la curación periódica.
- 10005 Naturaleza furiosa.: Invoca una hoja viva que puede atacar a los enemigos.
- 10106 Tornado.: Activa la aparición de un tornado que inflige daño a los enemigos en el momento de la desaparición.
- 10112 Polvo fertilizante.: Invoca una hoja viva que puede atacar a los enemigos.
- 10201 Permacultura.: Las plantas crecen solas cuando están cerca de otra planta.
- 10202 Equipo de abeja.: Una abeja viene a defender tus plantas cuando son atacadas.
- 10206 Barbecho.: Solo puedes plantar espinas, pero son más fuertes.
- 10208 Malas hierbas.: Cuando una planta es destruida, aparecen espinas en su lugar.
- 10209 Polinizando.: Tu lirio de los valles cura otras plantas cercanas automáticamente.
- 10210 Esquejes salvajes.: Tu lirio de los valles tiene la oportunidad de multiplicarse.
- 11000 Vegetarian cuisine: Ingredients improving the attack appear less often.\n
- 11001 Carnivorous cuisine: The ingredients providing heal appear less often.
- 11002 Exotic cuisine: Defense enhancing ingredients appear less often.
- 11011 Guante de cocina.: Ser atacado mientras llevas tu caldero aumenta la duración de sus efectos.
- 11204 Activación manual: La trampa se dispara manualmente y el daño aumenta.
- 11209 Trampa totémica: Después de la activación de la trampa, un yunque cae del cielo sobre los enemigos.
- 12000 Testimonio de muerte: Permite recoger testimonio de muerte.
- 13001 Manga larga.: Los aliados afectados por el as de corazones devuelven el siguiente ataque recibido.
- 13007 Fanfarrón.: Los daños del as de tréboles aumentan considerablemente, pero durante un breve período de tiempo quedas aturdido y el daño que recibes aumenta.
- 13010 La prenda.: Se lanza un as de espadas adicional a cada enemigo cercano.
- 13011 El truco.: El as de espadas vuelve al Estafador después de unos momentos.
- 13012 El prestigio.: El primer enemigo golpeado por tu as de espadas se reduce, el segundo queda aturdido y el tercero explota.
- 14000 Escándalo de Estado: Informes de "rayos" golpean a todos los enemigos cercanos.
- 14001 Fotógrafo de guerra: Las mejoras de armas afectan a los aliados cercanos.
- 14006 Propaganda: Los enemigos envenenados por tus informes sufren más daño.
- 14506 Portada: El tiempo de recuperación aumenta, pero todos los testimonios visibles activan una entrevista.

Los44 diferidos abarcan armas restantes y mecanismos con nuevas entidades/interacciones: hojas invocadas,tornado,abeja,reproduccion de plantas,recetas por ingredientes,activacion manual de trampa,yunque,cartas de retorno/orden de impactos y variantes ambiguas. Todos se han contrastado con el indice; la priorizacion no afirma imposibilidad de implementarlos.

## Evidencia y cierre

Texto original: original-translations/tfmadv_es.raw ytfmadv_fr.raw con hashes manifest.json. Fuente de URL/parser: Evidence ev_b384c8ddf9355e911dc8c0fc7d857fb955734407b00671135b0c27d9786b491c. Estructura protocolo pet/recompensas: ev_a3138d73947b6f9ea98c6d58534cc96475c5af79ec790105947a5dd09792d891. Estas evidencias no recuperan magnitudes,probabilidades,mapa de categorias servidor,exclusividades ni version exacta de cada traduccion.

No se ejecutaron pruebas. No se modificaron archivos del juego.
