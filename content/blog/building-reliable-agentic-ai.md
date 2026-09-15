The demo ends with a perfect answer.

The real work begins with the next question.

“Actually, use the other option.”

“Can you explain that before I confirm?”

“It timed out. Should I try again?”

These are ordinary things for a person to say. For an agent, they test whether it understands context, preserves a decision, respects a boundary, and knows what happened outside its own conversation.

Building agentic AI means connecting language to consequences. The model interprets a request, chooses or proposes a next step, receives evidence from tools, and continues toward an outcome. Around that loop, software must keep track of facts, permissions, progress, and failure.

This guide explores the problems that make that work difficult, the engineering choices that help, and how observability and evaluations turn individual fixes into a repeatable practice. The examples are hypothetical; the lessons apply across assistants, internal tools, and automated workflows.

> Reliability grows when every failure leaves behind two things: an explanation and a way to catch it next time.

## 1. Start with a promise you can test

“Build an agent” is too large a starting point. It leaves the most important decisions unanswered: who needs help, what the system may do, and what counts as a good outcome.

Choose a small job. An assistant that explains a policy from approved documents has a clear starting boundary. Adding a tool that checks eligibility is another milestone. Submitting a request introduces a different level of responsibility.

Write down three things before choosing a framework:

- **The outcome:** What should the person be able to accomplish?
- **The evidence:** What establishes that the answer or action is correct?
- **The boundary:** What requires clarification, authorization, or human help?

For a policy assistant, “correct” could mean citing the policy version applicable to the user's question and preserving its exceptions. For a request-submission agent, success requires a confirmed backend result.

Give the language model room to interpret language. Give application code ownership of validation and permissions. A useful agent can combine flexible reasoning with a tightly controlled workflow for actions that change records.

Begin with one end-to-end task that you can inspect. Complexity becomes easier to justify when it solves a failure you have actually observed.

## 2. Decide where truth lives

An agent can receive a relevant document and still produce the wrong answer.

An older policy may use nearly identical language to the current one. A document may apply to a different region. A quoted amount may be a deposit rather than the total price. Similarity is useful for finding candidates; authority determines which candidate should govern the answer.

**Retrieval-augmented generation**, or RAG, supplies retrieved passages to the model before it answers. A dependable retrieval path also needs context about those passages: version, effective date, subject, and scope.

For each kind of question, establish an authoritative source. Written explanations might come from an approved knowledge base. Current availability, account state, or pricing may require a live service.

Then make uncertainty explicit. If evidence is missing, say what is missing. If sources conflict, apply a documented precedence rule or ask for help. Preserve unknown values instead of turning them into convenient defaults.

Citation validation provides one useful check: a returned reference must belong to the retrieved material. A separate question remains: does that material support the actual claim? Both matter.

A practical first exercise is to list ten questions and name the source that should answer each one. Include a question your sources cannot answer. The fallback is part of the design.

## 3. Debug the decision before the sentence

Compare these requests:

“How do I cancel a request?”

“Cancel my request.”

The words overlap, but the system must take different paths. One needs information. The other needs identity, a target record, permissions, and possibly explicit confirmation.

Routing is the decision about which path to take. When that decision is wrong, improving the final writing prompt may simply produce a more polished mistake.

Inspect the route, extracted constraints, and chosen source first. A follow-up such as “What about the second option?” needs context to resolve its reference. That history should help identify the subject; it should not become an authoritative source of facts or permission to act.

Give each tool a clear purpose, validated inputs, and a predictable result shape. Return distinguishable outcomes for missing data, rejected input, and service failures. A model cannot reason reliably about a tool result that hides every problem behind an empty string.

Bound the loop as well. Set limits on steps, tool calls, elapsed time, and retries. Repeating the same lookup without new information is a signal to stop or change approach.

Keep pairs of similar-looking requests in your test set. They expose routing weaknesses that a collection of unrelated examples can miss.

## 4. Separate conversation from state

People interrupt workflows. They ask a question halfway through a form, change a preference, leave, and return.

A transcript captures what was said. Workflow state records what is currently true: the selected item, verified identity status, pending review, and completed operations.

Store those facts explicitly on the server. Define allowed transitions between stages and validate every transition. This is a **state machine**: named stages with rules about what can happen next.

A question asked during a pending review should not erase the review. An edited selection should invalidate any confirmation attached to the old details. An expired credential should change which actions are permitted, even if the conversation still sounds ready to proceed.

Structured controls can help at these boundaries. A selection submits a real identifier; a review presents the exact intended action; confirmation refers to that reviewed version. The server checks each event against current state.

Before adding long-term memory, make the current task resumable and unambiguous. Remembering everything someone said is less useful than reliably knowing which operation is still pending.

## 5. Treat actions as commitments

“Yes” can mean “I understand,” “show me more,” or “submit it.” Consequential operations need an agreement precise enough to validate.

Present a review of the action and its relevant side effects. Tie confirmation to that version of the review. Recheck permissions and mutable facts immediately before writing.

Keep credentials in the service layer that needs them. Limit the model's access to sensitive fields, and enforce tool authorization in application code. Tool descriptions and prompts can guide behavior; permission checks must still hold when that guidance fails.

External documents and tool responses also deserve a trust boundary. Treat their contents as evidence to examine, never as authority to rewrite the agent's instructions or grant new capabilities.

Integration constraints need equal care. If an upstream API cannot honor a user's choice, expose the limitation or provide a supported alternative. Silently changing the choice to make a request succeed breaks the agreement.

A well-designed action path makes its consequences understandable before execution and verifiable afterward.

## 6. Preserve uncertain outcomes

Suppose a service creates a record, but the response is lost on the way back.

The agent sees a timeout. The record may already exist.

Retrying immediately risks duplication. Claiming failure may cause the user to submit again. Claiming success lacks evidence.

Represent **unknown outcome** as an explicit state. Save an operation identifier and an in-flight checkpoint before writing. Where the downstream service supports idempotency, reuse a stable key so repeated delivery refers to the same logical operation. Confirm the scope and retention of that guarantee rather than assuming a request ID provides it.

When the outcome cannot be established safely, prevent another conflicting submission and reconcile against the backend through an authorized process. A completed repeat request should return the known result.

The storage behind these decisions becomes part of correctness. Losing the fact that a write may already have happened can create real duplicate work. Persistence, concurrency control, and retention need to match the operation's lifecycle.

This is also an important evaluation case: simulate a write that succeeds followed by a lost response. Check whether the agent preserves uncertainty and whether its wording matches the evidence.

## 7. Set up observability around the whole journey

Observability helps you understand a system's behavior from the evidence it records. For an agent, that includes the path between the incoming request and the final response.

A **trace** groups the operations within a request. Nested observations record steps such as routing, retrieval, model calls, tool execution, and state transitions. Timing and outcomes help locate the point where behavior changed. Platforms such as Langfuse support this structure; see its [observability guide](https://langfuse.com/docs/observability/overview).

### Capture the evidence needed to debug

Start with a request or trace identifier and an opaque session identifier for related turns. Propagate correlation identifiers through your agent and tool services.

Record a deliberate set of fields:

| Layer | Useful evidence | What it helps explain |
| --- | --- | --- |
| Routing | Chosen route and non-sensitive constraints | Why this path ran |
| Retrieval | Source identifiers, versions, and permitted excerpts | Whether the required evidence reached the model |
| Model calls | Model and prompt version, permitted inputs and outputs, token usage | Which configuration produced the response |
| Tools | Tool name, safe arguments, status, duration, operation reference | What was attempted and what was confirmed |
| Workflow | State before and after, validation outcomes | Where progress stopped or changed |
| User outcome | Feedback or an independently confirmed completion event | Whether the interaction helped accomplish the task |

Version information matters. A regression is difficult to isolate if every trace says only “the agent.” Include the application release and relevant retrieval configuration alongside the prompt and model identifiers.

Do not export secrets or indiscriminately log entire payloads. Redact before export, restrict access, and set retention deliberately. When sensitive values cannot be recorded, keep safe validation outcomes or references. Mark a check as unavailable when the remaining evidence cannot support it.

### Make feedback traceable

Attach a rating or issue report to the response that prompted it. A thumbs-down without a trace tells you someone was unhappy. A thumbs-down attached to the request lets you investigate why.

Feedback is selective: most people will not rate an answer. Review a random sample of ordinary traffic as well as reported failures, long-running requests, and difficult workflows. Otherwise, your view of quality will reflect who chose to complain.

Monitor operational signals separately: tool errors, timeouts, latency percentiles, call counts, and cost. Existing error events already establish many technical failures. Spend evaluation effort on the behavioral questions those events cannot answer.

A successful HTTP response can still contain an unsupported answer. A quick interaction can still end without resolving the task.

## 8. Set up evals around specific failures

An **evaluation**, or eval, checks behavior against an explicit expectation. A useful eval tells you what failed and what decision that failure should affect.

Start by reading representative traces and writing short failure notes. “Bad response” is too vague. “Used an expired policy despite retrieving the current version” gives you a target. Keep recurring failure categories and critical requirements visible. This approach follows Langfuse's guidance on [choosing what to evaluate](https://langfuse.com/academy/evaluate/choosing-what-to-evaluate).

### Build a small dataset you can trust

A dataset is a collection of repeatable scenarios. Preserve the conversation and starting state required to reproduce each problem, plus controlled tool responses where appropriate. A final user message alone may omit the very interruption that caused the failure.

Keep three responsibilities separate: input describes the scenario, expected behavior defines success, and metadata records provenance and tags. Version the dataset so experiments can be compared against the same cases. The [dataset guide](https://langfuse.com/academy/datasets) provides further background.

Here is an illustrative case, independent of any particular SDK:

```json
{
  "id": "review-interruption-001",
  "input": {
    "state": "awaiting_confirmation",
    "selected_option": "option_b",
    "message": "Explain the policy before I confirm.",
    "knowledge_fixture": "policy_current_v3"
  },
  "expected_behavior": {
    "route": "knowledge",
    "state_after": "awaiting_confirmation",
    "selected_option": "option_b",
    "write_count": 0,
    "answer_uses": "policy_current_v3"
  },
  "metadata": {
    "category": "workflow_interruption",
    "source": "sanitized_failure_reproduction"
  }
}
```

A runner should restore the fixture, execute the turn, collect the result and trace, then evaluate each expectation. A reviewer should verify the expected behavior before treating it as ground truth.

Include ordinary successful tasks alongside edge cases. Keep a separate holdout set that you do not repeatedly tune against. Use synthetic examples to fill specific gaps, then validate that they represent plausible interactions.

### Choose a check that matches the question

Different expectations need different evidence and methods. Code, human review, and model judges each have a role; Langfuse's [evaluator guide](https://langfuse.com/academy/evaluate/writing-evaluators) discusses these choices.

| Expectation | Suitable check | Important limit |
| --- | --- | --- |
| An interruption preserves the selected option | Compare structured state before and after | The runner needs access to that state |
| No write occurs before confirmation | Inspect tool execution and backend audit evidence | Final response text cannot prove absence of a write |
| A policy answer preserves an exception | Human review or a focused model judge using the policy | A valid citation alone is insufficient |
| A repeated operation does not duplicate a record | Integration test with controlled backend state | Mocking the tool cannot prove backend deduplication |
| A timeout is described as uncertain | Check operation status and review the response against it | A timeout alone does not establish failure |

For a model judge, define a narrow rubric. For example: fail if the answer contradicts the supplied policy's eligibility exception; pass if it preserves that exception; return “not evaluable” if the policy evidence is unavailable. Require a brief explanation anchored to the evidence.

Calibrate the judge against human-labeled examples, including subtle failures and borderline cases. Inspect disagreements. Keep some labeled examples separate from rubric tuning, and recheck agreement when the judge or rubric changes. Treat the answer being judged as untrusted content so it cannot legitimately instruct the evaluator to award a pass.

### Compare changes as experiments

Run the current implementation and the candidate against the same dataset, evaluator versions, and controlled dependencies. Record prompt, model, code, tool-contract, and knowledge versions. A changing external service can otherwise masquerade as a model improvement.

Compare results case by case and by failure category. Repeat important scenarios when model variability could affect the conclusion. Report failures and sample counts alongside rates; a perfect score on five examples is limited evidence.

Choose release criteria from the task's consequences. Any observed unauthorized write might block release, while answer completeness may be assessed alongside latency and cost. Define those decisions before inspecting the candidate's results.

Use sandbox fixtures for operations with side effects. Keep real integration acceptance checks separate and controlled. Passing a mocked suite does not establish that every production dependency behaves correctly.

## 9. Make observability and evals one feedback loop

Observability supplies the evidence of what happened. Evals turn selected expectations into repeatable checks. Production monitoring then tests whether an improvement holds under real traffic.

Consider a hypothetical assistant that answers a policy question using an expired rule. Its grammar is excellent, the API returns success, and latency looks healthy.

1. **Observe:** A user reports the answer. The trace shows that both current and expired passages were retrieved, but the response followed the expired one.
2. **Classify:** The failure is a policy-authority mistake. The evidence was present; the selection rule failed.
3. **Reproduce:** Sanitize the interaction and preserve both passages as a fixture. Add neighboring cases where older policies are correctly requested for historical questions.
4. **Evaluate:** Define whether the answer uses the policy applicable to the question and preserves its exceptions. Have a reviewer label the cases and validate any automated judge.
5. **Improve:** Change the authority handling, then compare the candidate with the baseline on those cases and the broader regression set.
6. **Release gradually:** Route a limited share of appropriate traffic to the candidate. Inspect the same failure category, operational signals, and user outcomes, with a rollback path available.
7. **Learn again:** Review fresh traces, including unflagged ones, and add newly discovered failure modes to the dataset.

This cycle connects live monitoring, datasets, experiments, and evaluation, as described in the [evaluation overview](https://langfuse.com/academy/evaluate).

### Use offline and online evaluation for different evidence

**Offline evals** run before release with known scenarios, fixtures, and reviewed expectations. They can check exact intended routes or outcomes because the test defines them.

**Online evals** inspect actual traffic. They can check answer consistency with recorded evidence, permission outcomes, or confirmed receipts when those signals exist. They usually cannot know an ideal answer or the user's actual satisfaction without additional evidence. An answer supported by a retrieved document may still be wrong if that document is stale.

Run inexpensive deterministic checks broadly where appropriate. Sample expensive judges and human review. Separate random samples used to estimate prevalence from targeted samples used to hunt failures; combining them carelessly distorts the apparent failure rate.

Keep evaluations linked to traces, release versions, and dataset cases. A dashboard should let an engineer move from a score change to the failing interactions and then to the experiment intended to fix them.

### Make the measurements lead somewhere

Each recurring signal needs a response. Rising tool timeouts point toward dependency investigation. More state-loss cases point toward workflow handling. Increasing unsupported claims require examining retrieval and generation evidence. A growing queue of uncertain operations requires reconciliation ownership.

Track quality by relevant slices: task, language, workflow stage, and release. An overall improvement can hide a regression in a less common but consequential path.

Decide who reviews failures, who can halt a rollout, and how unresolved cases reach an owner. Keep monitoring and evaluation work from consuming the agent's interactive latency budget, and monitor failures in the evaluation pipeline itself. Missing scores should remain visibly missing.

No dashboard guarantees excellence. This loop makes regressions easier to detect, explanations easier to find, and improvements easier to verify.

## 10. A practical path from first agent to production

Start small enough to see the whole system, but introduce measurement early enough that you can tell whether it is improving.

1. **Define one job and its boundaries.** Write a few reviewed examples of success, failure, and justified refusal.
2. **Build a read-only path with tracing.** Capture routing, evidence, output, and timing from the beginning.
3. **Review the first difficult interactions.** Turn specific recurring problems into a small evaluation dataset.
4. **Add one tool and explicit state.** Test interruption, missing data, expiry, and invalid transitions.
5. **Add a controlled write path.** Design confirmation, idempotency, uncertain outcomes, and reconciliation together.
6. **Compare changes before release.** Version the inputs to each experiment and inspect individual regressions.
7. **Roll out with a feedback loop.** Combine operational monitoring, trace-linked feedback, sampled evaluation, and human review.

You do not need an elaborate platform on day one. You do need a way to explain what happened, a clear definition of what should have happened, and a repeatable way to compare the two.

A capable model gives an agent possibilities. Evidence, state, permissions, and careful recovery make those possibilities usable. Observability lets you see the distance between intention and behavior. Evals help you close it, one verified improvement at a time.

The first good answer is a beginning.

The craft is making the next thousand worthy of trust.
