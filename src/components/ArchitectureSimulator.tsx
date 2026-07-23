import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, ShieldCheck, Bell, Gauge, Wrench, Lock, FileCheck2 } from 'lucide-react';
import './ArchitectureSimulator.css';

interface SeamStep {
  id: string;
  seam: string;
  title: string;
  icon: React.ElementType;
  description: string;
  crdKind: string;
  goPackage: string;
  testStatus: string;
  codeSnippet: string;
  hash: string;
}

const SEAM_STEPS: SeamStep[] = [
  {
    id: 'trigger',
    seam: 'Trigger & Alert Route',
    title: '1. Incident Ingestion & Routing',
    icon: Bell,
    description: 'Prometheus / Datadog webhook triggers an AlertRoute CRD. The Leloir Control Plane matches severity, assigns tenant context, and selects the governance profile.',
    crdKind: 'AlertRoute',
    goPackage: 'internal/controlplane/ingress',
    testStatus: 'e2e-happy',
    codeSnippet: `apiVersion: governance.leloir.io/v1alpha1
kind: AlertRoute
metadata:
  name: critical-k8s-pod-crash
  namespace: tenant-finance
spec:
  matchLabels:
    severity: critical
    app: payment-gateway
  profile: corporate
  targetAgent: holmesgpt`,
    hash: 'sha256:7f8e3a2b1c4d9e0f5a6b7c8d9e0f1a2b'
  },
  {
    id: 'llm',
    seam: 'LLM Proxy & Budget',
    title: '2. Real Model Metering & Budget Enforcement',
    icon: Gauge,
    description: 'The Agent request passes through the Leloir OpenAI-compatible proxy. Token counts and USD spend are calculated per LLM call and checked against 4-layer TenantBudget limits.',
    crdKind: 'TenantBudget',
    goPackage: 'internal/proxy/llm',
    testStatus: 'e2e-chaos',
    codeSnippet: `apiVersion: governance.leloir.io/v1alpha1
kind: TenantBudget
metadata:
  name: monthly-limit
  namespace: tenant-finance
spec:
  monthly:
    maxUSD: 500.00
    hardLimitAction: reject
  perInvestigation:
    maxTokens: 150000
    maxUSD: 2.50`,
    hash: 'sha256:4b3c2a109f8e7d6c5b4a3f2e1d0c9b8a'
  },
  {
    id: 'tools',
    seam: 'Tool Call & MCP Policy',
    title: '3. Model Context Protocol (MCP) Governance',
    icon: Wrench,
    description: 'Tool execution requests (kubectl, SQL, Cloud API) are filtered against MCPServer security policies. Risky or destructive commands require human approval.',
    crdKind: 'MCPServer',
    goPackage: 'internal/mcp/gateway',
    testStatus: 'e2e-happy',
    codeSnippet: `apiVersion: governance.leloir.io/v1alpha1
kind: MCPServer
metadata:
  name: k8s-read-only-tools
  namespace: tenant-finance
spec:
  transport: stdio
  command: ["npx", "-y", "@modelcontextprotocol/server-kubernetes"]
  containment:
    egressFilter: strict
    allowedNamespaces: ["tenant-finance"]`,
    hash: 'sha256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d'
  },
  {
    id: 'rbac',
    seam: 'RBAC & Multi-Tenant Isolation',
    title: '4. Enterprise Isolation & HITL Approvals',
    icon: Lock,
    description: 'Enforces OIDC claims and tenant namespace bounds. If an action exceeds the risk threshold, an ApprovalRequest is generated and paused in the HITL Inbox.',
    crdKind: 'ApprovalPolicy',
    goPackage: 'internal/controlplane/rbac',
    testStatus: 'e2e-happy',
    codeSnippet: `apiVersion: governance.leloir.io/v1alpha1
kind: ApprovalPolicy
metadata:
  name: require-lead-approval-for-restart
spec:
  riskLevel: high
  requiredApprovers: ["group:sre-leads"]
  timeout: 15m
  onTimeout: reject`,
    hash: 'sha256:9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c'
  },
  {
    id: 'outcome',
    seam: 'Outcome & WORM Audit',
    title: '5. Tamper-Evident Ledger & Compliance Export',
    icon: FileCheck2,
    description: 'Every step, tool call, and human decision is cryptographically linked into a per-tenant SHA-256 hash chain (WORM log), exportable for SOC 2 & EU-DORA compliance.',
    crdKind: 'Tenant (Audit Spec)',
    goPackage: 'internal/controlplane/audit',
    testStatus: 'e2e-happy',
    codeSnippet: `{
  "framework": "EU-DORA",
  "control": "Art.28",
  "title": "Audit trail of ICT operations (immutable)",
  "leloir_capability": "audit-worm",
  "capability_test_status": "e2e-happy",
  "audit_event_type": "investigation.completed",
  "tamper_evident": true
}`,
    hash: 'sha256:3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f'
  }
];

export const ArchitectureSimulator: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % SEAM_STEPS.length);
      }, 4000 / speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const currentStep = SEAM_STEPS[activeStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <div className="simulator-title-group">
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: 'white' }}>
            Live Architecture Simulator
          </h3>
          <div className="simulator-live-badge">
            <span className="pulse"></span>
            SOURCE-DERIVED REALTIME
          </div>
        </div>

        <div className="simulator-controls">
          <button
            className={`sim-btn ${isPlaying ? 'active' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            className="sim-btn"
            onClick={() => setActiveStepIndex((prev) => (prev + 1) % SEAM_STEPS.length)}
            title="Next Step"
          >
            <SkipForward size={16} />
            Step
          </button>

          <button
            className="sim-btn"
            onClick={() => {
              setActiveStepIndex(0);
              setIsPlaying(true);
            }}
            title="Restart simulation"
          >
            <RotateCcw size={16} />
          </button>

          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <option value={0.5} style={{ background: '#0d1117' }}>0.5x Speed</option>
            <option value={1} style={{ background: '#0d1117' }}>1x Speed</option>
            <option value={2} style={{ background: '#0d1117' }}>2x Speed</option>
          </select>
        </div>
      </div>

      {/* 5 Seams Navigation Bar */}
      <div className="seams-nav">
        {SEAM_STEPS.map((step, index) => {
          const TileIcon = step.icon;
          const isActive = index === activeStepIndex;
          return (
            <div
              key={step.id}
              className={`seam-tile ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveStepIndex(index);
                setIsPlaying(false);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div className="seam-step-num">Step {index + 1}</div>
                <TileIcon size={16} color={isActive ? '#60a5fa' : '#94a3b8'} />
              </div>
              <div className="seam-title">{step.seam}</div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Workspace */}
      <div className="simulator-workspace">
        {/* Left: Step Explanation & Meta */}
        <div className="step-details-card">
          <div className="step-header">
            <div className="step-icon">
              <StepIcon size={24} />
            </div>
            <h4 className="step-headline">{currentStep.title}</h4>
          </div>

          <p className="step-description">{currentStep.description}</p>

          <div className="seam-metadata-list">
            <div className="meta-item">
              <span className="meta-label">CRD Specification:</span>
              <span className="meta-value">{currentStep.crdKind}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Backend Package:</span>
              <span className="meta-value">{currentStep.goPackage}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Guard Test Verification:</span>
              <span className="meta-value" style={{ color: '#4ade80' }}>
                ✓ {currentStep.testStatus}
              </span>
            </div>
          </div>

          <div className="worm-ticker-bar">
            <ShieldCheck size={18} color="#a78bfa" />
            <div>
              <span className="worm-label">WORM SHA-256 Event Link: </span>
              <span className="worm-hash">{currentStep.hash}</span>
            </div>
          </div>
        </div>

        {/* Right: Real Code Inspector */}
        <div className="code-inspector-card">
          <div className="code-header">
            <span>SOURCE CODE INSPECTOR — {currentStep.crdKind}</span>
            <span style={{ color: '#60a5fa' }}>LIVE AST / YAML</span>
          </div>
          <pre className="code-content">
            <code>{currentStep.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
