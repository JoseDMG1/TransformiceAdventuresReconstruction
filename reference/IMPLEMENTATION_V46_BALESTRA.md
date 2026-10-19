# Gifts 1006-1008: sword-family passives - v0.46

Original descriptions are in `reference/original-translations/indices_es.json` and `indices_fr.json`. For 1008, both say that refraining from attacking for some time increases the next attack's damage. Neither specifies wait duration or bonus. Its Spanish name is "Ballesta" while the local family plan assigns 1001-1008 to sword; that category remains an inference from the numeric family, not server evidence.

Local 1008 implementation: while the gift is active, 3 seconds without a basic weapon attack charges the next sword attack. That attack receives +50% per copy, capped at +150%; it is consumed when the attack begins, even if it misses. A readiness prompt appears. The wait, bonus, weapon-family assignment, and treatment of skills as non-basic attacks are local interpretations.

Timer and ready state use the existing player states object; in-progress bonus is serialized on the action. Older saves omit these fields and receive zero defaults. No save schema version change. `npm run check` passed; browser QA remains pending.
