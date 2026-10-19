# Gift 11008: Queso frito — v0.38

- When the cauldron accepts an ingredient, the gift deals one local fire pulse to each living enemy within the cauldron's current radius.
- The trigger is attached to a successful ingredient insertion, so an invalid insertion or a full/cooking/dirty cauldron does not apply damage. It cannot repeat per update frame.
- The pulse uses the existing ring feedback and damage pipeline; it does not add persistent effects or save fields.
- The Spanish and French gift descriptions establish the trigger and nearby enemies. Damage 8 and using the cauldron's radius are provisional local tuning, not recovered server values. `npm run check` passed.
- `scripts/build-gifts.mjs` generates the authentic ID/name/description and Chef cauldron requirement from the retained translation data.
