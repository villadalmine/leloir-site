import { useSiteData, t } from '../hooks/useSiteData';

export function Home() {
  const { data: manifest, loading: manifestLoading, error: manifestError } = useSiteData<any>('manifest.json');
  const { data: featuresData, loading: featuresLoading, error: featuresError } = useSiteData<any>('features.json');

  if (manifestError || featuresError) {
    return <div className="container" style={{ padding: '100px 24px', textAlign: 'center', color: 'red' }}>
      <h2>Error Loading Data</h2>
      <p>{manifestError || featuresError}</p>
    </div>;
  }

  if (manifestLoading || featuresLoading || !manifest || !featuresData) {
    return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div id="introduction" className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      
      {/* Hero Section */}
      <h1>{manifest.project.name} Governance</h1>
      <p className="lead" style={{ maxWidth: '700px', margin: '0 auto 24px' }}>
        {t(manifest.project.tagline)}
      </p>
      
      <div className="badges" style={{ justifyContent: 'center', marginBottom: '32px' }}>
        <span className="pill">Zero-Trust Architecture</span>
        <span className="pill">Kubernetes Native</span>
        <span className="pill">No Vendor Lock-in</span>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <a href={manifest.project.repo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 32px' }}>
          {t(manifest.ui.cta_repo)}
        </a>
      </div>

      {/* Differentiators Section (Mapped dynamically from manifest.json) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left', maxWidth: '1200px', margin: '0 auto 80px' }}>
        {manifest.differentiators.map((diff: any, idx: number) => (
          <div key={idx} className="glass-card" style={{ padding: '32px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px' }}>
              <span style={{ fontSize: '24px' }}>{diff.icon}</span> 
              {t(diff.title)}
            </h3>
            <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.7, fontSize: '15px' }}>
              {t(diff.text)}
            </p>
          </div>
        ))}
      </div>

      {/* Features Grid (Mapped dynamically from features.json) */}
      <div style={{ textAlign: 'left', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', color: 'var(--fg)', marginBottom: '16px', textAlign: 'center', borderBottom: 'none' }}>
          {t(featuresData.title)}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '18px', textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
          {t(featuresData.sub)}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {featuresData.features.map((feat: any) => (
            <div key={feat.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--fg)' }}>{t(feat.title)}</h3>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, flexGrow: 1 }}>
                {t(feat.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Leloir / Analogy Section */}
      <div className="glass-card" style={{ textAlign: 'left', maxWidth: '800px', margin: '80px auto 0', padding: '40px' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--fg)', marginTop: 0, marginBottom: '20px', borderBottom: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>🧬</span> Why the name "Leloir"?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
          <strong>Luis Federico Leloir</strong> was an Argentine physician and biochemist who received the 1970 Nobel Prize in Chemistry for his discovery of the metabolic pathways in carbohydrates. 
          <br/><br/>
          Just as Leloir uncovered the fundamental <em>regulatory mechanisms of cellular biology</em>, this project aims to provide the fundamental <strong>regulatory mechanisms and governance</strong> for autonomous AI agents in production environments.
        </p>
      </div>

      {/* Footer Note */}
      <div style={{ marginTop: '80px', paddingTop: '64px', borderTop: '1px solid var(--line)', textAlign: 'center', maxWidth: '800px', margin: '80px auto 40px' }}>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          {t(manifest.project.pitch)}
        </p>
      </div>

    </div>
  );
}
