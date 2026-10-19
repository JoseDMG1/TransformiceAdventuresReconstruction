# Gift 1007: sword reprisal - v0.45

Evidence: the original ES description states that damage increases against the last enemy that attacked the player; French says the same. Neither translation gives the increase. Sources: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local implementation: recognized enemies receive monotonically assigned UIDs from the existing field serial. `hurtPlayer` records the attacking enemy UID; sword attacks apply +25% damage per copy, capped at +100%, against that enemy. The UID and player target are included in the existing journey snapshot. Old saves without IDs receive unique negative IDs and default player target 0. This does not change the save schema version.

The same update fixes a persistence omission from v0.43: `anvil` fields were accepted by the sanitizer but excluded from journey capture. They are now included, with their fall coordinates and impact state.
