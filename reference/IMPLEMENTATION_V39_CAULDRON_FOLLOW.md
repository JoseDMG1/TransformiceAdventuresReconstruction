# Gift 11007: Caldero fiel — v0.39

- The original gift description says the Chef's cauldron follows them. When the gift is active, a newly created or existing cauldron remains in carried/follow mode and moves smoothly toward the player.
- Existing persistence already stores the cauldron's position, `carried` flag, recipe ingredients, cooking phase, and remaining time. The gift uses these fields and does not change the save schema.
- Manual skill/world interaction cannot turn follow mode off while this gift is active.
- Smooth-follow speed and automatic carried mode are local implementation choices; the original text establishes following, not its movement physics.
- The gift record is generated from the original Spanish catalog by `scripts/build-gifts.mjs` and is limited to the Chef cauldron skill.
`npm run check` passed; browser QA remains pending.
