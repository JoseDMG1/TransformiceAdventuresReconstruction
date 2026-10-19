# Gift 1106: lightning poison - v0.48

Evidence: Spanish says poison damage increases and becomes lightning damage; French states the same. The original strings do not specify a multiplier. The recovered effect metadata maps effect ID 37 to `fx/hit/` with animations `hit_test_electrique` and `FX_hit_electrique` (`reference/original-data/animation-metadata.json`).

Local implementation applies to dagger poison only. It preserves the current 5-second duration and 1-second tick cadence, multiplies poison damage by +50% per copy up to +100%, and marks the poison as lightning so each tick uses original FX 37. With instant-poison gift 1101, the converted poison burst is a separate lightning hit. Both damage balance and retaining the existing tick schedule are local decisions. The enemy's elemental status persists in the journey snapshot; old saves default it to false. No save schema version change.
