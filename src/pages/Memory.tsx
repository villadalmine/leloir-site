
import { BrainCircuit, Database, Plug, BarChart, ShieldCheck, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import './Memory.css';

export function Memory() {

  return (
    <div className="memory-page">
      <div className="memory-hero">
        <div className="memory-hero-content container">
          <BrainCircuit size={64} className="hero-icon" />
          <h1 className="hero-title">The Cost of Forgetting</h1>
          <p className="hero-subtitle">
            Leloir is a brilliant investigator. Without memory, it re-derives everything from scratch, 
            never compounds lessons, and burns budget on known incidents. Memory turns it from a tool that responds into a platform that learns.
          </p>
        </div>
      </div>

      <div className="memory-story container">
        <section className="story-section">
          <div className="section-header">
            <div className="section-number">1</div>
            <h2>Native Memory (Zero Dependencies)</h2>
          </div>
          <div className="glass-card story-card">
            <div className="card-top">
              <Database className="card-icon" />
              <h3>RAG Episodic & memory-mcp</h3>
              <span className="badge badge-proven"><CheckCircle2 size={14}/> Proven</span>
            </div>
            <p>
              Leloir ships with a native memory layer built directly into its core and Postgres database. 
              The <strong>RAG Episodic Memory</strong> captures the exact <code>alert → cause → fix</code> triangle 
              bound to the incident ID. When a similar alert arrives, it injects the past resolution as an auto-runbook in milliseconds, 
              costing $0 in LLM calls. The <strong>memory-mcp</strong> gives agents per-tenant <code>remember/recall/forget</code> capabilities.
            </p>
            <div className="callout">
              <strong>The 80% Default:</strong> This native layer covers the vast majority of operational use cases out-of-the-box, with zero extra infrastructure.
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="section-header">
            <div className="section-number">2</div>
            <h2>The Optional Brain (Pluggable)</h2>
          </div>
          <div className="glass-card story-card">
            <div className="card-top">
              <Plug className="card-icon" />
              <h3>External Memory via MCP</h3>
            </div>
            <p>
              For advanced cross-session continuity, Leloir provides a governed <code>MCPServer</code> slot. 
              You can plug in an external memory brain to gain <strong>NL synthesis (dialectic)</strong> across incidents 
              and <strong>derived observations</strong> about entities (e.g., "What's our rule for JVM sizing?").
            </p>
            <div className="callout callout-highlight">
              <strong>The Differentiator:</strong> Connecting an external memory via the MCP facade gives 
              contained black-box agents (like HolmesGPT) long-term memory <em>without modifying their runtime</em>.
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="section-header">
            <div className="section-number">3</div>
            <h2>Measured Recommendation</h2>
          </div>
          <div className="benchmark-table-wrapper glass-card">
            <div className="table-header">
              <BarChart className="card-icon" />
              <h3>Head-to-Head Benchmarks (2026-07-14)</h3>
              <p>We don't rely on marketing claims. We deployed and measured each backend in our cluster using the same real model (Claude Sonnet 5) and per-consumer API keys.</p>
            </div>
            <div className="table-responsive">
              <table className="benchmark-table">
                <thead>
                  <tr>
                    <th>Backend</th>
                    <th>Status</th>
                    <th>Latency (Capture / Recall)</th>
                    <th>Synthesis (NL)</th>
                    <th>Self-Host Reality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row-recommended">
                    <td>
                      <div className="td-title">Honcho</div>
                      <div className="td-sub">Reference Default</div>
                    </td>
                    <td><span className="badge badge-measured"><CheckCircle2 size={14}/> Measured 4/4</span></td>
                    <td>~45ms / ~330ms</td>
                    <td><span className="text-success">Correct (14-19s)</span></td>
                    <td>Clean deploy. Maps 1:1 to Leloir.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="td-title">Letta</div>
                      <div className="td-sub">Agent-centric</div>
                    </td>
                    <td><span className="badge badge-warning"><AlertTriangle size={14}/> Measured</span></td>
                    <td>~2.5s / ~2.0s</td>
                    <td><span className="text-warning">Failed (Agent cannot reach archival)</span></td>
                    <td>Simple PG-only, but needs strong tools model.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="td-title">mem0</div>
                      <div className="td-sub">Vector+Graph</div>
                    </td>
                    <td><span className="badge badge-danger"><AlertTriangle size={14}/> Measured</span></td>
                    <td>~10-12s / ~370ms</td>
                    <td>N/A (Caller must synthesize)</td>
                    <td><span className="text-danger">8 blockers to boot. Hardcodes Neo4j.</span> Atomizes incident IDs.</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="td-title">Zep</div>
                      <div className="td-sub">Temporal Graph</div>
                    </td>
                    <td><span className="badge badge-out"><XCircle size={14}/> Out</span></td>
                    <td>—</td>
                    <td>—</td>
                    <td><span className="text-danger">Community Edition Deprecated 2026.</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="customer-guide">
              <h4>Customer Implementation Guide</h4>
              <ul className="guide-list">
                <li>
                  <div className="guide-goal">You want Auto-runbook + scratch memory (80% case)</div>
                  <div className="guide-action"><strong>Enable:</strong> Nothing — native RAG + memory-mcp are on by default.</div>
                </li>
                <li>
                  <div className="guide-goal">You want Cross-incident synthesis + per-entity continuity</div>
                  <div className="guide-action"><strong>Enable:</strong> <code>memory.honcho.enabled: true</code> + register the <code>honcho</code> server per-tenant. Requires external Honcho + a strong LLM model.</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="section-header">
            <div className="section-number">4</div>
            <h2>A Governed Consumer</h2>
          </div>
          <div className="glass-card story-card">
            <div className="card-top">
              <ShieldCheck className="card-icon" />
              <h3>Identical Governance</h3>
            </div>
            <p>
              Memory is not a special case. An external memory brain is a governed LLM consumer just like any other agent. 
              Its operations are metered by the tenant's <strong>LLM broker</strong>, subject to the same <strong>budgets</strong>, 
              and its token spend is strictly attributed via <strong>per-consumer keys</strong>. 
              Governance remains identical whether memory is attached or removed.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
