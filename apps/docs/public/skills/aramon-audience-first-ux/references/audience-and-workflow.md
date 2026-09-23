# Audience and workflow reasoning

Use this reference when defining a new journey, restructuring a product, or resolving competing UX priorities.

## Audience model

For each role, record only what changes the design:

| Dimension | Questions |
|---|---|
| Goal | What outcome are they trying to reach, in their own words? |
| Entry context | Why did they open the product now? Are they preparing, live, reviewing, or exploring? |
| Knowledge | What vocabulary and product structure can they reasonably know? |
| Pressure | Are they time-constrained, in front of a class, on mobile, or afraid of making a visible mistake? |
| Trust | What must the interface prove before they act? |
| Cost of error | Could the action expose content, affect a class, lose work, or merely be reversed? |
| Frequency | Is this a daily habit, an occasional setup task, or a first-run experience? |

Do not reduce people to generic “technical” or “non-technical” labels. A domain expert can still be new to the product; an experienced user can still be under pressure.

## Workflow map

Write the workflow as domain events, not pages:

```text
Trigger → actor intent → required inputs → authorization/state check
        → domain change → visible recipient outcome → next likely action
```

Mark each step with:

- owner;
- source of truth;
- audience;
- reversibility;
- time sensitivity;
- visibility rule;
- error recovery.

If two products participate, distinguish the system that creates intent from the system that executes it. The UI may provide a route into another service, but must not pretend to own its state.

## Mental-model checks

Ask these before choosing navigation or naming:

- Would the audience look for this by object, event, or task?
- Does the product structure match how work happens outside the software?
- Are we exposing an internal entity that the audience does not need to understand?
- Could a familiar word create a false expectation?
- Is reuse visible as reuse, or will users recreate the same content?
- Does the page reveal content earlier than the real-world workflow permits?

## Attention hierarchy

Classify visible information:

1. **Act now:** one immediate action or decision.
2. **Understand now:** facts needed to act safely.
3. **Monitor:** status that matters but does not need action.
4. **Explore:** optional history, analytics, or configuration.

Higher tiers receive earlier placement and clearer contrast. Quantity does not create priority. A large dataset may belong below a small but urgent decision.

## Dependency-aware empty states

An empty state must answer:

- What is missing?
- Is that expected or an error?
- Who can create or unlock it?
- What can the current user do now?
- Will existing work remain safe?

If the user lacks authority, do not show a fake call to action. Explain who controls the dependency or provide an authorized route.

## Consequential actions

Before an action that publishes, assigns, launches, archives, awards, invites, or deletes, show the object and scope in human terms. Afterward, confirm the observable result—not merely that a request succeeded.

Examples:

- “Publish Axis 2 to Network Group A and Network Group B; 27 students will receive it.”
- “Schedule this quiz for Thursday’s Classroom session.”
- “Archive this course; students keep previously released work.”

The examples clarify the reasoning pattern, not required wording.
