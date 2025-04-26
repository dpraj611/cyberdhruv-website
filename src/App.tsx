import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Shield, Code, Bug, Globe, Radar, Webhook, Network, FileSearch, Fingerprint } from 'lucide-react';
import BootupTerminal from './components/BootupTerminal';
import MatrixBackground from './components/MatrixBackground';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showIntro, setShowIntro] = useState(true);
  const [nameReveal, setNameReveal] = useState('');
  const [titleReveal, setTitleReveal] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: string) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      tools: toolsRef,
      contact: contactRef
    };
    
    refs[section as keyof typeof refs]?.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef, aboutRef, toolsRef, contactRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    const fullName = 'Dhruv Prajapati';
    const titles = [
      'Penetration Tester',
      'Cybersecurity Specialist',
      'Red Team Expert',
      'Security Researcher'
    ];
    let currentTitle = 0;
    let nameIndex = 0;
    let titleIndex = 0;

    const scrambleText = (text: string, index: number) => {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < index) {
          result += text[i];
        } else if (i === index) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += ' ';
        }
      }
      return result;
    };

    const nameInterval = setInterval(() => {
      if (nameIndex <= fullName.length) {
        setNameReveal(scrambleText(fullName, nameIndex));
        nameIndex++;
      } else {
        clearInterval(nameInterval);
      }
    }, 100);

    const titleInterval = setInterval(() => {
      const currentTitleText = titles[currentTitle];
      
      if (titleIndex <= currentTitleText.length) {
        setTitleReveal(scrambleText(currentTitleText, titleIndex));
        titleIndex++;
      } else {
        setTimeout(() => {
          titleIndex = 0;
          currentTitle = (currentTitle + 1) % titles.length;
        }, 2000);
      }
    }, 100);

    return () => {
      clearInterval(nameInterval);
      clearInterval(titleInterval);
    };
  }, []);

  const handleBootupComplete = () => {
    setShowIntro(false);
  };

  const certifications = [
    "Google Cybersecurity Professional Certificate",
    "TryHackMe Top 1%",
    "CEH (In Progress)",
    "OSCP (Aspirant)"
  ];

  const skills = [
    {
      name: "Penetration Testing",
      level: 75,
      description: "",
      icon: <Bug className="w-5 h-5 text-red-400" />
    },
    {
      name: "Cybersecurity Fundamentals",
      level: 90,
      description: "",
      icon: <Shield className="w-5 h-5 text-green-400" />
    },
    {
      name: "Python for Security & Automation",
      level: 80,
      description: "",
      icon: <Code className="w-5 h-5 text-cyan-400" />
    },
    {
      name: "Web Application Security",
      level: 78,
      description: "",
      icon: <Globe className="w-5 h-5 text-purple-400" />
    }
  ];

  const securityTools = [
    {
      category: "Reconnaissance",
      icon: <Radar className="w-8 h-8 text-cyan-400" />,
      tools: [
        { name: "Nmap", description: "Network scanning and host discovery" },
        { name: "Shodan", description: "Internet-connected device search engine" },
        { name: "theHarvester", description: "OSINT gathering tool" }
      ]
    },
    {
      category: "Web Security",
      icon: <Webhook className="w-8 h-8 text-purple-400" />,
      tools: [
        { name: "Burp Suite", description: "Web vulnerability scanner and proxy" },
        { name: "OWASP ZAP", description: "Security testing for web applications" },
        { name: "Nikto", description: "Web server scanner" }
      ]
    },
    {
      category: "Network Analysis",
      icon: <Network className="w-8 h-8 text-green-400" />,
      tools: [
        { name: "Wireshark", description: "Network protocol analyzer" },
        { name: "tcpdump", description: "Command-line packet analyzer" },
        { name: "Netcat", description: "Networking utility for reading/writing data" }
      ]
    },
    {
      category: "Exploitation",
      icon: <Bug className="w-8 h-8 text-red-400" />,
      tools: [
        { name: "Metasploit", description: "Penetration testing framework" },
        { name: "SQLmap", description: "Automatic SQL injection tool" },
        { name: "Hydra", description: "Password cracking and brute-forcing" }
      ]
    },
    {
      category: "Forensics",
      icon: <FileSearch className="w-8 h-8 text-yellow-400" />,
      tools: [
        { name: "Volatility", description: "Memory forensics framework" },
        { name: "Autopsy", description: "Digital forensics platform" },
        { name: "dd", description: "Disk imaging and analysis" }
      ]
    },
    {
      category: "Post Exploitation",
      icon: <Fingerprint className="w-8 h-8 text-orange-400" />,
      tools: [
        { name: "Mimikatz", description: "Credential dumping and PTH attacks" },
        { name: "Empire", description: "Post-exploitation framework" },
        { name: "Bloodhound", description: "Active Directory visualization tool" }
      ]
    }
  ];

  if (showIntro) {
    return <BootupTerminal onComplete={handleBootupComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black text-gray-100"
      >
        <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-purple-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center group cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <Shield className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <div className="ml-2 text-lg font-pixel text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  DP
                </div>
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 p-2 rounded-lg"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>

              {/* Desktop navigation */}
              <div className="hidden md:flex space-x-8">
                {['home', 'about', 'tools', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-sm font-pixel relative group ${
                      activeSection === section ? 'text-cyan-400' : 'text-gray-300'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                      activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-lg mt-2">
                    {['home', 'about', 'tools', 'contact'].map((section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-base font-pixel ${
                          activeSection === section
                            ? 'text-cyan-400 bg-cyan-400/10'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <section ref={homeRef} id="home" className="relative min-h-screen flex items-center">
          <MatrixBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glitch-container mb-6">
                <h1 className="text-3xl md:text-5xl font-pixel mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                    {nameReveal}
                  </span>
                </h1>
                <h2 className="text-xl md:text-2xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-500 to-cyan-500">
                  {titleReveal}
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-400 font-mono mt-8 mb-8">Breaking systems to make them stronger.</p>
              <div className="flex justify-center space-x-6">
                <a href="https://github.com/dpraj611" target="_blank" rel="noopener noreferrer" 
                  className="social-icon-link">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://x.com/cyberdhruv" target="_blank" rel="noopener noreferrer" 
                  className="social-icon-link">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/dpraj" target="_blank" rel="noopener noreferrer" 
                  className="social-icon-link">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={aboutRef} id="about" className="py-16 px-4 bg-gradient-to-b from-black via-[#0a0a16] to-black relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-pixel mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-300 leading-relaxed mb-6 font-mono">
                    Hey, I'm Dhruv Prajapati, a cybersecurity enthusiast specializing in penetration testing & red teaming. 
                    I break into systems (ethically, of course) and test security defenses, always staying ahead of the curve.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6 font-mono">
                    Currently, I'm mastering ethical hacking, vulnerability research, and exploit development, 
                    aiming for CEH & OSCP certifications. I also dive deep into bug bounty hunting, CTFs, 
                    and cybersecurity research.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    I believe in breaking things to make them stronger—because true security is built from the wreckage of vulnerabilities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-pixel mb-6 text-purple-400">Skills & Expertise</h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-900/50 p-4 rounded-lg border border-purple-900/30 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-center mb-2">
                          {skill.icon}
                          <span className="text-gray-300 font-mono ml-2">{skill.name}</span>
                          <span className="text-cyan-400 font-mono ml-auto">{skill.level}/100</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <h3 className="text-xl font-pixel mb-4 mt-8 text-purple-400">Certifications</h3>
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center text-gray-300 font-mono"
                      >
                        <Shield className="w-5 h-5 text-cyan-400 mr-3" />
                        {cert}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={toolsRef} id="tools" className="py-16 px-4 bg-gradient-to-b from-black via-[#0a0a16] to-black relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-pixel mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Security Arsenal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {securityTools.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-900/50 p-6 rounded-lg border border-purple-900/30 hover:border-cyan-500/30"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-cyan-400">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-pixel ml-3 text-purple-400">{category.category}</h3>
                    </div>
                    <ul className="space-y-4">
                      {category.tools.map((tool, toolIndex) => (
                        <motion.li
                          key={toolIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: toolIndex * 0.1 }}
                          className="text-gray-300"
                        >
                          <span className="font-mono text-cyan-400">{tool.name}</span>
                          <p className="text-sm text-gray-400 mt-1">{tool.description}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={contactRef} id="contact" className="py-16 px-4 bg-gradient-to-b from-black via-[#0a0a16] to-black relative min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-pixel mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-8 font-mono">
                Interested in collaborating or have a security project in mind? Let's connect!
              </p>
              <motion.a
                href="mailto:contact@dhruvprajapati.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-black rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all font-pixel"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </motion.a>
            </motion.div>
          </div>
        </section>

        <footer className="py-8 px-4 border-t border-purple-900/50">
          <div className="max-w-7xl mx-auto text-center text-gray-400 font-pixel">
            <p>© {new Date().getFullYear()} Dhruv Prajapati. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default App