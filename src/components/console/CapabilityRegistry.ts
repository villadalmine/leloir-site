import type { CapabilityDescriptor } from '../../hooks/useCapabilities';

export interface SeamGroup {
  seam: 'Trigger' | 'LLM' | 'Tools' | 'RBAC' | 'Outcome';
  label: string;
  description: string;
  capabilities: CapabilityDescriptor[];
}

export const SEAM_METADATA: Record<string, { label: string; description: string }> = {
  Trigger: {
    label: 'Trigger & Ingestion',
    description: 'Alert routes, webhooks, and alertmanager event ingestion.'
  },
  LLM: {
    label: 'LLM & FinOps',
    description: '4-layer budget guardrails, token metering, and key isolation.'
  },
  Tools: {
    label: 'Tools & Containment',
    description: 'MCP Gateway, tool proxy, Presidio PII masking, and memory slots.'
  },
  RBAC: {
    label: 'RBAC & Multi-Tenancy',
    description: 'Namespace isolation, egress lockdown, and cross-tenant 404 boundaries.'
  },
  Outcome: {
    label: 'Outcome & Governance',
    description: 'WORM hash-chain audit, Grafana observability, and honesty scorecards.'
  }
};

export function groupCapabilitiesBySeam(capabilities: CapabilityDescriptor[]): SeamGroup[] {
  const seams: Array<'Trigger' | 'LLM' | 'Tools' | 'RBAC' | 'Outcome'> = [
    'Trigger',
    'LLM',
    'Tools',
    'RBAC',
    'Outcome'
  ];

  return seams.map((seam) => {
    const meta = SEAM_METADATA[seam];
    return {
      seam,
      label: meta.label,
      description: meta.description,
      capabilities: capabilities.filter((cap) => cap.seam === seam)
    };
  });
}
