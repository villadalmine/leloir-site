import { useSiteData, t } from '../hooks/useSiteData';
import { Terminal, CheckCircle2, Clock, Code2 } from 'lucide-react';

export function CRDs() {
  const { data, loading } = useSiteData<any>('crdguide.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="crdguide" className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '800px', marginInline: 'auto' }}>
        <h1>{t(data.title)}</h1>
        <p className="lead">{t(data.sub)}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {data.crds.map((crd: any, idx: number) => (
          <div key={idx} className="glass-card" style={{ padding: 0 }}>
            <div className="crd-head" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Terminal style={{ color: 'var(--accent)' }} size={20} />
                <h3>{crd.kind}</h3>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className={`badge ${crd.proof === 'tested' || crd.proof === 'designed' ? 'badge-oss' : 'badge-team'}`}>
                  {crd.proof === 'tested' ? <CheckCircle2 size={12} style={{marginRight:4}}/> : <Clock size={12} style={{marginRight:4}}/>}
                  Status: {crd.proof === 'tested' ? 'Stable' : 'Planned'}
                </span>
                <span className={`badge badge-mc`} title="The Kubernetes controller or engine that reconciles this CRD">
                  <Code2 size={12} style={{marginRight:4}}/>
                  Controller: {crd.reconciled}
                </span>
              </div>
            </div>

            <div className="crd-body" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              <div className="crd-text">
                <div style={{ marginBottom: '32px' }}>
                  <h4>Purpose</h4>
                  <p>{t(crd.purpose)}</p>
                </div>
                <div>
                  <h4>Usage</h4>
                  <p>{t(crd.usage)}</p>
                </div>
              </div>
              <div className="crd-code">
                <div className="code-block-wrapper">
                  <pre style={{ margin: 0 }}><code>{crd.yaml}</code></pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
