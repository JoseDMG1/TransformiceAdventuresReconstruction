# Gift 11209: totemic trap - v0.43

Original catalog evidence: `reference/original-translations/catalog_es.json` describes an anvil falling onto enemies after the trap activates. It does not give damage, delay, or impact radius. The recovered animation metadata identifies the original anvil hit clip as effect ID 35, `fx/hit/enclume` (`reference/original-data/animation-metadata.json`); the renderer uses that clip with a small vector fallback.

Local behavior: after the initial trap hit, an anvil is scheduled for each target still alive. It falls for 0.55 seconds, hits living enemies within 46 world pixels of its landing point, and deals the trap's base damage. Those timing, radius, and damage rules are provisional. Save serialization includes the anvil field and impact point without changing the save schema version.
