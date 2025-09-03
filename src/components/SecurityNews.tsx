import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  link: string;
}

const dummyNews: NewsItem[] = [
  {
    title: "New Zero-Day Vulnerability Discovered",
    description: "Critical vulnerability found in popular software affecting millions of users.",
    link: "#"
  },
  {
    title: "Latest Cybersecurity Trends 2025",
    description: "AI-powered attacks on the rise, new defense mechanisms emerging.",
    link: "#"
  },
  {
    title: "Major Data Breach Alert",
    description: "Fortune 500 company experiences sophisticated cyber attack.",
    link: "#"
  }
];

export default function SecurityNews() {
  const [news, setNews] = useState<NewsItem[]>(dummyNews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-cyan-500/30 p-6">
      <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Security News Feed
      </h3>
      <div className="relative h-32">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <h4 className="text-lg font-mono text-cyan-400 mb-2">{news[currentIndex].title}</h4>
          <p className="text-sm text-gray-400 mb-4">{news[currentIndex].description}</p>
          <a
            href={news[currentIndex].link}
            className="inline-flex items-center text-sm text-purple-400 hover:text-cyan-400 transition-colors"
          >
            Read More <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}