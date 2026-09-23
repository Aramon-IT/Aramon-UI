# Audience-first UX review

Use this reference for design critique, implementation review, or pre-release validation.

## 1. Walk the first minute

Enter as a new user in each role. Without relying on prior product knowledge, determine:

- where you are;
- what is happening now;
- what the product expects next;
- what will happen if you act;
- where to recover if the required data or permission is missing.

Record hesitation, not just failure. A task that succeeds after guessing is still a UX issue.

## 2. Walk the real workflow

Use realistic content and sequence the domain events. Verify that the UI does not skip required events or expose future information.

Check at least:

- first use with no data;
- a partially configured state;
- the normal happy path;
- reuse of existing work;
- multiple recipients or assignments;
- denied or unavailable dependencies;
- archive/restore or other reversible lifecycle states when supported.

## 3. Audit truthfulness

For every visible number, status, list, and success message, identify its source. Flag:

- mock data presented as real;
- optimistic success with no persisted result;
- stale or cross-role data;
- a disabled control without an explanation;
- a UI affordance whose backend authorization differs;
- “coming soon” behavior that appears operational.

## 4. Audit attention

Blur your eyes or inspect the page at a glance. The dominant element should correspond to the next meaningful decision. Flag:

- multiple Lamp actions;
- every card having equal visual weight;
- decorative heroes larger than their informational value;
- secondary metrics displacing urgent work;
- large empty regions with no focus function;
- repeated rows using costly effects.

## 5. Audit language

- Use domain terms consistently.
- Ensure labels distinguish states precisely.
- Replace vague verbs such as “Submit” or “Manage” when a more explicit action reduces uncertainty.
- Confirm error messages explain recovery without leaking sensitive implementation details.
- Verify added copy in English, French, and Arabic; inspect Arabic in RTL rather than reviewing strings alone.

## 6. Audit interaction and inclusion

Test keyboard-only navigation, focus order, screen-reader names, reduced motion, 200% zoom, narrow screens, long text, empty content, light theme, and dark theme. Ensure overlays close predictably and restore focus.

## 7. Report by user impact

Describe each issue as:

```text
Audience + context → observed confusion/risk → underlying cause → smallest durable correction
```

Prioritize blocked workflows, incorrect visibility, authorization mismatch, and misleading state before visual polish. Aesthetic inconsistency matters when it damages hierarchy, trust, readability, or brand behavior.
