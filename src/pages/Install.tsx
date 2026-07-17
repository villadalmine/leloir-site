import { useSiteData, t } from '../hooks/useSiteData';

export function Install() {
  const { data, loading } = useSiteData<any>('deploy.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="install" className="container" style={{ padding: '80px 24px' }}>
      <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(data.title)}</h2>
      <p className="lead">{t(data.sub)}</p>
      
      <div style={{ marginBottom: '32px' }}>
        <a href="https://github.com/villadalmine/leloir-helm" target="_blank" rel="noreferrer" className="badge" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: 'var(--ok)', border: '1px solid var(--ok)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          📦 View Leloir Helm Chart on GitHub
        </a>
      </div>

      {data.roles.map((r: any, i: number) => (
        <div key={i} style={{ marginBottom: '40px' }}>
          <h3>{t(r.who)}</h3>
          <p>{t(r.does)}</p>
          <pre><code>{r.cmd}</code></pre>
        </div>
      ))}
    </div>
  );
}
