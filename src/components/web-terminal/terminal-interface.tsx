"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalCommand {
  id: string;
  command: string;
  output: string[];
  exitCode: number;
  timestamp: Date;
  duration: number;
  validated: boolean;
}

interface TerminalSession {
  id: string;
  workingDirectory: string;
  environment: Record<string, string>;
  history: TerminalCommand[];
  status: 'active' | 'inactive' | 'error';
}

export default function AdvancedTerminal() {
  const [session, setSession] = useState<TerminalSession>({
    id: 'session_' + Date.now(),
    workingDirectory: '/home/deepgaza',
    environment: {
      USER: 'deepgaza-admin',
      HOME: '/home/deepgaza',
      PATH: '/usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin',
      SHELL: '/bin/bash',
      TERM: 'xterm-256color'
    },
    history: [],
    status: 'active'
  });

  const [currentInput, setCurrentInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Available commands for the cybersecurity terminal
  const availableCommands = {
    'help': {
      description: 'Show available commands',
      usage: 'help [command]',
      category: 'system'
    },
    'nmap': {
      description: 'Network exploration and security auditing',
      usage: 'nmap [options] target',
      category: 'scanning'
    },
    'nikto': {
      description: 'Web server vulnerability scanner',
      usage: 'nikto -h target',
      category: 'scanning'
    },
    'metasploit': {
      description: 'Penetration testing framework',
      usage: 'msfconsole',
      category: 'exploitation'
    },
    'sqlmap': {
      description: 'SQL injection detection and exploitation',
      usage: 'sqlmap -u URL',
      category: 'exploitation'
    },
    'wireshark': {
      description: 'Network protocol analyzer',
      usage: 'wireshark [interface]',
      category: 'analysis'
    },
    'burpsuite': {
      description: 'Web application security testing',
      usage: 'burpsuite',
      category: 'analysis'
    },
    'agent-status': {
      description: 'Show status of all DeepGaza agents',
      usage: 'agent-status [agent-name]',
      category: 'deepgaza'
    },
    'threat-intel': {
      description: 'Query threat intelligence database',
      usage: 'threat-intel [query]',
      category: 'deepgaza'
    },
    'vuln-scan': {
      description: 'Start vulnerability scan',
      usage: 'vuln-scan target [options]',
      category: 'deepgaza'
    },
    'plugin-gen': {
      description: 'Generate security plugin',
      usage: 'plugin-gen [type] [name]',
      category: 'deepgaza'
    },
    'clear': {
      description: 'Clear terminal screen',
      usage: 'clear',
      category: 'system'
    },
    'ls': {
      description: 'List directory contents',
      usage: 'ls [options] [directory]',
      category: 'filesystem'
    },
    'pwd': {
      description: 'Print working directory',
      usage: 'pwd',
      category: 'filesystem'
    },
    'cd': {
      description: 'Change directory',
      usage: 'cd [directory]',
      category: 'filesystem'
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.history]);

  // Execute command simulation
  const executeCommand = async (command: string): Promise<{ output: string[]; exitCode: number; duration: number }> => {
    const startTime = Date.now();
    
    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    const args = command.trim().split(' ');
    const cmd = args[0];
    
    let output: string[] = [];
    let exitCode = 0;

    switch (cmd) {
      case 'help':
        if (args[1] && availableCommands[args[1] as keyof typeof availableCommands]) {
          const cmdInfo = availableCommands[args[1] as keyof typeof availableCommands];
          output = [
            `Command: ${args[1]}`,
            `Description: ${cmdInfo.description}`,
            `Usage: ${cmdInfo.usage}`,
            `Category: ${cmdInfo.category}`
          ];
        } else {
          output = [
            'DeepGaza Cybersecurity Terminal - Available Commands:',
            '',
            'SYSTEM COMMANDS:',
            '  help              - Show this help message',
            '  clear             - Clear terminal screen',
            '  pwd               - Print working directory',
            '  ls                - List directory contents',
            '  cd                - Change directory',
            '',
            'DEEPGAZA COMMANDS:',
            '  agent-status      - Show status of all agents',
            '  threat-intel      - Query threat intelligence',
            '  vuln-scan         - Start vulnerability scan',
            '  plugin-gen        - Generate security plugin',
            '',
            'SECURITY TOOLS:',
            '  nmap              - Network scanning',
            '  nikto             - Web vulnerability scanning',
            '  sqlmap            - SQL injection testing',
            '  metasploit        - Exploitation framework',
            '  wireshark         - Network analysis',
            '  burpsuite         - Web app security testing',
            '',
            'Type "help [command]" for detailed usage information.'
          ];
        }
        break;

      case 'clear':
        // Clear will be handled by the calling function
        output = [];
        break;

      case 'pwd':
        output = [session.workingDirectory];
        break;

      case 'ls':
        output = [
          'drwxr-xr-x  3 deepgaza deepgaza  4096 Jan 15 10:30 agents/',
          'drwxr-xr-x  2 deepgaza deepgaza  4096 Jan 15 10:28 config/',
          'drwxr-xr-x  4 deepgaza deepgaza  4096 Jan 15 10:25 logs/',
          'drwxr-xr-x  2 deepgaza deepgaza  4096 Jan 15 10:22 plugins/',
          'drwxr-xr-x  3 deepgaza deepgaza  4096 Jan 15 10:20 reports/',
          '-rw-r--r--  1 deepgaza deepgaza  2048 Jan 15 10:35 system.log',
          '-rw-r--r--  1 deepgaza deepgaza  1024 Jan 15 10:32 threats.json'
        ];
        break;

      case 'agent-status':
        if (args[1]) {
          output = [
            `Agent: ${args[1]}`,
            'Status: Active',
            'Performance: 94%',
            'Last Active: 2025-01-15 10:35:22',
            'Tasks Completed: 247',
            'Memory Usage: 128 MB',
            'CPU Usage: 12%'
          ];
        } else {
          output = [
            'DeepGaza Agent Status Summary:',
            '',
            '🔍 Emerging Threats Agent     - ACTIVE  (95% performance)',
            '🛡️ Defense Adaptation Agent  - ACTIVE  (87% performance)', 
            '🔧 Plugin Development Agent  - ACTIVE  (78% performance)',
            '🎯 Adaptive Pentesting Agent - ACTIVE  (92% performance)',
            '⚔️ Attack Simulation Agent   - ACTIVE  (89% performance)',
            '🧬 Zero-Day Analysis Agent   - ACTIVE  (91% performance)',
            '',
            'System Overall Performance: 88.7%',
            'Inter-Agent Communication Latency: 12ms',
            'Total Tasks Completed: 1,247'
          ];
        }
        break;

      case 'threat-intel':
        output = [
          'Latest Threat Intelligence Summary:',
          '',
          'CRITICAL THREATS:',
          '  • Ransomware campaign targeting healthcare (Confidence: 94%)',
          '  • Zero-day exploit in web framework (Confidence: 89%)',
          '  • APT group using new malware variant (Confidence: 76%)',
          '',
          'HIGH PRIORITY:',
          '  • Phishing campaign with AI-generated emails (Confidence: 82%)',
          '  • Cryptojacking malware spreading via USB (Confidence: 71%)',
          '',
          'IOCs identified: 127',
          'New vulnerabilities: 15',
          'Last update: 2025-01-15 10:33:45'
        ];
        break;

      case 'vuln-scan':
        const target = args[1] || 'localhost';
        output = [
          `Starting vulnerability scan on ${target}...`,
          '',
          'Scan Progress: [████████████████████] 100%',
          '',
          'VULNERABILITIES FOUND:',
          '  • CVE-2024-12345 - Remote Code Execution (Critical)',
          '  • CVE-2024-12346 - SQL Injection (High)',
          '  • CVE-2024-12347 - XSS Vulnerability (Medium)',
          '',
          'Scan completed in 45 seconds',
          'Report saved to /home/deepgaza/reports/vuln_scan_' + Date.now() + '.json'
        ];
        break;

      case 'plugin-gen':
        const pluginType = args[1] || 'scanner';
        const pluginName = args[2] || 'custom_plugin';
        output = [
          `Generating ${pluginType} plugin: ${pluginName}`,
          '',
          'Plugin Development Agent Processing...',
          'Analyzing requirements... ✓',
          'Generating code structure... ✓',
          'Creating security validations... ✓',
          'Compiling plugin... ✓',
          'Running security tests... ✓',
          '',
          `Plugin "${pluginName}" created successfully!`,
          'Location: /home/deepgaza/plugins/' + pluginName + '.plugin',
          'To activate: plugin-activate ' + pluginName
        ];
        break;

      case 'nmap':
        const nmapTarget = args[args.indexOf('-') !== -1 ? args.length - 1 : 1] || '192.168.1.1';
        output = [
          `Starting Nmap scan on ${nmapTarget}...`,
          '',
          'Nmap scan report for ' + nmapTarget,
          'Host is up (0.0012s latency).',
          '',
          'PORT     STATE SERVICE',
          '22/tcp   open  ssh',
          '80/tcp   open  http',
          '443/tcp  open  https',
          '3306/tcp open  mysql',
          '',
          'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds'
        ];
        break;

      case 'nikto':
        const webTarget = args[args.indexOf('-h') + 1] || 'example.com';
        output = [
          `Starting Nikto scan on ${webTarget}...`,
          '',
          'Nikto v2.5.0',
          '---------------------------------------------------------------------------',
          '+ Target IP:          192.168.1.100',
          '+ Target Hostname:    ' + webTarget,
          '+ Target Port:        80',
          '+ Start Time:         ' + new Date().toLocaleString(),
          '',
          '+ Server: Apache/2.4.41',
          '+ Retrieved x-powered-by header: PHP/7.4.3',
          '+ The anti-clickjacking X-Frame-Options header is not present.',
          '+ No CGI Directories found (use \'-C all\' to force check all possible dirs)',
          '',
          '+ 2 host(s) tested'
        ];
        break;

      default:
        if (cmd.trim() === '') {
          output = [];
        } else {
          output = [`Command not found: ${cmd}`, 'Type "help" for available commands.'];
          exitCode = 127;
        }
    }

    const duration = Date.now() - startTime;
    return { output, exitCode, duration };
  };

  const handleCommandSubmit = async () => {
    if (!currentInput.trim() || isExecuting) return;

    const command = currentInput.trim();
    setCurrentInput('');
    setIsExecuting(true);

    // Add to history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);

    // Handle clear command specially
    if (command === 'clear') {
      setSession(prev => ({
        ...prev,
        history: []
      }));
      setIsExecuting(false);
      return;
    }

    // Execute command
    try {
      const result = await executeCommand(command);
      
      const newCommand: TerminalCommand = {
        id: Date.now().toString(),
        command,
        output: result.output,
        exitCode: result.exitCode,
        timestamp: new Date(),
        duration: result.duration,
        validated: true
      };

      setSession(prev => ({
        ...prev,
        history: [...prev.history, newCommand]
      }));
    } catch (error) {
      const errorCommand: TerminalCommand = {
        id: Date.now().toString(),
        command,
        output: ['Error: Command execution failed'],
        exitCode: 1,
        timestamp: new Date(),
        duration: 0,
        validated: false
      };

      setSession(prev => ({
        ...prev,
        history: [...prev.history, errorCommand]
      }));
    } finally {
      setIsExecuting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for commands
      const partial = currentInput.toLowerCase();
      const matches = Object.keys(availableCommands).filter(cmd => cmd.startsWith(partial));
      if (matches.length === 1) {
        setCurrentInput(matches[0] + ' ');
      }
    }
  };

  const getPromptColor = () => {
    return session.status === 'active' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-black/90 border-green-500/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-green-400">
          <div className="flex items-center gap-2">
            🖥️ DeepGaza Security Terminal
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              {session.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Session: {session.id.split('_')[1]}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSession(prev => ({ ...prev, history: [] }))}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
            >
              Clear
            </Button>
          </div>
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>User: {session.environment.USER}</span>
          <span>Shell: {session.environment.SHELL}</span>
          <span>PWD: {session.workingDirectory}</span>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96 w-full font-mono text-sm">
          <div className="space-y-2">
            {session.history.map((cmd) => (
              <div key={cmd.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={getPromptColor()}>
                    {session.environment.USER}@deepgaza:{session.workingDirectory}$
                  </span>
                  <span className="text-white">{cmd.command}</span>
                  <span className="text-xs text-gray-500">
                    ({cmd.duration}ms)
                  </span>
                </div>
                {cmd.output.map((line, index) => (
                  <div key={index} className="text-gray-300 pl-4">
                    {line}
                  </div>
                ))}
                {cmd.exitCode !== 0 && (
                  <div className="text-red-400 text-xs pl-4">
                    Exit code: {cmd.exitCode}
                  </div>
                )}
              </div>
            ))}
            
            {isExecuting && (
              <div className="flex items-center gap-2">
                <span className={getPromptColor()}>
                  {session.environment.USER}@deepgaza:{session.workingDirectory}$
                </span>
                <span className="text-white">{currentInput}</span>
                <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
              </div>
            )}
            
            <div ref={terminalEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 flex items-center gap-2 font-mono text-sm">
          <span className={getPromptColor()}>
            {session.environment.USER}@deepgaza:{session.workingDirectory}$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isExecuting}
            className="flex-1 bg-transparent text-white outline-none disabled:opacity-50"
            placeholder={isExecuting ? "Executing..." : "Enter command..."}
          />
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Press Tab for command completion, ↑/↓ for command history, Enter to execute
        </div>
      </CardContent>
    </Card>
  );
}