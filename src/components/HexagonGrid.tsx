import React from 'react';
import { motion } from 'framer-motion';

const HexagonGrid = () => {
  const hexagons = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hexagons.map((i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          <div className="w-full h-full border-2 border-cyan-400/20 rotate-45 transform-gpu" />
        </motion.div>
      ))}
    </div>
  );
};

export default HexagonGrid;