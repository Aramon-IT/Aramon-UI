# @aramon/prompts

Normative instructions for AI agents building and reviewing Aramon interfaces.

## Exports

- `aramonSystemPrompt` - role model, hierarchy, tokens, and implementation rules
- `aramonComponentPrompt` - creates one reusable React/Tailwind component
- `aramonApplicationPrompt` - creates an application composition
- `aramonMediumAnimationPrompt` - implements the sealed liquid physics behavior
- `aramonReviewPrompt` - audits an implementation against the design language
- `createAramonPrompt()` - combines a task with the appropriate Aramon contract

The `src/markdown` directory contains equivalent copy-ready prompts for agents that do not consume TypeScript packages.
