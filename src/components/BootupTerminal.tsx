import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Loader2, Skull, Wifi, Lock, Database, Bug, Cpu, Binary } from 'lucide-react';

interface BootupTerminalProps {
  onComplete: () => void;
}

export default function BootupTerminal({ onComplete }: BootupTerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  const bootSequence = [
    { text: '[*] root@kali:~# ./init.sh', icon: Terminal },
    { text: '[+] Loading system modules...', icon: Binary },
    { text: '[*] Initializing neural network...', icon: Cpu },
    { text: '[+] Establishing quantum tunnels...', icon: Lock },
    { text: '[!] Running security protocols...', icon: Shield },
    { text: '[*] Access granted. Welcome to the matrix.', icon: Skull }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        setCurrentLine(prev => prev + 1);
      } else {
        setShowLoader(false);
        setTimeout(() => onComplete(), 750);
      }
    }, currentLine === bootSequence.length - 1 ? 500 : 200);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0a0a16] flex items-center justify-center p-8"
    >
      <div className="w-full max-w-2xl bg-black/90 rounded-lg border border-cyan-500/30 p-6 font-mono relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-purple-500/30">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-bold tracking-wider">SYSTEM INITIALIZATION</span>
          {showLoader && (
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin ml-auto" />
          )}
        </div>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {lines.map((line, index) => {
              const Icon = bootSequence[index].icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-2 text-sm"
                >
                  <Icon className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                  <span className="text-purple-300 font-jetbrains">{bootSequence[index].text}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-cyan-400"
                  >
                    _
                  </motion.span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/50 via-purple-500 to-cyan-500/50"
        />
      </div>
    </motion.div>
  );
}