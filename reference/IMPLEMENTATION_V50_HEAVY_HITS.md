# Gift 1202: every third heavy hit stuns - v0.50

Evidence: ES says each 3 hits the target is stunned; FR says every 3 hits the target is stunned. No duration or weapon family appears in those strings. Sources: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local implementation: count landed greatsword hits per enemy and stun that enemy on every third hit for 1.5 seconds. The interval is explicit; duration is provisional. The local catalog maps this gift to the two-handed greatsword because it is the available heavy weapon. The original family mapping remains unverified. Enemy counters are included in the existing journey save; old saves default to zero. No schema version change.

Gift 1201 is still unresolved: its translations only say damage increases "if mitigated", without identifying what is mitigated. The current local enemy model has no mitigation mechanic, so implementing it needs stronger original evidence or a new explicit mechanic decision.
