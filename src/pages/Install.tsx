import { useSiteData, t } from '../hooks/useSiteData';

export function Install() {
  const { data, loading } = useSiteData<any>('deploy.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="install" className="container" style={{ padding: '80px 24px' }}>
      <h2 style={{ borderBottom: 'none', marginBottom: '12px' }}>{t(data.title)}</h2>
      <p className="lead">{t(data.sub)}</p>

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
