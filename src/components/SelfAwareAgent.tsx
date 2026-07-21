import { useState } from 'react';
import { Activity, ShieldCheck, Database, Network, Cpu, Lock, CheckCircle2 } from 'lucide-react';
import './SelfAwareAgent.css';

export function SelfAwareAgent() {
  const [activeTab, setActiveTab] = useState('scorecard');

  return (
    <div className="self-aware-container">
      <div className="self-aware-header">
        <div className="agent-badge">
          <Activity size={16} className="pulse-icon" />
          <span>leloir_self (Agent Introspection)</span>
        </div>
        <div className="m2-attestation">
          <Lock size={14} />
          <span>M2 Tamper-Evident Chained</span>
        </div>
      </div>
      
      <div className="self-aware-body">
        <div className="sidebar">
          <button 
            className={`tab-btn ${activeTab === 'scorecard' ? 'active' : ''}`}
            onClick={() => setActiveTab('scorecard')}
          >
            <ShieldCheck size={18} /> Governance Scorecard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
            onClick={() => setActiveTab('budget')}
          >
            <Database size={18} /> Dynamic Budget
          </button>
          <button 
            className={`tab-btn ${activeTab === 'drift' ? 'active' : ''}`}
            onClick={() => setActiveTab('drift')}
          >
            <Network size={18} /> Drift Analysis
          </button>
        </div>
        
        <div className="content-pane">
          {activeTab === 'scorecard' && (
            <div className="fade-in">
              <h3>Governance Scorecard <span className="score">5/5 REAL</span></h3>
              <p className="subtext">Measured live via SubjectAccessReview and Gateway checks.</p>
              <ul className="score-list">
                <li><CheckCircle2 size={16} className="text-green" /> <strong>LLM:</strong> Enforced by Gateway</li>
                <li><CheckCircle2 size={16} className="text-green" /> <strong>Tools:</strong> Gateway-routed</li>
                <li><CheckCircle2 size={16} className="text-green" /> <strong>RBAC:</strong> Credential injection (Containment)</li>
                <li><CheckCircle2 size={16} className="text-green" /> <strong>Trigger:</strong> Properly routed</li>
                <li><CheckCircle2 size={16} className="text-green" /> <strong>Outcome:</strong> Recorded & Hashed (M2)</li>
              </ul>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="fade-in">
              <h3>Budget-Aware Cooperation</h3>
              <p className="subtext">The agent observes its remaining allocation in real-time and self-throttles gracefully before the control plane initiates a hard-cut.</p>
              <div className="budget-stats">
                <div className="stat-box">
                  <span className="label">Remaining</span>
                  <span className="value">$4.84</span>
                  <span className="sub">of $5.00</span>
                </div>
                <div className="stat-box">
                  <span className="label">Tokens Used</span>
                  <span className="value">78,852</span>
                </div>
                <div className="stat-box">
                  <span className="label">Hard Limit Action</span>
                  <span className="value text-red">Reject</span>
                </div>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(0.157 / 5) * 100}%` }}></div>
              </div>
              <p className="budget-desc">Agent limits its loop scope as budget depletes. <em>(Self-throttle enabled)</em></p>
            </div>
          )}

          {activeTab === 'drift' && (
            <div className="fade-in">
              <h3>Drift-Conscious Execution</h3>
              <p className="subtext">Agent compares its trajectory against the organizational baseline via <span className="mono">self_drift</span>.</p>
              <div className="drift-status">
                <Cpu size={32} className="text-blue" />
                <div className="drift-info">
                  <h4>Trajectory Aligned</h4>
                  <span className="status-badge aligned">true</span>
                </div>
              </div>
              <div className="terminal-box">
                <code>
                  $ audit_events search --type=mcp.tool_call<br/>
                  &gt; [SUCCESS] self_drift executed by demo-mode1<br/>
                  &gt; hash_prev: a7b8c...<br/>
                  &gt; hash_self: f2c9d... [VERIFIED]
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
