import { useSiteData, t } from '../hooks/useSiteData';
import { Bot, Wrench, Terminal, Shield, ShieldAlert, CheckCircle2, Workflow } from 'lucide-react';

export function Install() {
  const { data: deployData, loading: deployLoading } = useSiteData<any>('deploy.json');
  const { data: reportData, loading: reportLoading } = useSiteData<any>('report.json');

  if (deployLoading || reportLoading || !deployData || !reportData) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="install" className="container" style={{ padding: '80px 24px' }}>
      <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(deployData.title)}</h2>
      <p className="lead">{t(deployData.sub)}</p>
      
      <div style={{ marginBottom: '32px' }}>
        <a href="https://github.com/villadalmine/leloir-helm" target="_blank" rel="noreferrer" className="badge" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)', border: '1px solid var(--ok)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          📦 View Leloir Helm Chart on GitHub
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginBottom: '64px' }}>
        {deployData.roles.map((r: any, i: number) => (
          <div key={i}>
            <h3>{t(r.who)}</h3>
            <p>{t(r.does)}</p>
            <pre><code>{r.cmd}</code></pre>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Architecture & Integration Map</h2>
          <p className="lead">Live measured telemetry showing how agents and tools integrate with the Leloir CP.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <Bot size={24} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '20px' }}>Actors (Agents)</h3>
            </div>
            
            <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px', lineHeight: '1.6', backgroundColor: 'rgba(59, 130, 246, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--info)' }}>
              <strong>Governance & Demo Modes</strong><br />
              <div style={{ marginTop: '8px', marginBottom: '12px' }}>
                The agents below are running live in our demo cluster across three different architectural modes to prove agnostic governance:
                <ul style={{ marginTop: '4px', marginBottom: '0', paddingLeft: '20px' }}>
                  <li><strong>Mode 1 (SDK-Native):</strong> Agents built specifically for Leloir (e.g. <code>leloir-agent</code>) with first-class governance.</li>
                  <li><strong>Mode 2 (Contained Black-box):</strong> External agents (e.g. <code>holmesgpt</code>) securely contained and governed via the AgentAdapter. Their native operator/CRDs (e.g. <code>HealthChecks</code>) are intentionally bypassed; Leloir triggers them directly via their API (e.g. <code>/api/chat</code>) to enforce secure pathways.</li>
                  <li><strong>Mode 3 (Native Guardrails):</strong> Agents governed with strict LLM guardrails (like PII masking via Presidio) and budget limits.</li>
                </ul>
              </div>
              <div>
                <strong>Governed vs Ungoverned:</strong> When an agent connects <em>through</em> the Control Plane, it is <strong style={{ color: 'var(--ok)' }}>Governed</strong> (costuras protegidas). An <strong style={{ color: '#ef4444' }}>Ungoverned</strong> agent (e.g. <code>holmesgpt-raw</code>) is the exact same agent running natively against the cluster without Leloir's protection. We track it honestly ("off-radar") but do not fake its governance.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reportData.actors?.map((actor: any, i: number) => (
                <div key={i} style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '16px' }}>{actor.id}</strong>
                    {actor.governed === true && <span className="badge" style={{ backgroundColor: 'rgba(52,211,153,0.1)', color: 'var(--ok)', padding: '2px 8px', fontSize: '11px' }}><Shield size={10} style={{marginRight:'4px'}}/> Governed</span>}
                    {actor.governed === false && <span className="badge" style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '2px 8px', fontSize: '11px' }}><ShieldAlert size={10} style={{marginRight:'4px'}}/> Ungoverned</span>}
                    {actor.governed === 'planned' && <span className="badge" style={{ backgroundColor: 'rgba(156,163,175,0.1)', color: '#9ca3af', padding: '2px 8px', fontSize: '11px' }}>Planned</span>}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '12px' }}>
                    <span><Workflow size={12} style={{marginRight:'4px', verticalAlign:'text-bottom'}}/> via: <code>{actor.via}</code></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <Wrench size={24} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '20px' }}>Tools (MCP Servers)</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px' }}>Tools are called <em>by</em> the Gateway on behalf of actors. They are a separate layer from agents.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reportData.tools?.map((tool: any, i: number) => (
                <div key={i} style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ fontSize: '16px' }}>{tool.id}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    Kind: <code>{tool.kind}</code> • Transport: <code>{tool.transport}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '32px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Terminal size={28} color="var(--primary)" />
            <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Leloir CLI</h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            The <code>leloir-cli</code> is a pure HTTP client for the <code>/api/v1/*</code> Gateway API. It contains zero business logic and serves as the ultimate End-to-End conformance test suite.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reportData.clients?.map((client: any, i: number) => (
              <div key={i} style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <strong style={{ fontSize: '18px' }}>{client.id}</strong>
                  {client.status === 'e2e-happy' && <span className="badge" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)' }}><CheckCircle2 size={12} style={{marginRight:'4px'}}/> E2E Verified</span>}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                  <strong>Auth:</strong> <code>{client.auth}</code> &nbsp;|&nbsp; <strong>Target:</strong> <code>{client.reads}</code>
                </div>
                <div>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--muted)', marginBottom: '8px' }}>Verified Commands</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {client.commands?.map((cmd: string, j: number) => (
                      <code key={j} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>{cmd}</code>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
