"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function DeepGazaDashboard() {
  
  const agents = [
    {
      id: "emerging-threats",
      name: "Emerging Threats Agent",
      status: "active",
      threats: 247,
      description: "Real-time threat intelligence and vulnerability scanning"
    },
    {
      id: "defense-adaptation", 
      name: "Defense Adaptation Agent",
      status: "active",
      adaptations: 89,
      description: "Security technology analysis and adaptation strategies"
    },
    {
      id: "plugin-development",
      name: "Plugin Development Agent", 
      status: "standby",
      plugins: 34,
      description: "Dynamic security plugin generation and validation"
    },
    {
      id: "adaptive-pentesting",
      name: "Adaptive Pentesting Agent",
      status: "active",
      tests: 156,
      description: "Intelligent penetration testing with attack vector analysis"
    },
    {
      id: "attack-simulation",
      name: "Attack Simulation Agent",
      status: "active", 
      simulations: 78,
      description: "Realistic attack scenario generation and simulation"
    },
    {
      id: "zero-day-analysis",
      name: "Zero-Day Analysis Agent",
      status: "scanning",
      patterns: 423,
      description: "Advanced exploit detection and pattern analysis"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "scanning": return "bg-blue-500";
      case "standby": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                DeepGaza AI Cyber Offensive
              </h1>
              <p className="text-slate-400 text-sm">Advanced AI-Driven Cybersecurity Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                System Online
              </Badge>
              <div className="text-right">
                <div className="text-sm font-medium">6 Agents Active</div>
                <div className="text-xs text-slate-400">BDI-HTN Core Running</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800">
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="intelligence">Threat Intel</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Threats Detected</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-400">1,247</div>
                  <p className="text-xs text-slate-500">+23% from last hour</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Active Simulations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">156</div>
                  <p className="text-xs text-slate-500">Running across 12 targets</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">Zero-Day Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">89</div>
                  <p className="text-xs text-slate-500">3 high-priority alerts</p>
                </CardContent>
              </Card>
            </div>

            {/* AI Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                    </div>
                    <p className="text-sm text-slate-400">{agent.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Status</span>
                        <Badge variant="secondary" className="capitalize">
                          {agent.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Performance</span>
                          <span className="text-green-400">98.5%</span>
                        </div>
                        <Progress value={98.5} className="h-2" />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-slate-600 hover:border-slate-500"
                      >
                        Configure Agent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Real-Time Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">Threat Intelligence Module</div>
                  <div className="text-sm text-slate-500">Real-time feeds and analysis coming soon</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Intelligent Terminal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">DeepGaza Terminal v1.0.0</div>
                  <div className="text-slate-400 mb-4">AI-powered cybersecurity command interface</div>
                  <div className="flex items-center">
                    <span className="text-cyan-400">deepgaza@system:~$</span>
                    <span className="ml-2 bg-white/20 w-2 h-4 inline-block animate-pulse"></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Advanced Analysis Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">Analysis Engine</div>
                  <div className="text-sm text-slate-500">Advanced analytics and reporting tools</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}