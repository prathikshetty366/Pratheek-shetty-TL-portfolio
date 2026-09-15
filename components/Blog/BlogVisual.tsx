export function BlogVisual() {
  return (
    <div className="blog-visual" aria-label="Two-phase commit compared with the Saga pattern">
      <div className="blog-visual-grid" />
      <div className="blog-visual-label">Transaction topology / 01</div>
      <div className="blog-visual-columns">
        <div className="blog-model">
          <div className="blog-model-title"><span>2PC</span><em>Global lock</em></div>
          <div className="blog-node blog-node-primary">Coordinator</div>
          <div className="blog-connector" />
          <div className="blog-node-row">
            <div className="blog-node">Order</div>
            <div className="blog-node">Payment</div>
            <div className="blog-node">Inventory</div>
          </div>
          <div className="blog-status blog-status-lock">Waiting for consensus</div>
        </div>
        <div className="blog-model blog-model-saga">
          <div className="blog-model-title"><span>SAGA</span><em>Local commits</em></div>
          <div className="blog-saga-flow">
            <div className="blog-node">Order</div><b>→</b>
            <div className="blog-node">Inventory</div><b>→</b>
            <div className="blog-node">Payment</div>
          </div>
          <div className="blog-compensation">← compensate on failure</div>
          <div className="blog-status blog-status-live">Eventually consistent</div>
        </div>
      </div>
    </div>
  );
}

const scalingStages = [
  ["01", "Optimize", "Queries · indexes"],
  ["02", "Scale up", "CPU · memory · I/O"],
  ["03", "Reduce", "Cache · queues"],
  ["04", "Replicate", "Read routing"],
  ["05", "Partition", "Data lifecycle"],
  ["06", "Separate", "Search · analytics"],
  ["07", "Distribute", "Federate · shard"],
];

export function DatabaseScalingVisual() {
  return (
    <div className="scaling-visual" aria-label="The practical database scaling ladder">
      <div className="blog-visual-grid" />
      <div className="blog-visual-label">Scaling topology / 02</div>
      <div className="scaling-axis">
        <span>Lower complexity</span>
        <i />
        <span>Higher complexity</span>
      </div>
      <div className="scaling-stages">
        {scalingStages.map(([index, title, detail]) => (
          <div className="scaling-stage" key={index}>
            <span>{index}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
      <div className="scaling-rule">
        <span>Principle</span>
        <p>Earn the right to distribute.</p>
      </div>
    </div>
  );
}

export function AgentBuildingVisual() {
  return (
    <section aria-label="The agent reliability feedback loop" className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[#0b1010] px-6 py-9 sm:px-12 sm:py-12">
      <div className="blog-visual-grid pointer-events-none" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-technical/[0.06] blur-3xl" />
      <p className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-technical">Field notes / Building trust</p>
      <p className="relative mt-8 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.04em] text-zinc-200 sm:text-5xl">Trust grows with<br /><span className="text-zinc-500">every verified improvement.</span></p>
      <div className="relative mt-10 grid gap-7 border-t border-white/10 pt-7 sm:grid-cols-3 sm:gap-8">
        {[
          ["01", "Observe", "Follow the evidence behind each outcome."],
          ["02", "Evaluate", "Turn difficult cases into repeatable checks."],
          ["03", "Improve", "Verify the change. Learn from production."],
        ].map(([number, title, detail]) => (
          <div key={number}>
            <span className="font-mono text-[10px] text-technical">{number}</span>
            <h2 className="mt-3 text-sm font-medium text-zinc-200">{title}</h2>
            <p className="mt-2 text-xs leading-6 text-zinc-400">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
