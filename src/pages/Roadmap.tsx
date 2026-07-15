import { useSiteData, t } from '../hooks/useSiteData';
import { CheckCircle2, CircleDashed, Clock, Flame, ShieldCheck } from 'lucide-react';

const CATEGORY_META: Record<string, { title: string, desc: string }> = {
  tenancy: {
    title: "Tenancy & Isolation",
    desc: "Strict multi-tenant isolation. Defines security boundaries, allowed namespaces, and cryptographic key control (Bring Your Own Key), ensuring one agent cannot access resources from another team."
  },
  governance: {
    title: "Governance & Guardrails",
    desc: "Rigorous control policies. Defines rules for human approval (HITL - Human in the Loop), LLM spending budgets, and admission validations (ValidatingAdmissionPolicies) to prevent destructive actions."
  },
  agents: {
    title: "Agents & Intelligence",
    desc: "Integration with multiple AI engines and frameworks (HolmesGPT, Claude Code, k8sgpt). Long-term memory management and autonomous investigation flow orchestration (Agent-to-Agent)."
  },
  connectors: {
    title: "Connectors & MCP",
    desc: "Adapters and gateways to interact with external systems. Includes secure integration via Model Context Protocol (MCP) with Git repositories, databases, and alerting systems."
  },
  operate: {
    title: "Operations & Telemetry",
    desc: "Total platform observability. Immutable audit logs, real-time traffic inspection (Tab Traffic), analytical dashboards, and operational metrics."
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'e2e-chaos':
      return <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444', boxShadow: '0 0 10px rgba(239, 68, 68, 0.2)' }}><Flame size={12} style={{ marginRight: '4px' }} /> Chaos Tested</span>;
    case 'e2e-happy':
    case 'proven':
      return <span className="badge" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)', border: '1px solid var(--ok)' }}><ShieldCheck size={12} style={{ marginRight: '4px' }} /> E2E Verified</span>;
    case 'unit':
      return <span className="badge" style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', color: 'var(--info)', border: '1px solid var(--info)' }}><CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Unit Tested</span>;
    case 'in-progress':
      return <span className="badge" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', color: 'var(--warn)', border: '1px solid var(--warn)' }}><CircleDashed size={12} style={{ marginRight: '4px' }} /> In Progress</span>;
    default:
      return <span className="badge" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', border: '1px solid #9ca3af' }}><Clock size={12} style={{ marginRight: '4px' }} /> Planned</span>;
  }
};

export function Roadmap() {
  const { data, loading } = useSiteData<any>('manifest.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  // Extract all unique categories from data.features
  const categories = Array.from(new Set(data.features.map((f: any) => f.category).filter(Boolean))) as string[];

  return (
    <div id="roadmap" className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>Platform Roadmap</h1>
        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '32px' }}>
          Explore the deep architecture of Leloir and the development status of every strategic component.
        </p>

        {/* Chaos-Tested Banner */}
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '32px', textAlign: 'left', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Flame size={28} color="#ef4444" />
            <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>The Chaos-Tested Standard</h2>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            We downgraded our entire roadmap to 0% "Completed" today. In Leloir, a feature is only considered done when it survives automated fault injection (<span style={{ color: '#ef4444', fontFamily: 'monospace' }}>e2e-chaos</span>) in a production-like environment. Honest engineering means nothing is trusted until it breaks and recovers.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {getStatusBadge('e2e-chaos')}
            {getStatusBadge('e2e-happy')}
            {getStatusBadge('unit')}
            {getStatusBadge('in-progress')}
            {getStatusBadge('planned')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        {categories.map(cat => {
          const meta = CATEGORY_META[cat] || { title: cat, desc: '' };
          const features = data.features.filter((f: any) => f.category === cat);
          
          if (features.length === 0) return null;

          return (
            <div key={cat} className="glass-card" style={{ padding: '32px' }}>
              <div style={{ marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                <h2 style={{ fontSize: '28px', margin: '0 0 16px', color: 'var(--primary)' }}>{meta.title}</h2>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '16px', lineHeight: '1.6' }}>{meta.desc}</p>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '16px 8px', color: 'var(--muted)', fontWeight: 500, width: '30%' }}>Feature</th>
                      <th style={{ padding: '16px 8px', color: 'var(--muted)', fontWeight: 500, width: '50%' }}>Description</th>
                      <th style={{ padding: '16px 8px', color: 'var(--muted)', fontWeight: 500, width: '20%' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((f: any, i: number) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px 8px', fontWeight: 500 }}>{t(f.title)}</td>
                        <td style={{ padding: '16px 8px', color: 'var(--muted)', fontSize: '14px' }}>{t(f.description)}</td>
                        <td style={{ padding: '16px 8px' }}>
                          {getStatusBadge(f.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
