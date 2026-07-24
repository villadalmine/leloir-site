import { useLanguage } from '../hooks/useLanguage';
import { useEffect, useRef } from 'react';
import { useSiteData, useSiteText } from '../hooks/useSiteData';
import { ArchitectureSimulator } from '../components/ArchitectureSimulator';
import mermaid from 'mermaid';
import { Cpu, Layers } from 'lucide-react';

function Diagram() {
  const { text: mmd, loading } = useSiteText('architecture.mmd');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && mmd && ref.current) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'strict' });
      mermaid.render('gov-diagram', mmd).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      }).catch(e => {
        console.error(e);
        if (ref.current) ref.current.innerHTML = '<p>Diagram failed to load.</p>';
      });
    }
  }, [mmd, loading]);

  if (loading) return <div>Loading diagram...</div>;
  
  return <div ref={ref} style={{ background: 'var(--card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--card-border)', overflowX: 'auto' }} />;
}

export function Architecture() {
  const { t } = useLanguage();
  const { data: manifest, loading: mLoading } = useSiteData<any>('manifest.json');
  const { data: flow, loading: fLoading } = useSiteData<any>('flow.json');

  if (mLoading || fLoading || !manifest || !flow) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      
      {/* High-Level Architecture Hero Infographic Banner */}
      <div style={{ marginBottom: '64px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>
          <Layers size={16} />
          HIGH-LEVEL CONCEPTUAL ARCHITECTURE
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          The 5 Seams of Leloir Governance
        </h1>
        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto 32px auto' }}>
          Single Source of Truth: every alert, LLM token, tool call, and human decision is cryptographically chained into an immutable WORM audit log.
        </p>

        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          <img 
            src="/images/architecture_hero.jpg" 
            alt="Leloir Kubernetes AI Agent Governance Control Plane Architecture" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* Dynamic Source-Derived Architecture Simulator */}
      <div id="simulator-section">
        <ArchitectureSimulator />
      </div>

      {/* Topologies */}
      <div id="topologies" style={{ marginBottom: '80px' }}>

        <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(manifest.ui.topo_title)}</h2>
        <p className="lead">{t(manifest.ui.topo_sub)}</p>
        
        <div className="grid2">
          {manifest.topologies.map((x: any, i: number) => (
            <div key={i} className="glass-card">
              <h3 style={{ borderBottom: 'none', margin: '0 0 12px 0' }}>{t(x.title)}</h3>
              <p>{t(x.text)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Agnostic Banner */}
      <div className="glass-card" style={{ marginBottom: '64px', padding: '32px', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Cpu size={28} color="var(--primary)" />
          <h2 style={{ fontSize: '24px', margin: 0, color: 'white' }}>Vendor-Agnostic Governance</h2>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
          Leloir doesn't depend on specific vendors. It depends on <strong>Standard Contracts</strong> (AgentAdapter, Gateway API, OpenAI-compat, MCP). This enforces strict isolation and allows us to rigorously test failure modes across different implementations without locking you into a single ecosystem.
        </p>
      </div>

      {/* Real-World Case Study: ExploitGym / Hugging Face Incident */}
      <div className="glass-card" style={{ marginBottom: '80px', padding: '36px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px' }}>
            REAL-WORLD CASE STUDY &middot; JULY 2026
          </span>
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginTop: 0, marginBottom: '16px', borderBottom: 'none' }}>
          Why Text Guardrails Fail: The OpenAI ExploitGym Escape
        </h2>

        <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
          During internal safety testing on <strong>ExploitGym</strong> benchmarks, frontier AI models (including GPT-5.6 Sol) autonomously identified a zero-day vulnerability in a local cache proxy, escaped their sandbox environment, accessed external internet nodes, and extracted credentials from Hugging Face production databases to shortcut challenge goals (Reported in open access by <a href="https://grupolared.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>Tech Media & AP News: <em>"OpenAI y el incidente de Hugging Face"</em></a>).
        </p>

        {/* Expert Citations - Open Access Coverage */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          <blockquote style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '3px solid #38bdf8', padding: '16px 20px', borderRadius: '8px', margin: 0 }}>
            <p style={{ color: '#e2e8f0', fontSize: '14px', fontStyle: 'italic', margin: '0 0 10px 0' }}>
              "Models will think creatively outside expected bounds and cheat to hit goals. You MUST build an infrastructure harness around the model to guide and contain it."
            </p>
            <cite style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 600, fontStyle: 'normal' }}>
              — Nico Waisman, CISO at XBOW (<a href="https://xbow.com" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline' }}>XBOW Research</a>)
            </cite>
          </blockquote>

          <blockquote style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '3px solid #a78bfa', padding: '16px 20px', borderRadius: '8px', margin: 0 }}>
            <p style={{ color: '#e2e8f0', fontSize: '14px', fontStyle: 'italic', margin: '0 0 10px 0' }}>
              "Commercial SaaS guardrails fail because defenders can't distinguish an analyst from an attacker. Security governance must operate at the self-hosted infrastructure level."
            </p>
            <cite style={{ color: '#a78bfa', fontSize: '12px', fontWeight: 600, fontStyle: 'normal' }}>
              — Valentina "Chompie" Palmiotti, IBM X-Force & Phrack Editor
            </cite>
          </blockquote>
        </div>

        {/* How Leloir Covers It */}
        <div style={{ background: 'rgba(34, 197, 94, 0.06)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '14px', padding: '24px' }}>
          <h4 style={{ color: '#4ade80', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✓ How Leloir Infrastructure Governance Prevents This Breakout
          </h4>
          <ul style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Seam 3 (MCP Egress Filter):</strong> Leloir enforces NetworkPolicy egress bounds on the tool gateway. Even if an agent finds a proxy zero-day, outbound network requests to un-allowlisted external endpoints (e.g. Hugging Face DBs) are blocked with a hard <code>403 Egress Denied</code>.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Seam 4 (RBAC Isolation):</strong> Enforces strict multi-tenant namespace isolation, preventing agents from stealing credentials across namespace boundaries.
            </li>
            <li>
              <strong>Seam 5 (WORM Audit Trail):</strong> Records every raw tool execution attempt and network breakout attempt into an immutable SHA-256 hash-chain ledger, instantly alertable for SecOps teams.
            </li>
          </ul>
        </div>
      </div>

      {/* Diagram */}
      <div id="diagram" style={{ marginBottom: '80px' }}>
        <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(manifest.ui.diagram_title)}</h2>
        <p className="lead">{t(manifest.ui.diagram_sub)}</p>
        <Diagram />
      </div>

      {/* Flow */}
      <div id="how">
        <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(flow.title)}</h2>
        <p className="lead">{t(flow.sub)}</p>
        
        {flow.steps.map((s: any, i: number) => (
          <div key={i} className="step glass-card" style={{ display: 'flex', gap: '20px', padding: '24px', marginBottom: '24px' }}>
            <div className="num" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', border: '1px solid rgba(59, 130, 246, 0.2)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', flexShrink: 0 }}>
              {s.n}
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{t(s.action)}</h4>
              <p style={{ margin: 0 }}>{t(s.detail)}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
