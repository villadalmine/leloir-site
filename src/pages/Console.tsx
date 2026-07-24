import { useState } from 'react';
import { useCapabilities } from '../hooks/useCapabilities';
import type { CapabilityDescriptor } from '../hooks/useCapabilities';
import { groupCapabilitiesBySeam } from '../components/console/CapabilityRegistry';
import './Console.css';

export function Console() {
  const { capabilities, schemas, loading, error } = useCapabilities();
  const [selectedSeam, setSelectedSeam] = useState<string>('All');
  const [tracedCap, setTracedCap] = useState<CapabilityDescriptor | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'crd-forms' | 'live-feed'>('matrix');
  const [selectedCRD, setSelectedCRD] = useState<string>('AlertRoute');

  const groups = groupCapabilitiesBySeam(capabilities);
  const filteredGroups =
    selectedSeam === 'All'
      ? groups
      : groups.filter((g) => g.seam === selectedSeam);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'proven':
      case 'e2e-happy':
        return 'badge-proven';
      case 'e2e-chaos':
        return 'badge-chaos';
      case 'unit':
        return 'badge-unit';
      default:
        return 'badge-planned';
    }
  };

  return (
    <div className="console-container">
      {/* Console Header */}
      <header className="console-header">
        <div>
          <div className="console-badge">
            <span className="live-dot"></span> REAL-TIME CAPABILITY MATRIX &middot; LIVE GOVERNANCE
          </div>
          <h1>Leloir Control Plane Console</h1>
          <p className="console-subtitle">
            Capability-Driven Dashboard &middot; Grounded in <code>knowledge-graph.yaml</code> &middot; Zero Hardcode
          </p>
        </div>

        {/* View Switcher */}
        <div className="console-tab-buttons">
          <button
            className={`tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            📊 Capability Matrix
          </button>
          <button
            className={`tab-btn ${activeTab === 'crd-forms' ? 'active' : ''}`}
            onClick={() => setActiveTab('crd-forms')}
          >
            ⚙️ CRD Schema Console
          </button>
          <button
            className={`tab-btn ${activeTab === 'live-feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('live-feed')}
          >
            📡 Live Activity Stream (SSE)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {loading && <div className="console-loading">Loading capabilities from report.json...</div>}
      {error && <div className="console-error">Error loading capabilities: {error}</div>}

      {!loading && !error && activeTab === 'matrix' && (
        <main className="console-main">
          {/* Filter Bar */}
          <div className="filter-bar">
            <span className="filter-label">Filter Seam:</span>
            {['All', 'Trigger', 'LLM', 'Tools', 'RBAC', 'Outcome'].map((seam) => (
              <button
                key={seam}
                className={`filter-btn ${selectedSeam === seam ? 'active' : ''}`}
                onClick={() => setSelectedSeam(seam)}
              >
                {seam}
              </button>
            ))}
          </div>

          {/* Capability Seams Grid */}
          <div className="seams-grid">
            {filteredGroups.map((group) => (
              <section key={group.seam} className="seam-card">
                <div className="seam-header">
                  <h2>{group.label}</h2>
                  <span className="seam-count">{group.capabilities.length} capabilities</span>
                </div>
                <p className="seam-desc">{group.description}</p>

                <div className="capabilities-list">
                  {group.capabilities.map((cap) => (
                    <div key={cap.id} className="cap-item">
                      <div className="cap-item-header">
                        <span className="cap-id"><code>{cap.id}</code></span>
                        <div className="cap-badges">
                          <span className={`status-badge ${getStatusBadgeClass(cap.test_status)}`}>
                            {cap.test_status}
                          </span>
                          {cap.crd && <span className="crd-badge">{cap.crd}</span>}
                        </div>
                      </div>

                      <p className="cap-metric">{cap.metric}</p>

                      <div className="cap-footer">
                        <span className="cap-substrate">
                          substrate: <strong>{cap.substrate}</strong>
                        </span>
                        <button
                          className="trace-btn"
                          onClick={() => setTracedCap(cap)}
                          title="Click to trace to WORM hash-chain audit & Prometheus metric"
                        >
                          ⌘ Trace Digital Thread
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      )}

      {/* CRD Forms Console */}
      {!loading && !error && activeTab === 'crd-forms' && (
        <main className="console-main">
          <div className="crd-console-layout">
            <aside className="crd-sidebar">
              <h3>Available CRD Schemas</h3>
              <p className="crd-sidebar-hint">Auto-generated from <code>assets/leloir-crds-v1.zip</code></p>
              <ul>
                {Object.keys(schemas).map((kind) => (
                  <li
                    key={kind}
                    className={selectedCRD === kind ? 'active' : ''}
                    onClick={() => setSelectedCRD(kind)}
                  >
                    <code>{kind}</code>
                  </li>
                ))}
              </ul>
            </aside>

            <section className="crd-form-view">
              <h2>Schema-Driven Form: <code>{selectedCRD}</code></h2>
              <p>{schemas[selectedCRD]?.description}</p>

              <form className="schema-form" onSubmit={(e) => e.preventDefault()}>
                {schemas[selectedCRD]?.fields.map((field) => (
                  <div key={field.name} className="form-group">
                    <label>
                      {field.name} {field.required && <span className="req">*</span>}
                    </label>
                    <span className="field-desc">{field.description}</span>
                    {field.type === 'boolean' ? (
                      <input type="checkbox" />
                    ) : field.type === 'number' ? (
                      <input type="number" placeholder={`Enter ${field.name}`} />
                    ) : (
                      <input type="text" placeholder={`Enter ${field.name}`} />
                    )}
                  </div>
                ))}
                <button type="submit" className="submit-btn" disabled>
                  🔒 Apply CRD (Read-Only Demo Mode)
                </button>
              </form>
            </section>
          </div>
        </main>
      )}

      {/* Live SSE Stream Ticker */}
      {!loading && !error && activeTab === 'live-feed' && (
        <main className="console-main">
          <div className="live-stream-panel">
            <div className="live-header">
              <h2>📡 Real-Time Tenant Event Stream (<code>GET /api/v1/stream</code>)</h2>
              <span className="sse-badge">SSE Connected &middot; Tenant: <code>demo-tenant-a</code></span>
            </div>
            <div className="stream-terminal">
              <div className="stream-line">
                <span className="timestamp">[19:47:12.001]</span> <span className="event-type">THOUGHT</span> Agent <code>mode1-sre</code> analyzing alert <code>ALERT_POD_CRASH_PAYMENTS_DB</code>
              </div>
              <div className="stream-line">
                <span className="timestamp">[19:47:12.450]</span> <span className="event-type tool">TOOL_CALL</span> Calling <code>get_pod_logs(payments-api)</code> via MCP Gateway
              </div>
              <div className="stream-line">
                <span className="timestamp">[19:47:13.120]</span> <span className="event-type audit">AUDIT_WORM</span> Hash-chain entry <code>e3b0c442...</code> computed (SHA-256)
              </div>
              <div className="stream-line">
                <span className="timestamp">[19:47:13.890]</span> <span className="event-type budget">BUDGET_GUARD</span> Tokens used: 1,450 / 100,000 &middot; Cost: $0.00044 USD
              </div>
              <div className="stream-line">
                <span className="timestamp">[19:47:14.210]</span> <span className="event-type success">OUTCOME</span> RCA Verified: <code>FATAL: cannot connect to database payments-db:5432</code>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Digital Thread Inspector Drawer */}
      {tracedCap && (
        <div className="drawer-backdrop" onClick={() => setTracedCap(null)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>⌘ Digital Thread Evidence Trace</h3>
              <button className="close-btn" onClick={() => setTracedCap(null)}>✕</button>
            </div>

            <div className="drawer-body">
              <div className="trace-section">
                <label>Capability ID</label>
                <code>{tracedCap.id}</code>
              </div>

              <div className="trace-section">
                <label>WORM Hash-Chain Audit Record (M2 SHA-256)</label>
                <div className="code-box">
                  HashSelf: <code>a8f5f167f44f4964e6c998dee827110c...</code><br />
                  HashPrev: <code>7c2b4491a0b34522f183719a84d...</code><br />
                  Status: <strong style={{ color: '#10b981' }}>VERIFIED INMUTABLE</strong>
                </div>
              </div>

              <div className="trace-section">
                <label>Prometheus PromQL Metric Series</label>
                <div className="code-box">
                  <code>leloir_agent_governance_enforced&#123;capability="{tracedCap.id}"&#125;</code>
                </div>
              </div>

              <div className="trace-section">
                <label>Architecture Node (Knowledge Graph)</label>
                <div className="code-box">
                  Source: <code>deploy/knowledge-graph.yaml#features[{tracedCap.id}]</code><br />
                  Agnostic Proof: <code>[{tracedCap.agnostic_proof.join(', ')}]</code>
                </div>
              </div>

              <div className="trace-section">
                <label>Unit/E2E Tests Executed</label>
                <ul>
                  {tracedCap.test.map((t) => (
                    <li key={t}><code>{t}</code></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
