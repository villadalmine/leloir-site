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
