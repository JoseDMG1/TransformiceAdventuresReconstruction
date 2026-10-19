# Gift 1107: final dagger poison occurrence - v0.49

Evidence: original ES says the last occurrence of poison applied by the dagger is greatly increased; FR says the same. No multiplier is specified. Sources: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local implementation: dagger poison records that it is dagger-sourced and how many scheduled ticks remain. Reapplying poison preserves the existing partial tick timer and recomputes the number of pulses that fit in the refreshed duration, so the last pulse is still identified. That pulse gets +100% damage per copy, capped at +300%. These numbers and the tick-count interpretation are provisional.

When combined with instant-poison gift 1101, the entire poison burst is treated as the final occurrence and receives the same multiplier. Plant-applied poison is explicitly marked as non-dagger poison. New enemy fields are included in journey serialization; legacy saves default to no dagger attribution where the source cannot be recovered. No save schema version change.
