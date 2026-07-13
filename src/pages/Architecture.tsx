import { useEffect, useRef } from 'react';
import { useSiteData, useSiteText, t } from '../hooks/useSiteData';
import mermaid from 'mermaid';

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
  const { data: manifest, loading: mLoading } = useSiteData<any>('manifest.json');
  const { data: flow, loading: fLoading } = useSiteData<any>('flow.json');

  if (mLoading || fLoading || !manifest || !flow) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      
      {/* Topologies */}
      <div id="topologies" style={{ marginBottom: '80px' }}>
        <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(manifest.ui.topo_title)}</h2>
        <p className="lead">{t(manifest.ui.topo_sub)}</p>
        
        <div className="grid2">
          {manifest.topologies.map((x: any, i: number) => (
            <div key={i} className="card">
              <h3>{t(x.title)}</h3>
              <p>{t(x.text)}</p>
            </div>
          ))}
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
          <div key={i} className="step">
            <div className="num">{s.n}</div>
            <div>
              <h4>{t(s.action)}</h4>
              <p>{t(s.detail)}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
