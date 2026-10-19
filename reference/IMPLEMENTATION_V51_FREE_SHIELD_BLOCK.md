# Gift 1507: free shield block - v0.51

Evidence: original ES and FR both state a 30% chance to block an attack without consuming a charge, even when the shield is not raised. Source files: `reference/original-translations/indices_es.json` and `indices_fr.json`.

Local implementation: with the shield equipped as the secondary weapon, roll a 30% passive block for incoming attacks. It uses the existing shield block reduction, feedback, and block-linked effects, but skips charge consumption. It is not limited to attacks in front because it can occur with the shield lowered. No save schema changes.
