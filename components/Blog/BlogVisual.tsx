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
