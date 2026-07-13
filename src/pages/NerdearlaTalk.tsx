import { useState } from 'react';
import { PresentationDeck, Slide } from '../components/Presentation/PresentationDeck';

export const NerdearlaTalk = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b0f19', color: '#e2e8f0', fontFamily: 'monospace' }}>
        <h2>[ ACCESO RESTRINGIDO ]</h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>Esta presentación es material confidencial para evaluadores.</p>
        <input 
          type="password" 
          placeholder="Ingresar Código"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && passcode.toUpperCase() === 'NERDEARLA26') {
              setIsUnlocked(true);
            }
          }}
          style={{ padding: '10px', fontSize: '1.2rem', backgroundColor: '#1e293b', color: '#10b981', border: '1px solid #334155', borderRadius: '5px', textAlign: 'center', outline: 'none' }}
        />
      </div>
    );
  }

  return (
    <PresentationDeck>
      {/* Diapositiva 1: Título */}
      <Slide isActive={false}>
        <div className="text-center">
          <h1>Gobierno de IA en Producción</h1>
          <h2>Arquitectura Multi-Tenant para Agentes en Kubernetes</h2>
          <p className="mt-4" style={{ color: '#64748b' }}>Nerdearla 2026</p>
        </div>
      </Slide>

      {/* Diapositiva 2: El Dolor */}
      <Slide isActive={false}>
        <h1>El Problema del "Día 2"</h1>
        <div className="highlight-box">
          <ul>
            <li>Todos saben hacer un bot local con OpenAI.</li>
            <li>Pocos saben darle acceso a Kubernetes sin riesgo.</li>
            <li>Un LLM con permisos de <code>cluster-admin</code> es un desastre esperando a ocurrir.</li>
            <li>¿Cómo limitas el gasto de tokens (FinOps) por equipo sin pisarse entre ellos?</li>
          </ul>
        </div>
      </Slide>

      {/* Diapositiva 3: La Solución Arquitectónica */}
      <Slide isActive={false}>
        <h1>Platform Engineering para IA</h1>
        <p>No necesitas un agente más inteligente, necesitas un <strong>Control Plane</strong>.</p>
        <div className="highlight-box mt-4">
          <ul>
            <li><strong>Interceptación:</strong> Rutear las tools (MCP) a través de un Gateway.</li>
            <li><strong>Zero Trust:</strong> RBAC estricto antes de que la petición llegue al LLM.</li>
            <li><strong>FinOps:</strong> Contabilidad de tokens en capa 7 (Proxy Transparente).</li>
          </ul>
        </div>
      </Slide>

      {/* Diapositiva 4: Shadow Mode */}
      <Slide isActive={false}>
        <h1>Shadow Mode: Cero Riesgo</h1>
        <div className="highlight-box">
          <p style={{fontFamily: 'monospace', color: '#fb7185'}}>Agente: "Eliminando namespace 'produccion'..."</p>
          <hr style={{borderColor: '#334155', margin: '20px 0'}} />
          <p>
            El Gateway intercepta la llamada, la bloquea en K8s, y devuelve un falso <code>HTTP 200 OK</code>. 
            El agente cree que tuvo éxito. Tu infraestructura sigue viva.
          </p>
        </div>
      </Slide>

      {/* Diapositiva 5: El Cierre */}
      <Slide isActive={false}>
        <div className="text-center">
          <h1>Leloir</h1>
          <h2>El Primer Control Plane Open-Source para Agentes de IA</h2>
          <p className="mt-4">
            Aplica hoy los patrones de esta charla sin reinventar la rueda.<br/>
            <code>helm install leloir</code>
          </p>
          <p className="mt-4" style={{ color: '#10b981', fontFamily: 'monospace' }}>
            github.com/villadalmine/leloir
          </p>
        </div>
      </Slide>
    </PresentationDeck>
  );
};
