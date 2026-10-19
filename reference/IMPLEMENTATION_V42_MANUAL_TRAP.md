# Gift 11204: manual trap activation - v0.42

Original Spanish and French gift descriptions say the trap triggers manually and deals increased damage. They do not specify the multiplier or input. Local input uses the nearby E interaction. Once the trap arms, approach and press E or click the interaction prompt. Manual detonation uses existing trap effects and can be triggered with no enemies present; targets in range receive +50% damage per gift stack. The multiplier is provisional.

Trap activation intent is serialized in `dist/persistence.js` as `manualTrigger`, preserving a save made between interaction and field update. No save version change. `npm run check` passed; browser QA remains pending.
