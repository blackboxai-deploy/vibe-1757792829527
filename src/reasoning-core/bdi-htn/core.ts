// 🧠 DeepGaza AI-Driven Cyber Offensive - BDI-HTN Reasoning Core
// Belief-Desire-Intention framework with Hierarchical Task Network planning

import { Belief, Desire, Intention, Plan, PlanStep } from '@/types';

export interface ReasoningContext {
  agentId: string;
  domain: string;
  timestamp: Date;
  confidenceThreshold: number;
}

export class BDIHTNCore {
  private static instance: BDIHTNCore;
  private beliefs: Map<string, Belief[]> = new Map();
  private desires: Map<string, Desire[]> = new Map(); 
  private intentions: Map<string, Intention[]> = new Map();
  private activePlans: Map<string, Plan[]> = new Map();
  private confidenceTracker: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): BDIHTNCore {
    if (!BDIHTNCore.instance) {
      BDIHTNCore.instance = new BDIHTNCore();
    }
    return BDIHTNCore.instance;
  }

  /**
   * Add a new belief to the system
   */
  public addBelief(agentId: string, belief: Belief): void {
    if (!this.beliefs.has(agentId)) {
      this.beliefs.set(agentId, []);
    }

    // Validate belief before adding
    if (this.validateBelief(belief)) {
      const agentBeliefs = this.beliefs.get(agentId)!;
      
      // Remove conflicting beliefs
      this.resolveBeliefConflicts(agentBeliefs, belief);
      
      // Add new belief
      agentBeliefs.push(belief);
      
      // Update confidence tracking
      this.updateConfidence(agentId, belief);
      
      console.log(`🧠 New belief added for ${agentId}: ${belief.content} (confidence: ${belief.confidence})`);
    }
  }

  /**
   * Add a new desire to the system
   */
  public addDesire(agentId: string, desire: Desire): void {
    if (!this.desires.has(agentId)) {
      this.desires.set(agentId, []);
    }

    const agentDesires = this.desires.get(agentId)!;
    agentDesires.push(desire);
    
    // Sort by priority
    agentDesires.sort((a, b) => b.priority - a.priority);
    
    console.log(`🎯 New desire added for ${agentId}: ${desire.goal} (priority: ${desire.priority})`);
    
    // Trigger intention formation
    this.formIntentions(agentId);
  }

  /**
   * Form intentions based on current beliefs and desires
   */
  public formIntentions(agentId: string): void {
    const beliefs = this.beliefs.get(agentId) || [];
    const desires = this.desires.get(agentId) || [];
    
    if (!this.intentions.has(agentId)) {
      this.intentions.set(agentId, []);
    }
    
    const intentions = this.intentions.get(agentId)!;
    
    // Process desires in priority order
    for (const desire of desires) {
      if (this.shouldFormIntention(desire, beliefs)) {
        const plan = this.createHierarchicalPlan(agentId, desire, beliefs);
        
        if (plan && this.validatePlan(plan, beliefs)) {
          const intention: Intention = {
            id: this.generateId(),
            plan,
            status: 'active',
            progress: 0
          };
          
          intentions.push(intention);
          this.trackActivePlan(agentId, plan);
          
          console.log(`🎯 New intention formed for ${agentId}: ${desire.goal}`);
        }
      }
    }
  }

  /**
   * Create hierarchical task network plan
   */
  public createHierarchicalPlan(agentId: string, desire: Desire, beliefs: Belief[]): Plan | null {
    const planId = this.generateId();
    
    try {
      // Decompose high-level goal into hierarchical tasks
      const tasks = this.decomposeGoal(desire.goal, beliefs);
      
      if (tasks.length === 0) {
        console.warn(`⚠️ Could not decompose goal: ${desire.goal}`);
        return null;
      }
      
      const plan: Plan = {
        id: planId,
        steps: tasks,
        estimatedDuration: this.estimatePlanDuration(tasks),
        resources: this.identifyRequiredResources(tasks),
        dependencies: this.identifyDependencies(tasks)
      };
      
      console.log(`📋 HTN Plan created for ${desire.goal}: ${tasks.length} steps`);
      return plan;
      
    } catch (error) {
      console.error(`❌ Failed to create plan for ${desire.goal}:`, error);
      return null;
    }
  }

  /**
   * Decompose high-level goal into hierarchical tasks
   */
  private decomposeGoal(goal: string, beliefs: Belief[]): PlanStep[] {
    const steps: PlanStep[] = [];
    
    // Goal-based task decomposition
    if (goal.includes('threat-analysis')) {
      steps.push(...this.createThreatAnalysisTasks());
    } else if (goal.includes('vulnerability-scan')) {
      steps.push(...this.createVulnerabilityScanTasks());
    } else if (goal.includes('penetration-test')) {
      steps.push(...this.createPentestTasks());
    } else if (goal.includes('plugin-development')) {
      steps.push(...this.createPluginDevTasks());
    } else if (goal.includes('attack-simulation')) {
      steps.push(...this.createAttackSimTasks());
    } else if (goal.includes('zero-day-analysis')) {
      steps.push(...this.createZeroDayTasks());
    } else {
      // Generic task decomposition
      steps.push(...this.createGenericTasks(goal));
    }
    
    // Add context-aware refinements based on beliefs
    this.refineTasksWithBeliefs(steps, beliefs);
    
    return steps;
  }

  /**
   * Create threat analysis task hierarchy
   */
  private createThreatAnalysisTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'collect-threat-intelligence',
        parameters: { sources: ['osint', 'feeds', 'apis'] },
        preconditions: ['network-access'],
        postconditions: ['threat-data-collected'],
        estimated_time: 5
      },
      {
        id: this.generateId(),
        action: 'analyze-threat-patterns',
        parameters: { algorithms: ['ml', 'heuristic'] },
        preconditions: ['threat-data-collected'],
        postconditions: ['patterns-identified'],
        estimated_time: 10
      },
      {
        id: this.generateId(),
        action: 'assess-threat-impact',
        parameters: { criteria: ['severity', 'likelihood'] },
        preconditions: ['patterns-identified'],
        postconditions: ['impact-assessed'],
        estimated_time: 8
      },
      {
        id: this.generateId(),
        action: 'generate-threat-report',
        parameters: { format: 'json', include_mitigations: true },
        preconditions: ['impact-assessed'],
        postconditions: ['report-generated'],
        estimated_time: 3
      }
    ];
  }

  /**
   * Create vulnerability scanning task hierarchy
   */
  private createVulnerabilityScanTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'discover-targets',
        parameters: { methods: ['nmap', 'ping-sweep'] },
        preconditions: ['target-scope'],
        postconditions: ['targets-discovered'],
        estimated_time: 15
      },
      {
        id: this.generateId(),
        action: 'enumerate-services',
        parameters: { depth: 'detailed' },
        preconditions: ['targets-discovered'],
        postconditions: ['services-enumerated'],
        estimated_time: 20
      },
      {
        id: this.generateId(),
        action: 'scan-vulnerabilities',
        parameters: { databases: ['nvd', 'exploit-db'] },
        preconditions: ['services-enumerated'],
        postconditions: ['vulnerabilities-found'],
        estimated_time: 30
      },
      {
        id: this.generateId(),
        action: 'validate-findings',
        parameters: { manual_verification: true },
        preconditions: ['vulnerabilities-found'],
        postconditions: ['findings-validated'],
        estimated_time: 25
      }
    ];
  }

  /**
   * Validate belief against anti-hallucination rules
   */
  private validateBelief(belief: Belief): boolean {
    // Confidence threshold check
    if (belief.confidence < 0.3) {
      console.warn(`⚠️ Belief rejected due to low confidence: ${belief.confidence}`);
      return false;
    }
    
    // Source validation
    const trustedSources = ['verified-intel', 'authenticated-api', 'validated-scan'];
    if (!trustedSources.some(source => belief.source.includes(source))) {
      console.warn(`⚠️ Belief rejected due to untrusted source: ${belief.source}`);
      return false;
    }
    
    // Content validation
    if (!belief.content || typeof belief.content !== 'object') {
      console.warn(`⚠️ Belief rejected due to invalid content`);
      return false;
    }
    
    return true;
  }

  /**
   * Resolve conflicts between beliefs
   */
  private resolveBeliefConflicts(beliefs: Belief[], newBelief: Belief): void {
    const conflictingBeliefs = beliefs.filter(b => 
      this.areBeliefConflicting(b, newBelief)
    );
    
    for (const conflicting of conflictingBeliefs) {
      if (newBelief.confidence > conflicting.confidence) {
        // Remove less confident belief
        const index = beliefs.indexOf(conflicting);
        beliefs.splice(index, 1);
        console.log(`🔄 Replaced conflicting belief (confidence: ${conflicting.confidence} -> ${newBelief.confidence})`);
      }
    }
  }

  /**
   * Check if two beliefs are conflicting
   */
  private areBeliefConflicting(belief1: Belief, belief2: Belief): boolean {
    // Simple content-based conflict detection
    if (typeof belief1.content === 'object' && typeof belief2.content === 'object') {
      const keys1 = Object.keys(belief1.content);
      const keys2 = Object.keys(belief2.content);
      
      // Check for direct contradictions
      for (const key of keys1) {
        if (keys2.includes(key) && belief1.content[key] !== belief2.content[key]) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Update confidence tracking
   */
  private updateConfidence(agentId: string, belief: Belief): void {
    const currentConfidence = this.confidenceTracker.get(agentId) || 1.0;
    
    // Weighted confidence update
    const newConfidence = (currentConfidence * 0.8) + (belief.confidence * 0.2);
    this.confidenceTracker.set(agentId, newConfidence);
  }

  /**
   * Check if intention should be formed
   */
  private shouldFormIntention(desire: Desire, beliefs: Belief[]): boolean {
    // Check if conditions are met based on beliefs
    for (const condition of desire.conditions) {
      const beliefExists = beliefs.some(b => 
        b.validated && 
        b.confidence > 0.5 && 
        JSON.stringify(b.content).includes(condition)
      );
      
      if (!beliefExists) {
        return false;
      }
    }
    
    return true;
  }

  // Additional helper methods for task creation
  private createPentestTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'reconnaissance',
        parameters: { passive: true, active: true },
        preconditions: ['target-authorized'],
        postconditions: ['intel-gathered'],
        estimated_time: 30
      },
      {
        id: this.generateId(),
        action: 'exploitation',
        parameters: { automated: false, manual: true },
        preconditions: ['vulnerabilities-identified'],
        postconditions: ['access-gained'],
        estimated_time: 45
      }
    ];
  }

  private createPluginDevTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'analyze-requirements',
        parameters: { specification: 'auto-generate' },
        preconditions: ['requirements-defined'],
        postconditions: ['analysis-complete'],
        estimated_time: 15
      },
      {
        id: this.generateId(),
        action: 'generate-code',
        parameters: { language: 'typescript', tests: true },
        preconditions: ['analysis-complete'],
        postconditions: ['code-generated'],
        estimated_time: 25
      }
    ];
  }

  private createAttackSimTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'model-attack-scenario',
        parameters: { complexity: 'high' },
        preconditions: ['threat-intelligence'],
        postconditions: ['scenario-modeled'],
        estimated_time: 20
      }
    ];
  }

  private createZeroDayTasks(): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'pattern-analysis',
        parameters: { deep_learning: true },
        preconditions: ['code-samples'],
        postconditions: ['patterns-analyzed'],
        estimated_time: 60
      }
    ];
  }

  private createGenericTasks(goal: string): PlanStep[] {
    return [
      {
        id: this.generateId(),
        action: 'analyze-goal',
        parameters: { goal },
        preconditions: [],
        postconditions: ['goal-analyzed'],
        estimated_time: 5
      },
      {
        id: this.generateId(),
        action: 'execute-goal',
        parameters: { goal },
        preconditions: ['goal-analyzed'],
        postconditions: ['goal-executed'],
        estimated_time: 15
      }
    ];
  }

  private refineTasksWithBeliefs(steps: PlanStep[], beliefs: Belief[]): void {
    // Refine tasks based on current beliefs
    for (const step of steps) {
      const relevantBeliefs = beliefs.filter(b => 
        b.validated && 
        Object.keys(b.content).some(key => 
          step.action.includes(key) || step.parameters.toString().includes(key)
        )
      );
      
      if (relevantBeliefs.length > 0) {
        // Adjust estimation based on beliefs
        const confidenceMultiplier = relevantBeliefs.reduce((sum, b) => sum + b.confidence, 0) / relevantBeliefs.length;
        step.estimated_time = Math.round(step.estimated_time * (1 / confidenceMultiplier));
      }
    }
  }

  private validatePlan(plan: Plan, beliefs: Belief[]): boolean {
    // Validate plan against current beliefs
    return plan.steps.length > 0 && plan.estimatedDuration > 0;
  }

  private trackActivePlan(agentId: string, plan: Plan): void {
    if (!this.activePlans.has(agentId)) {
      this.activePlans.set(agentId, []);
    }
    this.activePlans.get(agentId)!.push(plan);
  }

  private estimatePlanDuration(steps: PlanStep[]): number {
    return steps.reduce((total, step) => total + step.estimated_time, 0);
  }

  private identifyRequiredResources(steps: PlanStep[]): string[] {
    const resources = new Set<string>();
    steps.forEach(step => {
      Object.values(step.parameters).forEach(param => {
        if (Array.isArray(param)) {
          param.forEach(p => resources.add(String(p)));
        } else {
          resources.add(String(param));
        }
      });
    });
    return Array.from(resources);
  }

  private identifyDependencies(steps: PlanStep[]): string[] {
    const dependencies = new Set<string>();
    steps.forEach(step => {
      step.preconditions.forEach(dep => dependencies.add(dep));
    });
    return Array.from(dependencies);
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }

  // Public API methods
  public getBeliefs(agentId: string): Belief[] {
    return this.beliefs.get(agentId) || [];
  }

  public getDesires(agentId: string): Desire[] {
    return this.desires.get(agentId) || [];
  }

  public getIntentions(agentId: string): Intention[] {
    return this.intentions.get(agentId) || [];
  }

  public getConfidence(agentId: string): number {
    return this.confidenceTracker.get(agentId) || 1.0;
  }
}

export default BDIHTNCore;