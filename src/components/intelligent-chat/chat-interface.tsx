"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  metadata?: {
    confidence?: number;
    source?: string;
    type?: string;
  };
}

interface AIResponse {
  message: string;
  confidence: number;
  source: string;
  suggestions?: string[];
}

export default function IntelligentChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to DeepGaza AI Assistant. I can help you with threat analysis, vulnerability assessment, and cybersecurity questions.',
      timestamp: new Date(),
      metadata: { confidence: 1.0, source: 'system', type: 'welcome' }
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response for demo
  const generateAIResponse = async (userMessage: string): Promise<AIResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    const responses = {
      'threat': {
        message: 'I\'ve analyzed current threat intelligence. There are 12 active threats detected, including 3 critical-severity ransomware campaigns targeting healthcare systems. The Emerging Threats Agent has identified new IOCs and attack patterns.',
        confidence: 0.92,
        source: 'emerging-threats-agent',
        suggestions: ['Show detailed threat report', 'Run vulnerability scan', 'Update defense policies']
      },
      'vulnerability': {
        message: 'Based on the latest vulnerability scans, I found 15 high-priority vulnerabilities across your infrastructure. The Adaptive Pentesting Agent has confirmed 8 of these are actively exploitable.',
        confidence: 0.87,
        source: 'adaptive-pentesting-agent',
        suggestions: ['Generate remediation plan', 'Schedule penetration test', 'Export vulnerability report']
      },
      'plugin': {
        message: 'The Plugin Development Agent can create custom security tools for your specific needs. I can generate plugins for log analysis, network monitoring, or custom threat detection.',
        confidence: 0.94,
        source: 'plugin-development-agent',
        suggestions: ['Create new plugin', 'List available plugins', 'Update existing plugins']
      },
      'simulation': {
        message: 'The Attack Simulation Agent has run 23 attack scenarios this week. Current success rate against your defenses is 34%, with most successful attacks using social engineering vectors.',
        confidence: 0.89,
        source: 'attack-simulation-agent',
        suggestions: ['Run new simulation', 'View simulation results', 'Update attack scenarios']
      },
      'default': {
        message: 'I understand you\'re asking about cybersecurity. I\'m connected to all 6 specialized agents and can help with threat analysis, vulnerability assessment, plugin development, penetration testing, attack simulation, and zero-day research.',
        confidence: 0.85,
        source: 'deepgaza-core',
        suggestions: ['Ask about current threats', 'Request vulnerability scan', 'Generate security report']
      }
    };

    const messageKey = Object.keys(responses).find(key => 
      userMessage.toLowerCase().includes(key)
    ) as keyof typeof responses || 'default';

    return responses[messageKey];
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: new Date(),
        metadata: {
          confidence: aiResponse.confidence,
          source: aiResponse.source
        }
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Add suggestions if available
      if (aiResponse.suggestions && aiResponse.suggestions.length > 0) {
        const suggestionsMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'system',
          content: `Suggestions: ${aiResponse.suggestions.join(' • ')}`,
          timestamp: new Date(),
          metadata: {
            type: 'suggestions',
            source: aiResponse.source
          }
        };
        
        setTimeout(() => {
          setMessages(prev => [...prev, suggestionsMessage]);
        }, 500);
      }

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        metadata: {
          type: 'error',
          source: 'system'
        }
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (message: ChatMessage) => {
    if (message.role === 'user') return '👤';
    if (message.metadata?.type === 'error') return '❌';
    if (message.metadata?.type === 'suggestions') return '💡';
    if (message.metadata?.source === 'emerging-threats-agent') return '🔍';
    if (message.metadata?.source === 'adaptive-pentesting-agent') return '🎯';
    if (message.metadata?.source === 'plugin-development-agent') return '🔧';
    return '🤖';
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-400';
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-800/50 border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-green-400">
          <div className="flex items-center gap-2">
            🤖 DeepGaza AI Assistant
            <Badge variant="outline" className={`${isConnected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          <div className="text-sm text-gray-400">
            {messages.length - 1} messages
          </div>
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
            🔍 Emerging Threats
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
            🛡️ Defense Adaptation  
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
            🎯 Penetration Testing
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
            🔧 Plugin Development
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ScrollArea className="h-96 w-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                  {getMessageIcon(message)}
                </div>
                
                <div className={`flex-1 space-y-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.metadata?.type === 'error'
                        ? 'bg-red-900/50 text-red-300 border border-red-700'
                        : message.metadata?.type === 'suggestions'
                        ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                  
                  <div className={`text-xs text-gray-400 flex items-center gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.metadata?.source && (
                      <span className="text-gray-500">• {message.metadata.source}</span>
                    )}
                    {message.metadata?.confidence && (
                      <span className={getConfidenceColor(message.metadata.confidence)}>
                        • {Math.round(message.metadata.confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-gray-700">
                    <div className="flex items-center gap-2 text-gray-300">
                      <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                      <span className="text-sm">AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <Separator className="bg-gray-700" />
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about threats, vulnerabilities, or security analysis..."
            disabled={isLoading}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            {isLoading ? (
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              'Send'
            )}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Show me current threats')}
            className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isLoading}
          >
            Current Threats
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Run vulnerability assessment')}
            className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isLoading}
          >
            Vulnerability Scan
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Generate security report')}
            className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isLoading}
          >
            Security Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Help me create a custom plugin')}
            className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isLoading}
          >
            Create Plugin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}