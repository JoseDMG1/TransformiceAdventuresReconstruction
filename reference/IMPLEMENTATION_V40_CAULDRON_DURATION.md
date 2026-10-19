# Gift 11011: Guante de cocina — v0.40

- While a Chef carries a cauldron with a recipe actively cooking, a valid hit from a recognized enemy extends the recipe's remaining time.
- The trigger occurs before guard/barrier mitigation, so a blocked enemy attack still counts. Hits ignored by player invulnerability or downed/dead state do not count.
- Extra time is stored in the already-persisted `cooking.remaining`; no save schema change was made.
- ES and FR descriptions confirm the condition and duration extension, but specify no amount. The implementation uses one second per owned copy as local tuning, not a recovered server value.
- The gift record is generated from the retained translation catalog and restricted to the Chef cauldron skill.
`npm run check` passed; browser QA remains pending.
