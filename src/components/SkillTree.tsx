import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  connections: string[];
}

const skills: Record<string, Skill> = {
  pentesting: {
    name: "Penetration Testing",
    level: 75,
    icon: "🛠️",
    connections: ["redteam", "websec"]
  },
  redteam: {
    name: "Red Teaming",
    level: 70,
    icon: "🎯",
    connections: ["pentesting", "python"]
  },
  cybersec: {
    name: "Cybersecurity",
    level: 90,
    icon: "🔒",
    connections: ["pentesting", "websec"]
  },
  python: {
    name: "Python",
    level: 80,
    icon: "🐍",
    connections: ["pentesting", "websec"]
  },
  websec: {
    name: "Web Security",
    level: 78,
    icon: "🌐",
    connections: ["pentesting", "python"]
  }
};

export default function SkillTree() {
  return (
    <div className="relative w-full h-[600px] bg-black/30 rounded-lg p-8">
      {Object.entries(skills).map(([key, skill], index) => {
        const angle = (index * 2 * Math.PI) / Object.keys(skills).length;
        const radius = 200;
        const x = radius * Math.cos(angle) + radius;
        const y = radius * Math.sin(angle) + radius;

        return (
          <React.Fragment key={key}>
            {skill.connections.map(connection => {
              const targetSkill = skills[connection];
              const targetIndex = Object.keys(skills).indexOf(connection);
              const targetAngle = (targetIndex * 2 * Math.PI) / Object.keys(skills).length;
              const targetX = radius * Math.cos(targetAngle) + radius;
              const targetY = radius * Math.sin(targetAngle) + radius;

              return (
                <motion.line
                  key={`${key}-${connection}`}
                  x1={x}
                  y1={y}
                  x2={targetX}
                  y2={targetY}
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeOpacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                />
              );
            })}
            <motion.div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-gray-900 p-4 rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all cursor-pointer group">
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-mono text-gray-300 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </div>
                <div className="text-xs font-mono text-cyan-400">{skill.level}/100</div>
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
}