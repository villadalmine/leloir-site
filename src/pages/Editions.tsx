import { useSiteData } from '../hooks/useSiteData';
import { useLanguage } from '../hooks/useLanguage';
import { Check, Minus } from 'lucide-react';

export function Editions() {
  const { t } = useLanguage();
  const { data, loading } = useSiteData<any>('features.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  const tiers = [
    { id: 'OSS', name: 'Leloir Control Plane', price: '$0', license: 'Apache 2.0 (100% Free)', class: 'badge-oss', cta: 'Coming Soon', link: '#' },
    { id: 'Dashboard', name: 'Official Dashboard', price: 'Commercial', license: 'Proprietary UI', class: 'badge-team', cta: 'Contact Sales', link: 'mailto:rino@villadalmine.club?subject=Leloir%20Dashboard' }
  ];

  return (
    <div id="features" className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>{t(data.title)}</h1>
        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>{t(data.sub)}</p>

        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '32px', textAlign: 'left', display: 'flex', gap: '24px', alignItems: 'flex-start', background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.1), rgba(15, 23, 42, 0.8))', border: '1px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)' }}>
          <div style={{ fontSize: '40px' }}>🔓</div>
          <div>
            <h3 style={{ margin: '0 0 12px', fontSize: '22px', color: 'var(--fg)' }}>The Leloir Control Plane is 100% Free</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7 }}>
              The core control plane, proxy gateway, and fundamental orchestration features are <strong>100% Free and Open Source</strong> (Apache 2.0). They will remain free forever.
              <br/><br/>
              We monetize exclusively through our <strong>Official Leloir Dashboard</strong>—a premium, separate UI that connects to your free control plane to provide fleet view, FinOps, compliance exports, and CISO controls.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflowX: 'auto', marginBottom: '64px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '32px', fontWeight: 600, fontSize: '18px', width: '50%' }}>Feature Mapping</th>
              {tiers.map(tier => (
                <th key={tier.id} style={{ padding: '32px 24px', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span className={`badge ${tier.class}`} style={{ fontSize: '13px', padding: '6px 16px' }}>
                      {tier.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '800', margin: '16px 0 8px', color: 'var(--fg)' }}>
                    {tier.price}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 'normal', marginBottom: '24px' }}>
                    {tier.license}
                  </div>
                  <a href={tier.link} className={tier.cta === 'Contact Sales' ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding: '12px 16px', fontSize: '15px', width: '100%', display: 'block', textAlign: 'center', boxSizing: 'border-box' }}>
                    {tier.cta}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.features.map((f: any, i: number) => {
              // Determine if a tier has this feature
              const hasFeature = (t: string) => {
                if (f.tier === 'OSS') return true; // Everything OSS is in both Engine and Dashboard
                if (t === 'Dashboard' && (f.tier === 'Team' || f.tier === 'Mission Critical')) return true;
                return false;
              };

              return (
                <tr key={i} style={{ borderBottom: i === data.features.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <td style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 0 8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px' }}>{t(f.title)}</h4>
                      {f.status === 'proven' && (
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                          Proven
                        </span>
                      )}
                      {(f.status === 'planned' || f.roadmap) && (
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                          Planned
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {t(f.desc)}
                    </p>
                  </td>
                  {tiers.map(tier => (
                    <td key={tier.id} style={{ padding: '24px', textAlign: 'center' }}>
                      {hasFeature(tier.id) ? (
                        <Check size={24} style={{ color: 'var(--ok)', margin: '0 auto' }} />
                      ) : (
                        <Minus size={24} style={{ color: 'var(--line)', margin: '0 auto' }} />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="glass-card" style={{ padding: '32px', textAlign: 'center', marginBottom: '64px', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <h3 style={{ fontSize: '24px', margin: '0 0 16px' }}>Looking for full technical details?</h3>
        <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: '16px' }}>
          Discover the deep architecture, development status, and what we are building in our public Roadmap.
        </p>
        <a href="#/roadmap" className="btn btn-outline" style={{ display: 'inline-block', padding: '12px 24px' }}>
          View Engineering Roadmap →
        </a>
      </div>

      <div className="glass-card" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '48px' }}>
        <h2 style={{ marginBottom: '16px', borderBottom: 'none' }}>Contact Sales</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Contact us to set up a trial, explore Mission Critical requirements, or answer any technical questions.</p>
        <a href="mailto:rino@villadalmine.club?subject=Leloir%20Trial%20Inquiry" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
          Contact Sales (Email)
        </a>
      </div>
    </div>
  );
}
