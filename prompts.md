# Prompt library

## New feature
**Context:** [app, stack, relevant files]. **Goal:** [feature]. **Constraints:** [scope, conventions, dependencies]. **Acceptance criteria:** [observable, testable outcomes]. **Examples:** [input and expected behavior]. Make a plan first and wait for approval before editing. Work on a branch and report files changed, tests, and PR summary.

## Bug fix
**Context:** [reproduction and environment]. **Goal:** Fix [specific defect]. **Constraints:** Keep the change focused; preserve existing behavior. **Acceptance criteria:** Add a regression test that fails before the fix and passes after. **Examples:** Given [state], when [action], then [result]. Plan first; wait for approval.

## Refactor
**Context:** [code and pain point]. **Goal:** Improve [structure]. **Constraints:** No behavior or dependency changes. **Acceptance criteria:** Existing tests pass and public behavior is unchanged. **Examples:** [before/after shape]. Plan first; wait for approval.

## Generate tests
**Context:** [module/component and current tests]. **Goal:** Cover [behaviors]. **Constraints:** Do not change production code; avoid tests that only assert implementation details. **Acceptance criteria:** Each test fails if its behavior is broken and passes on the correct implementation. **Examples:** [scenario and assertion].

## Review diff
**Context:** [request and relevant constraints]. **Goal:** Find correctness, accessibility, security, and maintainability issues in this diff. **Constraints:** Review only; do not edit. **Acceptance criteria:** Report actionable findings first with file/line and impact; say when there are none. **Examples:** [expected review format].

## Commit message
**Context:** [diff summary]. **Goal:** Propose one concise imperative commit subject. **Constraints:** Keep it under 72 characters; do not claim unverified tests. **Acceptance criteria:** Describe the user-visible or structural change accurately. **Examples:** `Add category filtering to expenses`.

## Add expense feature (five-part prompt)
**Context:** This is a React/Vite expense tracker. `App` owns state; the form is a separate component. Categories are Food, Travel, Bills, and Other.

**Goal:** Let a person add an expense by entering a title, amount, and category.

**Constraints:** Keep the change scoped to the form and integration. Add no dependencies. Preserve keyboard accessibility and stable `data-cy` selectors. Validate before adding.

**Acceptance criteria (each must be testable):** (1) Submitting a non-empty title with a finite amount greater than zero adds exactly one expense with the selected category. (2) A blank or whitespace-only title adds no expense and exposes a validation message. (3) A non-numeric, zero, or negative amount adds no expense and exposes a validation message. (4) Successful submission clears the title and amount fields. (5) Category choices are exactly Food, Travel, Bills, and Other, with Other selected initially.

**Examples:** `Coffee`, `4.50`, `Food` adds a Food expense for 4.50; a title containing only spaces with amount `4.50` is rejected; `Train`, `0`, `Travel` is rejected.
