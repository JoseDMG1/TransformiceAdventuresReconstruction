# Gift 1104: dagger back attack - v0.47

Evidence: Spanish and French original descriptions say damage increases when attacking from behind. Neither specifies an increase amount or the geometric test. Sources: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local rule: for a dagger hit, compare the player's horizontal position to the enemy's `facing`; the player must be more than 8 world pixels behind the enemy. Damage increases +35% per copy, capped at +100%. Enemy facing is already updated toward its current target during AI simulation. This horizontal-only test and balance are provisional. No save schema changes.
