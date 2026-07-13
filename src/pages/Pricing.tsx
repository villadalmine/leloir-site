import { useSiteData, t } from '../hooks/useSiteData';
import { Check, Minus } from 'lucide-react';

export function Pricing() {
  const { data, loading } = useSiteData<any>('features.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  const tiers = ['OSS', 'Team', 'Mission Critical'];

  return (
    <div id="features" className="container" style={{ padding: '80px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px' }}>{t(data.title)}</h1>
        <p className="lead" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}>{t(data.sub)}</p>

        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', textAlign: 'left', display: 'flex', gap: '24px', alignItems: 'flex-start', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <div style={{ fontSize: '32px' }}>🔓</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: 'var(--fg)' }}>Open Core & Source Available</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>
              Leloir is built on an Open Core model. The core control plane, proxy gateway, and fundamental orchestration features are <strong>100% Free and Open Source</strong> (Apache 2.0). 
              <br/><br/>
              Similar to companies like <strong>GitLab</strong> or <strong>Kong</strong>, our <em>Team</em> and <em>Mission Critical</em> enterprise capabilities live in the same repository. This gives you <strong>full transparency to inspect the code</strong> for security and compliance audits, though unlocking and running those enterprise modules in production requires a commercial license key.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '0', overflowX: 'auto', marginBottom: '64px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)' }}>
              <th style={{ padding: '24px', fontWeight: 600, fontSize: '18px', width: '40%' }}>Feature</th>
              {tiers.map(tier => (
                <th key={tier} style={{ padding: '24px', fontWeight: 600, textAlign: 'center' }}>
                  <span className={`badge ${tier === 'OSS' ? 'badge-oss' : tier === 'Team' ? 'badge-team' : 'badge-mc'}`}>
                    {tier}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.features.map((f: any, i: number) => {
              // Determine if a tier has this feature
              const hasFeature = (t: string) => {
                if (f.tier === 'OSS') return true;
                if (f.tier === 'Team' && (t === 'Team' || t === 'Mission Critical')) return true;
                if (f.tier === 'Mission Critical' && t === 'Mission Critical') return true;
                return false;
              };

              return (
                <tr key={i} style={{ borderBottom: i === data.features.length - 1 ? 'none' : '1px solid var(--line)' }}>
                  <td style={{ padding: '24px' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '16px' }}>{t(f.title)}</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {t(f.desc)}
                    </p>
                  </td>
                  {tiers.map(tier => (
                    <td key={tier} style={{ padding: '24px', textAlign: 'center' }}>
                      {hasFeature(tier) ? (
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
        <a href="/roadmap" className="btn btn-outline" style={{ display: 'inline-block', padding: '12px 24px' }}>
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
