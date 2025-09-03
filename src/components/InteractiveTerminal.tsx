import React, { useState } from 'react';
import { Terminal } from 'react-terminal';

const commands = {
  help: 'Available commands: help, about, skills, contact, clear',
  about: 'Dhruv Prajapati - Penetration Tester & Red Team Specialist',
  skills: 'Skills:\n- Penetration Testing (75/100)\n- Red Teaming (70/100)\n- Cybersecurity (90/100)\n- Python (80/100)\n- Web Security (78/100)',
  contact: 'Email: contact@dhruvprajapati.com\nGitHub: dpraj611\nTwitter: @cyberdhruv',
  clear: 'clear',
};

export default function InteractiveTerminal() {
  const [terminalLineData, setTerminalLineData] = useState([
    { type: 'text', value: 'Welcome to the interactive terminal! Type "help" for available commands.' },
  ]);

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    if (cmd === 'clear') {
      setTerminalLineData([]);
      return;
    }

    const response = commands[cmd as keyof typeof commands] || 'Command not found. Type "help" for available commands.';
    
    setTerminalLineData(prev => [
      ...prev,
      { type: 'input', value: `> ${command}` },
      { type: 'text', value: response }
    ]);
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 overflow-hidden">
      <Terminal
        name="Dhruv's Terminal"
        onInput={handleCommand}
        lineData={terminalLineData}
        theme={{
          background: 'transparent',
          promptSymbol: '>',
          commandColor: '#22d3ee',
          outputColor: '#94a3b8',
          errorOutputColor: '#ef4444',
          fontSize: '14px',
          spacing: '1.5',
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
}