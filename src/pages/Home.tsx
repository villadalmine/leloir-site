import { useSiteData, t } from '../hooks/useSiteData';

export function Home() {
  const { data, loading } = useSiteData<any>('manifest.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="introduction" className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <h1>Leloir Governance</h1>
      <p className="lead" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
        {t(data.project.description)}
      </p>

      <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '12px', border: '1px solid var(--line)', maxWidth: '800px', margin: '0 auto 48px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--fg)' }}>
          When an agent gets compromised via prompt injection, your credentials shouldn't be.
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '18px', margin: 0 }}>
          Letting your AI Agents handle raw credentials and API Keys is a security disaster waiting to happen. 
          Leloir is the Zero-Trust Control Plane designed to solve this for "Day 2" AI in production.
        </p>
      </div>
      
      <div className="badges" style={{ justifyContent: 'center', marginBottom: '64px' }}>
        <span className="pill">Zero-Trust Architecture</span>
        <span className="pill">Kubernetes Native</span>
        <span className="pill">No Vendor Lock-in</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>🛡️ Strict Zero-Trust</h3>
          <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>Anti-spoofing JWT validation and transparent credential injection via Envoy, hardened at the network layer with Cilium mTLS (SPIFFE). Agents <strong>never</strong> touch a secret.</p>
        </div>
        <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>💸 Proactive FinOps</h3>
          <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>Leloir monitors spend velocity in real-time. If an LLM enters an infinite loop and skyrockets your OpenAI bill, Leloir imposes a <strong>Financial Quarantine</strong> and isolates the tenant.</p>
        </div>
        <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--line)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>🧠 Episodic Memory</h3>
          <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>When resolving an alert, Leloir stores the incident in pgvector. When a similar alert occurs, the orchestrator injects the past resolution into the agent as an ephemeral Skill.</p>
        </div>
      </div>

      <div style={{ marginTop: '80px', paddingTop: '64px', borderTop: '1px solid var(--line)', textAlign: 'left', maxWidth: '800px', margin: '80px auto 0' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--fg)', marginBottom: '16px' }}>What's in a name?</h2>
        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
          <strong>Luis Federico Leloir</strong> was an Argentine physician and biochemist who received the 1970 Nobel Prize in Chemistry for his discovery of the metabolic pathways in carbohydrates. Just as Leloir uncovered the fundamental regulatory mechanisms of cellular biology, this project aims to provide the fundamental regulatory mechanisms and governance for AI agents in production environments.
        </p>
      </div>
    </div>
  );
}
