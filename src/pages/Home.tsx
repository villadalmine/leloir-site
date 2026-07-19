import { useSiteData, t } from '../hooks/useSiteData';
import { CheckCircle2, Clock, Unlock, Briefcase } from 'lucide-react';

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
        <span className="pill">Context-Aware Governance</span>
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
                <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--fg)', paddingRight: '8px' }}>{t(feat.title)}</h3>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {feat.tier === 'oss' ? (
                    <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid #3b82f6' }} title="Open Source Core"><Unlock size={12} style={{ marginRight: '4px' }} /> OSS</span>
                  ) : (
                    <span className="badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid #a855f7' }} title="Commercial Tier"><Briefcase size={12} style={{ marginRight: '4px' }} /> Pro</span>
                  )}
                  {feat.status === 'proven' ? (
                    <span className="badge" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)', border: '1px solid var(--ok)' }}><CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Proven</span>
                  ) : (
                    <span className="badge" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', border: '1px solid #9ca3af' }}><Clock size={12} style={{ marginRight: '4px' }} /> Planned</span>
                  )}
                </div>
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
          <a href="https://en.wikipedia.org/wiki/Luis_Federico_Leloir" target="_blank" rel="noreferrer" style={{ color: 'var(--fg)', fontWeight: 600 }}>Luis Federico Leloir</a> was an Argentine physician and biochemist who received the 1970 Nobel Prize in Chemistry.
          <br/><br/>
          Before his work, science knew that living organisms consumed sugars (glucose) for energy, but nobody understood the exact mechanism the body used to transform, store, and regulate that energy. Leloir isolated a key molecule called <strong>UDP-glucose</strong>, discovering that it acts as the fundamental "transport and control mechanism" that allows cells to build energy reserves (glycogen). Without this regulatory mechanism, cellular life would collapse because it wouldn't know how to manage its own fuel.
          <br/><br/>
          <strong>The Analogy:</strong> Just as Leloir uncovered the <em>regulatory mechanisms of cellular biology</em>, this project provides the fundamental <strong>regulatory mechanisms and governance</strong> for autonomous AI agents. The Leloir Control Plane manages, regulates, and secures the "fuel" (access, permissions, budgets) of agents so that the cluster functions in a safe and orderly manner.
          <br/><br/>
          <a href="https://www.nobelprize.org/prizes/chemistry/1970/leloir/lecture/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '14px', padding: '8px 16px', marginTop: '12px' }}>
            Read his 1970 Nobel Lecture →
          </a>
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
