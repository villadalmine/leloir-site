import { useSiteData, t } from '../hooks/useSiteData';
import { CheckCircle2, CircleDashed, Clock, Flame, ShieldCheck, Server, Globe, Box, Info, Check } from 'lucide-react';

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
    case 'not-tested':
      return <span className="badge" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', border: '1px solid #9ca3af' }}><Clock size={12} style={{ marginRight: '4px' }} /> Not Tested</span>;
    default:
      return <span className="badge" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', border: '1px solid #9ca3af' }}><Clock size={12} style={{ marginRight: '4px' }} /> Planned</span>;
  }
};

const getSubstrateBadge = (substrate: string) => {
  if (!substrate) return null;
  switch (substrate) {
    case 'any':
      return <span className="badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid #a855f7', fontSize: '11px', padding: '2px 6px' }}><Globe size={10} style={{ marginRight: '4px' }} /> Any Substrate</span>;
    case 'standalone-cluster':
      return <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid #3b82f6', fontSize: '11px', padding: '2px 6px' }}><Server size={10} style={{ marginRight: '4px' }} /> Standalone Cluster</span>;
    case 'external':
      return <span className="badge" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899', border: '1px solid #ec4899', fontSize: '11px', padding: '2px 6px' }}><Box size={10} style={{ marginRight: '4px' }} /> External Env</span>;
    default:
      return null;
  }
};

export function Roadmap() {
  const { data: manifestData, loading: manifestLoading } = useSiteData<any>('manifest.json');
  const { data: reportData, loading: reportLoading } = useSiteData<any>('report.json');

  if (manifestLoading || reportLoading || !manifestData || !reportData) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  const categories = Array.from(new Set(manifestData.features.map((f: any) => f.category).filter(Boolean))) as string[];

  const chaosStats = reportData?.chaos?.experiments?.reduce((acc: any, exp: any) => {
    acc[exp.result] = (acc[exp.result] || 0) + 1;
    return acc;
  }, { PASS: 0, FAIL: 0, SKIP: 0 }) || { PASS: 0, FAIL: 0, SKIP: 0 };

  const agentConformance = reportData?.conformance?.filter((c: any) => c.is_agent) || [];
  const agnosticProvenCount = reportData?.agnostic_proven?.length || 0;
  const SEAMS = ["Trigger", "Tools", "LLM", "RBAC", "Outcome"];

  return (
    <div id="roadmap" className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>Platform Roadmap</h1>
        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '16px' }}>
          Explore the deep architecture of Leloir and the development status of every strategic component.
        </p>

        {reportData?.context && (
          <div style={{ marginBottom: '32px' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', color: 'var(--info)', border: '1px solid var(--info)' }}>
              <Info size={12} style={{ marginRight: '4px' }} />
              Medido en contexto: {reportData.context.mode} 
              {reportData.context.cli_measured && ' (CLI)'}
              {reportData.context.chaos_included && ' + Chaos'}
            </span>
          </div>
        )}

        {/* Chaos-Tested Banner */}
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '32px', textAlign: 'left', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Flame size={28} color="#ef4444" />
              <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>The Chaos-Tested Standard</h2>
            </div>
            {reportData?.chaos && (
              <div style={{ display: 'flex', gap: '8px', fontSize: '14px', fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.2)', padding: '4px 12px', borderRadius: '4px' }}>
                <span style={{ color: 'var(--ok)' }}>{chaosStats.PASS} PASS</span> / 
                <span style={{ color: '#9ca3af' }}>{chaosStats.SKIP} SKIP</span> / 
                <span style={{ color: '#ef4444' }}>{chaosStats.FAIL} FAIL</span>
              </div>
            )}
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

        {/* Agnostic Conformance Matrix */}
        {agentConformance.length > 0 && (
          <div className="glass-card" style={{ maxWidth: '900px', margin: '32px auto 0', padding: '32px', textAlign: 'left', borderLeft: '4px solid #a855f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldCheck size={28} color="#a855f7" />
              <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Agnostic Governance</h2>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              Our Control Plane strictly prevents vendor lock-in. We have proven <strong style={{color: 'white'}}>{agnosticProvenCount} features</strong> consistently across multiple different agent architectures using the same governance rules.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--muted)', fontWeight: 500 }}>Agent Engine</th>
                    {SEAMS.map((seam: string) => <th key={seam} style={{ padding: '12px', color: 'var(--muted)', fontWeight: 500 }}>{seam}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {agentConformance.map((agent: any) => (
                    <tr key={agent.provider} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px', textAlign: 'left', fontWeight: 500 }}>{agent.provider}</td>
                      {SEAMS.map((seam: string) => {
                        const isCovered = agent.seams_covered?.includes(seam);
                        return (
                          <td key={seam} style={{ padding: '12px' }}>
                            {isCovered ? <Check size={16} color="var(--ok)" style={{ margin: '0 auto' }} /> : <span style={{ color: '#4b5563' }}>-</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '16px', lineHeight: '1.5' }}>
              <em>Note:</em> The <strong>LLM</strong> governance seam is empty in this table because agents <em>consume</em> LLMs, they do not provide them. The LLM seam is actively governed by infrastructure providers (e.g. <code>envoy-ai-gw</code>, <code>litellm-operator</code>) sitting between the agent and the API.
            </p>
          </div>
        )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        {categories.map(cat => {
          const meta = CATEGORY_META[cat] || { title: cat, desc: '' };
          const features = manifestData.features.filter((f: any) => f.category === cat);
          
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
                    {features.map((f: any, i: number) => {
                      const reportFeature = reportData.features?.find((rf: any) => rf.id === f.id);
                      const finalStatus = reportFeature ? reportFeature.test_status : f.status;
                      return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px 8px', fontWeight: 500 }}>{t(f.title)}</td>
                        <td style={{ padding: '16px 8px', color: 'var(--muted)', fontSize: '14px' }}>{t(f.description)}</td>
                        <td style={{ padding: '16px 8px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                            {getStatusBadge(finalStatus)}
                            {reportFeature?.substrate && getSubstrateBadge(reportFeature.substrate)}
                          </div>
                        </td>
                      </tr>
                      );
                    })}
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
