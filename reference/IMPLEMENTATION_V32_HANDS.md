# Two-hand interruption — v0.32

## Evidence

The archived-client REA summary `reference/REA_FINDINGS.md`, Evidence `ev_6dfff47c4a2703576390fbcc4c8e245f337b2ca7807e2ebcdc7f434a7d8986dd`, records static observations from `_tfmAdventure/ClavierADV.js` and the weapon modules: left/right inputs control separate hands, and activating one hand interrupts the other. The evidence is static client analysis; server authority and all timing details are not established by this fact alone.

## Local change

- Starting a bandage cancels the current weapon action, stops held primary input, and releases the attack-duration lock.
- Starting shield guard cancels the current weapon action and clears held primary input and its duration lock.
- The shared 350 ms weapon activation gate is preserved, so interrupting an action does not bypass the recovered minimum reactivation interval.
- Starting a weapon attack already cancels guard and bandage casting, completing the mutual hand interruption path.

No save fields or save version changed. The shared gate and interruption behavior follow REA evidence; bandage/shield cooldowns, healing, damage reduction, and exact animation windows remain local values.

