import { useState, useEffect } from 'react';

export interface CapabilityDescriptor {
  id: string;
  seam: 'Trigger' | 'LLM' | 'Tools' | 'RBAC' | 'Outcome';
  crd?: string;
  test_status: 'proven' | 'e2e-happy' | 'e2e-chaos' | 'unit' | 'not-tested';
  core_affected: boolean;
  substrate: 'any' | 'standalone-cluster' | 'external';
  agnostic_proof: string[];
  test: string[];
  metric: string;
  present?: boolean;
  degradation?: 'hard-fail' | 'graceful';
}

export interface CRDSchema {
  kind: string;
  description: string;
  fields: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

// Built-in CRD JSON Schemas derived from assets/leloir-crds-v1.zip
export const BUILTIN_CRD_SCHEMAS: Record<string, CRDSchema> = {
  AlertRoute: {
    kind: 'AlertRoute',
    description: 'Routes incoming alerts to designated AI agents with budget limits.',
    fields: [
      { name: 'name', type: 'string', required: true, description: 'Route unique identifier' },
      { name: 'agentName', type: 'string', required: true, description: 'Target agent (e.g. holmesgpt)' },
      { name: 'matchLabels', type: 'object', required: false, description: 'Selector labels for incoming alert payloads' },
      { name: 'budgetMaxUSD', type: 'number', required: true, description: 'Per-investigation cap in USD' }
    ]
  },
  Tenant: {
    kind: 'Tenant',
    description: 'Multi-tenant namespace and isolation boundary declaration.',
    fields: [
      { name: 'tenantId', type: 'string', required: true, description: 'Unique Tenant ID' },
      { name: 'namespaces', type: 'array', required: true, description: 'Assigned K8s namespaces' },
      { name: 'tier', type: 'string', required: true, description: 'License tier (oss | team | enterprise)' }
    ]
  },
  TenantBudget: {
    kind: 'TenantBudget',
    description: '4-layer budget guardrail declaration per tenant.',
    fields: [
      { name: 'monthlyMaxUSD', type: 'number', required: true, description: 'Monthly USD cap' },
      { name: 'maxTokensPerCall', type: 'number', required: false, description: 'Token limit per LLM invocation' },
      { name: 'hardLimitAction', type: 'string', required: true, description: 'Action on limit (reject | shadow)' }
    ]
  },
  SkillSource: {
    kind: 'SkillSource',
    description: 'Git-backed or OCI repository of skill packages for agents.',
    fields: [
      { name: 'url', type: 'string', required: true, description: 'Repository URL' },
      { name: 'cosignVerified', type: 'boolean', required: false, description: 'Require Cosign signature verification' },
      { name: 'branch', type: 'string', required: true, description: 'Git target branch' }
    ]
  },
  ApprovalPolicy: {
    kind: 'ApprovalPolicy',
    description: 'HITL approval policy for high-risk tool executions.',
    fields: [
      { name: 'actionPattern', type: 'string', required: true, description: 'Regex pattern of tool/command to gate' },
      { name: 'minApprovers', type: 'number', required: true, description: 'Number of human signatures required' },
      { name: 'timeoutSeconds', type: 'number', required: false, description: 'Approval window timeout' }
    ]
  }
};

export function useCapabilities() {
  const [capabilities, setCapabilities] = useState<CapabilityDescriptor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('./data/report.json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.features) {
          const mapped: CapabilityDescriptor[] = data.features.map((f: CapabilityDescriptor) => ({
            ...f,
            present: f.test_status !== 'not-tested',
            degradation: f.core_affected ? 'hard-fail' : 'graceful'
          }));
          setCapabilities(mapped);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { capabilities, schemas: BUILTIN_CRD_SCHEMAS, loading, error };
}
