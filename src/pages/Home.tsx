import { useSiteData, t } from '../hooks/useSiteData';

export function Home() {
  const { data, loading } = useSiteData<any>('manifest.json');

  if (loading || !data) return <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div id="introduction" className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <h1>Leloir Governance</h1>
      <p className="lead" style={{ maxWidth: '600px', margin: '0 auto 48px' }}>
        {t(data.project.description)}
      </p>
      
      <div className="badges" style={{ justifyContent: 'center' }}>
        <span className="pill">Zero-Trust Architecture</span>
        <span className="pill">Kubernetes Native</span>
        <span className="pill">No Vendor Lock-in</span>
      </div>
    </div>
  );
}
