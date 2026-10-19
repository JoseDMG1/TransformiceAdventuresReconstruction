# Gift 1006: passive sword parry - v0.44

Evidence: the original Spanish description says there is a chance to stop incoming attacks; French uses *parer les attaques reçues*. Neither translation gives a probability or requires the player to be guarding. Sources: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local implementation: while the sword is equipped, attacks from recognized creatures can be parried before normal shield block resolution. Parrying consumes no shield charge and uses the existing block ring/sound. The local balance is 15% per copy, capped at 60%; this value is not recovered from the original. The save schema is unchanged.
