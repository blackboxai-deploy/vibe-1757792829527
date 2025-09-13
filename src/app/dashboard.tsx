"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntelligentChatInterface from "@/components/intelligent-chat/chat-interface";
import AdvancedTerminal from "@/components/web-terminal/terminal-interface";

export default function CompleteDashboard() {
  const [systemStatus, setSystemStatus] = useState({
    agentsActive: 6,
    uptime: 99.9,
    threats: 12,
    cpuUsage: 45,
    memoryUsage: 672,
    memoryTotal: 1024
  });

  const [agents] = useState([
    { 
      id: 'emerging-threats',
      name: 'Emerging Threats Agent', 
      status: 'Active', 
      performance: 95,
      icon: '🔍',
      description: 'Real-time threat intelligence and vulnerability detection',
      threatsFound: 28,
      color: 'text-red-500'
    },
    { 
      id: 'defense-adaptation',
      name: 'Defense Adaptation Agent', 
      status: 'Active', 
      performance: 87,
      icon: '🛡️',
      description: 'Security technology analysis and adaptation strategies',
      adaptations: 15,
      color: 'text-blue-500'
    },
    { 
      id: 'plugin-development',
      name: 'Plugin Development Agent', 
      status: 'Active', 
      performance: 78,
      icon: '🔧',
      description: 'Dynamic security plugin generation and validation',
      pluginsCreated: 8,
      color: 'text-green-500'
    },
    { 
      id: 'adaptive-pentesting',
      name: 'Adaptive Pentesting Agent', 
      status: 'Active', 
      performance: 92,
      icon: '🎯',
      description: 'Intelligent penetration testing with attack vector analysis',
      testsRun: 42,
      color: 'text-purple-500'
    },
    { 
      id: 'attack-simulation',
      name: 'Attack Simulation Agent', 
      status: 'Active', 
      performance: 89,
      icon: '⚔️',
      description: 'Realistic attack scenario generation and simulation',
      simulationsRun: 23,
      color: 'text-orange-500'
    },
    { 
      id: 'zero-day-analysis',
      name: 'Zero-Day Analysis Agent', 
      status: 'Active', 
      performance: 91,
      icon: '🧬',
      description: 'Advanced exploit detection and pattern analysis',
      exploitsFound: 7,
      color: 'text-cyan-500'
    }
  ]);

  const [threats] = useState([
    { id: 1, threat: 'Ransomware Campaign Detected', severity: 'Critical', time: '2 min ago', color: 'text-red-500' },
    { id: 2, threat: 'Suspicious Network Activity', severity: 'High', time: '5 min ago', color: 'text-orange-500' },
    { id: 3, threat: 'Zero-Day Vulnerability Found', severity: 'Critical', time: '8 min ago', color: 'text-red-500' },
    { id: 4, threat: 'Outdated SSL Certificate', severity: 'Medium', time: '12 min ago', color: 'text-yellow-500' },
    { id: 5, threat: 'Failed Login Attempts', severity: 'Low', time: '18 min ago', color: 'text-blue-500' },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(400, Math.min(900, prev.memoryUsage + (Math.random() - 0.5) * 50)),
        threats: prev.threats + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <main className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c68f4e17-96d4-4339-aa80-f50e8b3dc89d.png"
                alt="DeepGaza AI-Driven Cyber Offensive Platform Logo"
                className="w-30 h-30 rounded-2xl shadow-2xl border-2 border-green-400/30"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-30 h-30 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-black';
                  fallback.textContent = '🎯';
                  e.currentTarget.parentNode?.appendChild(fallback);
                }}
              />
              <div className="absolute -top-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-black animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            DeepGaza AI Platform
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            Advanced AI-Driven Cyber Offensive Platform with 6 Specialized Security Agents
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Featuring BDI-HTN reasoning engine, intelligent chat assistance, and comprehensive security analysis
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
              🧠 BDI-HTN Reasoning
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
              🛡️ Advanced Security
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1">
              ⚡ Real-time Analysis
            </Badge>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1">
              🔒 Agent Isolation
            </Badge>
          </div>
        </div>

        {/* System Status */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              System Status - DeepGaza Core
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time monitoring of all system components and agent performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{systemStatus.agentsActive}/6</div>
                <p className="text-sm text-gray-400">Agents Active</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{systemStatus.uptime}%</div>
                <p className="text-sm text-gray-400">System Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{systemStatus.threats}</div>
                <p className="text-sm text-gray-400">Active Threats</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">15ms</div>
                <p className="text-sm text-gray-400">Avg Response</p>
              </div>
            </div>
            
            <Separator className="my-4 bg-gray-700" />
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">CPU Usage</span>
                  <span className="text-sm text-gray-400">{Math.round(systemStatus.cpuUsage)}%</span>
                </div>
                <Progress value={systemStatus.cpuUsage} className="h-2 bg-gray-700" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Memory Usage</span>
                  <span className="text-sm text-gray-400">{Math.round(systemStatus.memoryUsage)} MB / {systemStatus.memoryTotal} MB</span>
                </div>
                <Progress value={(systemStatus.memoryUsage / systemStatus.memoryTotal) * 100} className="h-2 bg-gray-700" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Agent Performance</span>
                  <span className="text-sm text-gray-400">87% Average</span>
                </div>
                <Progress value={87} className="h-2 bg-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-green-400">Overview</TabsTrigger>
            <TabsTrigger value="agents" className="text-gray-300 data-[state=active]:text-blue-400">Agents</TabsTrigger>
            <TabsTrigger value="threats" className="text-gray-300 data-[state=active]:text-red-400">Threats</TabsTrigger>
            <TabsTrigger value="analysis" className="text-gray-300 data-[state=active]:text-purple-400">Analysis</TabsTrigger>
            <TabsTrigger value="chat" className="text-gray-300 data-[state=active]:text-cyan-400">AI Chat</TabsTrigger>
            <TabsTrigger value="terminal" className="text-gray-300 data-[state=active]:text-orange-400">Terminal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.slice(0, 3).map((agent) => (
                <Card key={agent.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2 text-gray-100">
                      <span className="text-xl">{agent.icon}</span>
                      {agent.name.replace(' Agent', '')}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Status</span>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                          {agent.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Performance</span>
                        <span className="text-sm font-medium text-gray-200">{agent.performance}%</span>
                      </div>
                      <Progress value={agent.performance} className="h-2 bg-gray-700" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="agents" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{agent.icon}</div>
                      <div>
                        <p className="font-medium text-gray-100">{agent.name}</p>
                        <p className="text-sm text-gray-400">{agent.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Running since system startup</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        {agent.status}
                      </Badge>
                      <div className="text-sm text-gray-400">
                        Performance: <span className="text-gray-200 font-medium">{agent.performance}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="threats" className="space-y-4 mt-6">
            <div className="space-y-4">
              {threats.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">⚠️</div>
                      <div>
                        <p className="font-medium text-gray-100">{item.threat}</p>
                        <p className="text-sm text-gray-400">{item.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${item.color} border-current/30 bg-current/10`}
                    >
                      {item.severity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">Threat Intelligence Summary</CardTitle>
                  <CardDescription className="text-gray-400">Latest analysis results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Critical Threats</span>
                    <span className="text-red-400 font-bold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Vulnerabilities</span>
                    <span className="text-orange-400 font-bold">15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mitigations Applied</span>
                    <span className="text-green-400 font-bold">8</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">System Confidence</span>
                    <span className="text-blue-400 font-bold">94%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-100">Agent Performance</CardTitle>
                  <CardDescription className="text-gray-400">Real-time performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Response Time</span>
                    <span className="text-green-400 font-bold">15ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Tasks Completed</span>
                    <span className="text-blue-400 font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-400 font-bold">98.7%</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Inter-Agent Latency</span>
                    <span className="text-purple-400 font-bold">12ms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <div className="flex justify-center">
              <IntelligentChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="terminal" className="mt-6">
            <div className="flex justify-center">
              <AdvancedTerminal />
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8"
            onClick={() => {
              const terminalTab = document.querySelector('[value="terminal"]');
              if (terminalTab) {
                (terminalTab as HTMLElement).click();
              }
            }}
          >
            🖥️ Launch Terminal
          </Button>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8"
            onClick={() => {
              const chatTab = document.querySelector('[value="chat"]');
              if (chatTab) {
                (chatTab as HTMLElement).click();
              }
            }}
          >
            🤖 Chat with AI
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8"
          >
            📊 View Reports
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8"
          >
            ⚙️ System Settings
          </Button>
        </div>
      </main>
    </div>
  );
}