# Desarrollo local v0.96: vendajes y aliados

## Evidencia

Los talentos originales26/27 distinguen curación inicial y periódica. Terapia de grupo29 y Triaje1704 permiten un objetivo adicional. Vacunación1705 convierte exceso en escudo; Esteriliza1707 mejora al curandero; Desinfectante1708 inflige daño desde la curación periódica; Vitamina1709 protege durante la curación; Placebo1710 aumenta su duración. Se reutilizan el catálogo español y la evidencia REA de progresión/traducciones conservada.

## Implementación

- `bandages.js` reúne los parámetros y los relojes. El vendaje proporciona tratamiento periódico base; antes ese componente solo existía al comprar Tratamiento, dejando dones periódicos sin efecto por sí solos. Los valores2 por pulso,6s e intervalo1s son locales, no recuperados del servidor.
- Las cantidades iniciales y periódicas distinguen al curandero de los aliados. Enfermera y Esteriliza ya no aumentan también la curación de Picpic por reutilizar la cantidad personal.
- Cuando Picpic recibe la venda, también recibe su tratamiento periódico. El exceso de curación inicial o periódica genera escudo en el receptor correcto si está activo Vacunación.
- Vitamina dura durante el tratamiento, en lugar de un periodo fijo de2s independiente de la curación. Su duración exacta y esa interpretación del tratamiento como periodo protegido siguen siendo reglas locales.
- Desinfectante busca al enemigo más cercano al receptor que recibe cada pulso. Con dos receptores puede haber dos efectos de daño. Esta resolución y su alcance320px son locales; el texto no especifica el caso multirreceptor.
- Los relojes conservan el sobrante de fotograma y procesan el último pulso al terminar la duración. Los tratamientos de Picpic no lo reviven automáticamente si vuelve a caer.
- Se muestran tratamientos activos en los indicadores y se guarda su estado. Las partidas anteriores sin esos campos reciben cero. Se amplía el límite de validación temporal para no recortar tratamientos extendidos por dones al guardar; el máximo defensivo3600s es local.
- Los números de curación emergentes usan vida realmente recuperada, evitando mostrar la cantidad completa sobre un aliado ya curado.

## Pendientes y estado

El texto `obj_soins` también permite levantar a la mascota mediante elixir. La transición local del tutorial todavía está acoplada a completar una venda; ese flujo queda identificado como siguiente corrección.

Sintaxis revisada en65 archivos. No se añadieron ni ejecutaron pruebas de comportamiento. Las incorporaciones posteriores a v0.81 siguen pendientes de recorrido en navegador. Formato13 y clave de partida conservados. Online excluido.
