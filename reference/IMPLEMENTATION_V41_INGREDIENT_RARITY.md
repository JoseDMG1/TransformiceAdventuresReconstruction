# Gifts 11000–11002: ingredient frequency — v0.41

- Gift 11000 reduces the relative weight of attack ingredients, 11001 reduces healing ingredients, and 11002 reduces defense ingredients in random enemy-drop selection.
- The selection is now a small reusable `chooseIngredientType(weights, random)` function in `dist/cooking.js`. Explicitly returned ingredients keep their existing type and bypass the random selector.
- Each copy reduces the corresponding weight by 50%; a small nonzero floor prevents the type from disappearing entirely when copies stack. The original descriptions only say “less often”, so these are local tuning values.
- REA/static evidence documents the three ingredient categories; the exact server probabilities and drop rules are not available.
- No save schema change. Browser QA remains pending.
`npm run check` passed; browser QA remains pending.
