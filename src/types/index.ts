// 🎯 DeepGaza AI-Driven Cyber Offensive - Core Types
// Central type definitions for the entire platform

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  capabilities: string[];
  lastActive: Date;
  performance: AgentPerformance;
  isolation: AgentIsolation;
}

export type AgentType = 
  | 'emerging-threats'
  | 'defense-adaptation'
  | 'plugin-development'
  | 'adaptive-pentesting'
  | 'attack-simulation'
  | 'zero-day-analysis';

export type AgentStatus = 'active' | 'inactive' | 'error' | 'processing' | 'standby';

export interface AgentPerformance {
  responseTime: number; // milliseconds
  successRate: number; // percentage
  memoryUsage: number; // MB
  cpuUsage: number; // percentage
  tasksCompleted: number;
  errorsCount: number;
}

export interface AgentIsolation {
  sandboxId: string;
  memoryLimit: number; // MB
  cpuLimit: number; // percentage
  networkRestrictions: string[];
  fileSystemAccess: string[];
  encrypted: boolean;
}

// BDI-HTN Reasoning System Types
export interface Belief {
  id: string;
  content: any;
  confidence: number; // 0-1
  timestamp: Date;
  source: string;
  validated: boolean;
}

export interface Desire {
  id: string;
  goal: string;
  priority: number; // 1-10
  conditions: string[];
  deadline?: Date;
}

export interface Intention {
  id: string;
  plan: Plan;
  status: 'active' | 'completed' | 'failed' | 'suspended';
  progress: number; // 0-100
}

export interface Plan {
  id: string;
  steps: PlanStep[];
  estimatedDuration: number; // minutes
  resources: string[];
  dependencies: string[];
}

export interface PlanStep {
  id: string;
  action: string;
  parameters: Record<string, any>;
  preconditions: string[];
  postconditions: string[];
  estimated_time: number; // minutes
}

// Security and Communication Types
export interface SecureMessage {
  id: string;
  from: string;
  to: string;
  content: any;
  timestamp: Date;
  encrypted: boolean;
  signature: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ThreatIntelligence {
  id: string;
  type: ThreatType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  indicators: string[];
  mitigations: string[];
  source: string;
  timestamp: Date;
  confidence: number; // 0-1
}

export type ThreatType = 
  | 'malware'
  | 'phishing'
  | 'vulnerability'
  | 'zero-day'
  | 'apt'
  | 'insider-threat'
  | 'ddos'
  | 'data-breach';

// Analysis and Execution Types
export interface AnalysisResult {
  id: string;
  agentId: string;
  type: string;
  findings: Finding[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  confidence: number;
}

export interface Finding {
  id: string;
  category: string;
  description: string;
  evidence: any[];
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  remediation?: string;
}

export interface AttackVector {
  id: string;
  name: string;
  description: string;
  steps: string[];
  tools: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigations: string[];
}

// UI and Frontend Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  metadata?: Record<string, any>;
}

export interface TerminalSession {
  id: string;
  commands: TerminalCommand[];
  environment: Record<string, string>;
  workingDirectory: string;
  status: 'active' | 'inactive' | 'error';
  permissions: string[];
}

export interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  exitCode: number;
  timestamp: Date;
  duration: number; // milliseconds
  validated: boolean;
}

// Configuration Types
export interface SecurityConfig {
  encryption: {
    algorithm: string;
    keySize: number;
    enabled: boolean;
  };
  rateLimiting: {
    windowMs: number;
    maxRequests: number;
    skipSuccessfulRequests: boolean;
  };
  authentication: {
    jwtSecret: string;
    tokenExpiration: string;
    refreshTokenExpiration: string;
  };
  sandbox: {
    memoryLimit: number;
    cpuLimit: number;
    networkIsolation: boolean;
    fileSystemIsolation: boolean;
  };
}

export interface SystemMetrics {
  timestamp: Date;
  agents: {
    total: number;
    active: number;
    averageResponseTime: number;
    totalTasks: number;
  };
  system: {
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
    networkTraffic: number;
  };
  security: {
    threatsDetected: number;
    vulnerabilitiesFound: number;
    attacksBlocked: number;
    confidenceLevel: number;
  };
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  requestId: string;
  processingTime: number; // milliseconds
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  requestId: string;
}

// Plugin System Types
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  capabilities: string[];
  dependencies: string[];
  sandboxed: boolean;
  verified: boolean;
  code: string;
}

export interface PluginExecution {
  pluginId: string;
  input: any;
  output?: any;
  error?: string;
  startTime: Date;
  endTime?: Date;
  memoryUsed: number;
  cpuUsed: number;
  sandboxViolations: string[];
}

// All types are already exported above with their definitions