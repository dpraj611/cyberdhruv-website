import astraTopology from '@/assets/files_3129713-2026-11-03T20-17-32-868Z-image.webp'
import docksecScreenshot from '@/assets/image.png'
import ghostScreenshot from '@/assets/Screenshot_2026-11-05_003112.png'

// Security-themed imagery from Pexels (license-free, hotlinked)
const img1 = 'https://images.pexels.com/photos/5380603/pexels-photo-5380603.jpeg?auto=compress&cs=tinysrgb&w=1600'
const img2 = 'https://images.pexels.com/photos/37730211/pexels-photo-37730211.jpeg?auto=compress&cs=tinysrgb&w=1600'
const img4 = 'https://images.pexels.com/photos/9951077/pexels-photo-9951077.jpeg?auto=compress&cs=tinysrgb&w=1600'
const breakImg = 'https://images.pexels.com/photos/17489160/pexels-photo-17489160.jpeg?auto=compress&cs=tinysrgb&w=1920'

export interface ProjectContribution {
  code: string
  title: string
  description: string
}

export interface ProjectSpecification {
  value: string
  label: string
}

export interface ProjectMetadata {
  label: string
  value: string
}

export interface ProjectCaseStudy {
  subtitle: string
  role: string
  metaLabel: string
  contributionLabel: string
  contributionIntro: string
  securityTitle: string
  metadata: ProjectMetadata[]
  contributions: ProjectContribution[]
  specifications: ProjectSpecification[]
  considerations: string[]
  workflow?: ProjectContribution[]
  workflowLabel?: string
  workflowIntro?: string
  scope?: string[]
  scopeTitle?: string
  stack: string[]
  repository: string
  repositoryUrl?: string
  projectUrl?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  img: string
  client: string
  deliverables: string[]
  description: string[]
  repositoryUrl?: string
  websiteUrl?: string
  caseStudy?: ProjectCaseStudy
}

export const projects: Project[] = [
  {
    slug: 'astra-runtime',
    title: 'Astra Runtime',
    category: 'Systems Security',
    year: '2026',
    img: astraTopology,
    client: 'KernelArch Labs',
    deliverables: ['Runtime Modules', 'Namespace Isolation', 'eBPF Observability'],
    description: [
      'Engineering capability-based security and isolation in Linux userspace.',
      'Astra Runtime is a C++23 userspace runtime designed to enforce capability-based access control across sandboxed processes on stock Linux, without requiring kernel modifications.',
      'I contributed to six implemented modules within Astras 21-module architecture, working across runtime supervision, Linux namespace isolation, shared-memory IPC, memory allocation, low-level primitives, and eBPF-based observability.',
      'A central engineering challenge was enabling efficient communication between isolated workloads without sacrificing controlled access. Astra addresses this through capability-mediated shared-memory IPC and an epoch-based permission revocation model.',
    ],
    caseStudy: {
      subtitle: 'Capability-Based Linux Runtime & Workload Isolation',
      role: 'Systems Security Intern',
      metaLabel: 'Organization',
      contributionLabel: 'Engineering contributions',
      contributionIntro: 'Six implemented modules within Astra Runtime’s 21-module architecture.',
      securityTitle: 'Design considerations',
      metadata: [
        { label: 'Organization', value: 'KernelArch Labs' },
        { label: 'Role', value: 'Systems Security Intern' },
        { label: 'Domain', value: 'Systems Security' },
        { label: 'Timeline', value: '2026' },
      ],
      contributions: [
        { code: 'M-01', title: 'Core Runtime', description: 'Capability tokens, service registry, event bus, process manager and lifecycle supervision.' },
        { code: 'M-02', title: 'Isolation', description: 'Linux USER, PID and MOUNT namespaces, pivot_root, private mount propagation and tmpfs-based sandboxing.' },
        { code: 'M-03', title: 'IPC Engine', description: 'Shared-memory communication using memfd_create, mmap, a two-phase MPSC ring buffer and futex synchronization.' },
        { code: 'M-06', title: 'Memory Allocator', description: 'Four-tier memory pool routing, poison patterns, double-free detection and capability-gated allocation.' },
        { code: 'M-09', title: 'eBPF Observability', description: 'libbpf integration, USDT probes and ring-buffer event collection.' },
        { code: 'M-21', title: 'Assembly Core', description: 'C++ stubs for low-level primitives including constant-time comparison, secure memory wiping and CPU fencing.' },
      ],
      specifications: [
        { value: '21', label: 'Modules in architecture' },
        { value: '06', label: 'Implemented and tested' },
        { value: '~14K', label: 'Reported C++ lines' },
        { value: '13', label: 'CTest targets reported in project overview' },
      ],
      considerations: [
        'Capability-based access control and permission derivation.',
        'Namespace-based process isolation.',
        'Shared-memory IPC and synchronization.',
        'Epoch-based cascading capability revocation.',
        'Runtime observability through eBPF.',
      ],
      stack: ['C++23', 'Linux Namespaces', 'seccomp', 'eBPF', 'libbpf', 'memfd', 'CMake', 'CTest'],
      repository: 'Open source · KernelArch Labs / Astra',
      repositoryUrl: 'https://github.com/KernelArch-Lab/Astra',
      projectUrl: 'https://www.kernelarch.com/#/astra',
    },
  },
  {
    slug: 'ghostjs-scanner',
    title: 'GhostJS Scanner',
    category: 'Vulnerability Research',
    year: '2026',
    img: ghostScreenshot,
    client: 'Trinet-Layer',
    deliverables: ['Subdomain Enumeration', 'JavaScript Reconnaissance', 'Secret Detection', 'API Endpoint Discovery', 'Exposure Analysis', 'Security Reporting'],
    description: [
      'Mapping the client-side attack surface through automated reconnaissance and vulnerability analysis.',
      'GhostJS is an automated JavaScript attack surface scanner designed to uncover sensitive information and security exposures hidden across client-side assets.',
      'Modern web applications frequently expose API credentials, authentication tokens, internal endpoints, cloud storage references, and sensitive configuration through JavaScript bundles and frontend resources.',
      'GhostJS combines subdomain enumeration, recursive JavaScript crawling, pattern-based detection, and multi-layer validation to identify these exposures across an application’s accessible attack surface.',
      'My work involved engineering the JavaScript analysis pipeline, expanding detection coverage, and improving finding validation to reduce false positives.',
    ],
    caseStudy: {
      subtitle: 'Automated Attack Surface Discovery & Client-Side Security Analysis',
      role: 'Security Engineering Intern — AI & Cybersecurity',
      metaLabel: 'Organization',
      contributionLabel: 'Reconnaissance & analysis pipeline',
      contributionIntro: 'A multi-stage client-side reconnaissance system for discovering, validating, and reporting exposed security findings.',
      securityTitle: 'Security engineering',
      metadata: [
        { label: 'Organization', value: 'TrinetLayer' },
        { label: 'Role', value: 'Security Engineering Intern — AI & Cybersecurity' },
        { label: 'Timeline', value: 'December 2025 – February 2026' },
        { label: 'Domain', value: 'AI & Cybersecurity' },
      ],
      contributions: [
        { code: '01', title: 'Subdomain Enumeration', description: 'Integrates 16 reconnaissance sources alongside certificate transparency logs and passive DNS to discover associated subdomains and expand attack surface visibility.' },
        { code: '02', title: 'Live Host Discovery', description: 'Validates discovered hosts before scanning, supporting IPv4 and IPv6 resolution, including IPv6-only and dual-stack environments.' },
        { code: '03', title: 'JavaScript Discovery', description: 'Recursively crawls JavaScript assets, inline scripts, framework-generated bundles, service workers, and additional discovery paths across live hosts.' },
        { code: '04', title: 'Secret & Exposure Detection', description: 'Scans JavaScript content using 150 detection patterns across 23 categories, identifying exposed API keys, credentials, tokens, private keys, and sensitive endpoints.' },
        { code: '05', title: 'Finding Validation', description: 'Applies Shannon entropy scoring, format validation, false-positive pattern detection, and confidence grading to distinguish potentially sensitive matches from ordinary strings.' },
        { code: '06', title: 'Reporting & Deduplication', description: 'Deduplicates findings across scans, tracks last-seen timestamps, stores validated findings, and generates security reports for further investigation.' },
      ],
      workflow: [
        { code: '01', title: 'Target Domain', description: 'Seed domain supplied as the starting point for reconnaissance.' },
        { code: '02', title: 'Subdomain Enumeration', description: 'Passive sources and certificate transparency expand the reachable attack surface.' },
        { code: '03', title: 'Live Host Validation', description: 'IPv4 and IPv6 resolution confirms reachable targets before scanning.' },
        { code: '04', title: 'JavaScript Discovery', description: 'Recursive crawling finds bundles, inline scripts, service workers, and framework paths.' },
        { code: '05', title: 'Exposure Detection', description: 'Patterns identify secrets, endpoints, storage references, and other client-side exposures.' },
        { code: '06', title: 'Finding Validation', description: 'Entropy, format checks, and confidence grading reduce false positives.' },
        { code: '07', title: 'Security Reports', description: 'Deduplicated findings are stored and prepared for investigation and reporting.' },
      ],
      workflowLabel: 'Reconnaissance & analysis pipeline',
      workflowIntro: 'Target Domain → Subdomain Enumeration → Live Host Validation → JavaScript Discovery → Exposure Detection → Finding Validation → Security Reports',
      specifications: [
        { value: '150', label: 'Detection patterns' },
        { value: '23', label: 'Secret and credential categories' },
        { value: '16', label: 'Reconnaissance sources' },
        { value: '03', label: 'Exposure and discovery detectors' },
        { value: 'IPv4 + IPv6', label: 'Network coverage' },
        { value: '40+', label: 'Framework discovery paths' },
      ],
      considerations: [
        'GhostJS approaches client-side security from an attacker’s perspective: discovering what an application exposes through public-facing assets.',
        'Custom-port scanning beyond standard HTTP and HTTPS ports.',
        'Additional JavaScript asset discovery across associated first-party hosts.',
        'Local JavaScript, TXT, and JSON file scanning.',
        'WAF-aware request shaping for crawling.',
        'Optional AI-assisted obfuscation analysis and finding prioritization.',
        'Slack notifications and PDF security report exports.',
      ],
      scopeTitle: 'Detection capabilities',
      scope: [
        'Cloud and infrastructure secrets across AWS, GCP, Azure, Cloudflare, Supabase, DigitalOcean, and Cloudinary.',
        'SaaS and developer tokens across Slack, Notion, Algolia, Sentry, Linear, Airtable, and Postman.',
        'CI/CD and DevOps credentials across Jenkins, CircleCI, Vercel, Netlify, Terraform, Vault, and Pulumi.',
        'Bearer tokens, JWTs, OAuth access and refresh tokens, generic API keys, and AI or ML credentials.',
        'Hidden administrative, internal, debug, Swagger, and Actuator routes plus cloud storage references.',
        'Base64, hexadecimal, and concatenated secret patterns identified through Ghost AI analysis.',
      ],
      stack: ['JavaScript Analysis', 'Subdomain Enumeration', 'Certificate Transparency', 'Passive DNS', 'Recursive Crawling', 'Entropy Scoring', 'Credential Validation', 'API Attack Surface Discovery', 'IPv4 / IPv6', 'Security Automation'],
      repository: 'TrinetLayer · GhostJS Scanner',
    },
  },
  {
    slug: 'ai-security-automation',
    title: 'LLM-Based Pentesting Lab',
    category: 'AI Security · Offensive Security',
    year: '2025',
    img: img1,
    client: 'Independent Research Lab',
    deliverables: ['LLM-to-Metasploit Integration', 'MCP Tool Orchestration', 'Automated Reconnaissance', 'Exploit Selection', 'Shell Acquisition'],
    description: [
      'Connecting LLM reasoning to real penetration testing infrastructure.',
      'An experimental penetration testing environment exploring how Large Language Models can interact with real offensive security frameworks through natural language instructions.',
      'The project integrates Claude Desktop with Metasploit using the Model Context Protocol and Metasploit RPC, creating a control bridge through which an LLM can initiate reconnaissance, enumerate services, identify potential vulnerabilities, select exploit modules, and execute controlled exploitation workflows.',
      'Unlike simulated demonstrations, the lab operates against a real vulnerable virtual machine inside an isolated, host-only network.',
    ],
    caseStudy: {
      subtitle: 'LLM-Driven Penetration Testing & Metasploit Automation',
      role: 'Independent Research Lab',
      metaLabel: 'Project type',
      contributionLabel: 'Engineering workflow',
      contributionIntro: 'A controlled bridge between LLM reasoning, structured tool calls, and an isolated Metasploit lab.',
      securityTitle: 'Security & authorization',
      metadata: [
        { label: 'Project type', value: 'Independent Research Lab' },
        { label: 'Sector', value: 'AI Security · Offensive Security' },
        { label: 'Year', value: '2025' },
      ],
      contributions: [
        { code: '01', title: 'Isolated Lab Environment', description: 'Configured Kali Linux and Metasploitable2 virtual machines in a VirtualBox host-only network, providing an isolated environment for authorized penetration testing.' },
        { code: '02', title: 'LLM Integration', description: 'Installed Claude Desktop in Kali Linux and configured its MCP connection to the Metasploit MCP server.' },
        { code: '03', title: 'Metasploit RPC Bridge', description: 'Established a local Metasploit RPC service and connected it to the Python-based MCP server, exposing framework operations to the LLM.' },
        { code: '04', title: 'Reconnaissance & Enumeration', description: 'Used natural language instructions to initiate TCP reconnaissance, identify open ports, and enumerate running services and their versions.' },
        { code: '05', title: 'Vulnerability Identification & Exploit Selection', description: 'Demonstrated LLM-assisted identification of a vulnerable FTP service and selection of the corresponding Metasploit exploit module.' },
        { code: '06', title: 'Exploitation & Verification', description: 'Executed the selected module against the isolated target and obtained a remote shell. Verified the resulting session through identity checks, demonstrating root-level access in the lab.' },
      ],
      workflow: [
        { code: '01', title: 'Claude Desktop', description: 'Natural-language LLM interface for initiating authorized testing actions.' },
        { code: '02', title: 'Metasploit MCP Server', description: 'Python MCP layer that exposes structured testing tools to the model.' },
        { code: '03', title: 'Metasploit RPC Daemon', description: 'Local control bridge carrying tool requests into the framework.' },
        { code: '04', title: 'Metasploit Framework', description: 'Reconnaissance, service enumeration, and exploit execution engine.' },
        { code: '05', title: 'Metasploitable2 Target', description: 'Intentionally vulnerable VM contained inside the host-only network.' },
      ],
      workflowLabel: 'LLM-to-Metasploit execution pipeline',
      workflowIntro: 'Claude Desktop (LLM) → Metasploit MCP Server (Python) → Metasploit RPC Daemon → Metasploit Framework → Metasploitable2 Target',
      specifications: [
        { value: 'MCP', label: 'Tool integration protocol' },
        { value: 'RPC', label: 'Framework control interface' },
        { value: 'vsFTPd 2.3.4', label: 'Identified lab service' },
        { value: 'Root shell', label: 'Verified lab outcome' },
        { value: 'Host-only', label: 'Network isolation model' },
      ],
      considerations: [
        'All demonstrations were conducted within a locally controlled, isolated lab environment.',
        'The target was an intentionally vulnerable Metasploitable2 virtual machine.',
        'Reconnaissance, exploit selection, and shell acquisition were performed only against the authorized lab target.',
        'The project is intended for educational research and authorized security testing.',
      ],
      scopeTitle: 'Demonstration',
      scope: [
        'Target: Metasploitable2 virtual machine.',
        'Identified service: vsFTPd 2.3.4.',
        'Selected module: unix/ftp/vsftpd_234_backdoor.',
        'Execution flow: reconnaissance, service enumeration, module selection, controlled exploitation, and whoami verification.',
      ],
      stack: ['Claude Desktop', 'MCP', 'Python', 'Metasploit Framework', 'Metasploit RPC', 'Kali Linux', 'Metasploitable2', 'VirtualBox'],
      repository: 'Open source · GitHub / dpraj611 / llm-based-pentesting',
      repositoryUrl: 'https://github.com/dpraj611/llm-based-pentesting',
      projectUrl: 'https://github.com/dpraj611/llm-based-pentesting',
    },
  },
  {
    slug: 'docksec',
    title: 'DockSec',
    category: 'Container Security',
    year: '2026',
    img: docksecScreenshot,
    client: 'Independent Project',
    deliverables: ['Docker Image Inspection', 'Package Inventory', 'CVE Matching', 'Risk Scoring', 'Security Reports', 'CI/CD Integration'],
    description: [
      'Inspecting container images for known vulnerabilities without executing them.',
      'DockSec is a lightweight Docker image vulnerability scanner built to inspect container filesystems, identify installed system packages, match them against known CVEs, and generate actionable security reports.',
      'The scanner follows a filesystem-based inspection approach. Instead of running potentially untrusted containers, it creates stopped containers, extracts their filesystems, and analyses package metadata directly.',
      'Its workflow combines OS detection, package inventory, CVE matching, severity classification, and risk assessment to help identify vulnerable components before deployment.',
    ],
    caseStudy: {
      subtitle: 'Docker Image Vulnerability Scanner & Security Assessment',
      role: 'Independent Project',
      metaLabel: 'Project type',
      contributionLabel: 'Engineering workflow',
      contributionIntro: 'A filesystem-first pipeline for turning Docker images into actionable security reports.',
      securityTitle: 'Secure execution model',
      metadata: [
        { label: 'Project type', value: 'Independent Project' },
        { label: 'Sector', value: 'Container Security' },
        { label: 'Year', value: '2026' },
      ],
      contributions: [
        { code: '01', title: 'Image Inspection', description: 'Creates temporary stopped containers using Docker and extracts their filesystems for analysis without executing container entrypoints.' },
        { code: '02', title: 'OS Detection', description: 'Identifies supported Linux distributions, including Debian and Alpine, to determine the appropriate package inspection method.' },
        { code: '03', title: 'Package Extraction', description: 'Inventories installed system packages by parsing Debian dpkg and Alpine apk package metadata.' },
        { code: '04', title: 'CVE Matching', description: 'Matches discovered package versions against a curated local CVE dataset, using version-range evaluation to identify known vulnerabilities.' },
        { code: '05', title: 'Risk Assessment', description: 'Classifies vulnerability severity and calculates an overall image risk assessment.' },
        { code: '06', title: 'Security Reporting', description: 'Generates machine-readable JSON and human-readable Markdown reports containing package findings and vulnerability information.' },
      ],
      workflow: [
        { code: '01', title: 'Docker Image', description: 'Input image selected for inspection.' },
        { code: '02', title: 'Filesystem Extraction', description: 'Stopped container created, exported, and removed after analysis.' },
        { code: '03', title: 'OS Detection', description: 'Debian or Alpine package inspection path selected.' },
        { code: '04', title: 'Package Inventory', description: 'dpkg and apk metadata parsed into installed package records.' },
        { code: '05', title: 'CVE Matching', description: 'Versions evaluated against the curated vulnerability dataset.' },
        { code: '06', title: 'Risk Assessment', description: 'Severity classified and overall image exposure calculated.' },
        { code: '07', title: 'Security Reports', description: 'JSON and Markdown findings generated for review and automation.' },
      ],
      workflowLabel: 'Engineering workflow',
      workflowIntro: 'Docker Image → Filesystem Extraction → OS Detection → Package Inventory → CVE Matching → Risk Assessment → Security Reports',
      specifications: [
        { value: 'Python 3.9+', label: 'Implementation language' },
        { value: 'Docker Engine / Docker Desktop', label: 'Container image inspection' },
        { value: 'Debian · Alpine', label: 'Supported operating systems' },
        { value: 'dpkg · apk', label: 'Package metadata extraction' },
        { value: 'JSON · Markdown', label: 'Security report formats' },
        { value: 'CLI', label: 'Scanner interface and execution' },
      ],
      considerations: [
        'Creates containers in a stopped state using docker create.',
        'Extracts image filesystems through docker export.',
        'Parses package metadata directly from extracted filesystem data.',
        'Removes temporary containers after inspection.',
        'Does not execute image entrypoints or runtime processes.',
        'Returns a non-zero exit code when critical vulnerabilities are detected, allowing scans to act as a pipeline gate.',
      ],
      scopeTitle: 'Scope and limitations',
      scope: ['Uses a curated local CVE dataset designed to demonstrate vulnerability matching, version evaluation, and risk scoring.', 'Focuses on operating-system packages rather than application dependencies and does not provide a complete or real-time vulnerability database.', 'An educational security engineering project, not a replacement for production-grade tools such as Trivy or Grype.'],
      stack: ['Python 3.9+', 'Docker', 'Debian', 'Alpine', 'dpkg', 'apk', 'JSON', 'Markdown', 'CLI'],
      repository: 'Open source · GitHub / dpraj611 / docksec',
      repositoryUrl: 'https://github.com/dpraj611/docksec',
      projectUrl: 'https://github.com/dpraj611/docksec',
    },
  },
  {
  "slug": "promptguard",
  "title": "PromptGuard",
  "category": "AI Security",
  "year": "2026",
  "img": "/projects/promptguard.png",
  "client": "Independent Project",
  "repositoryUrl": "https://github.com/dpraj611/promptguard",
  "deliverables": [
    "Input Normalization",
    "Hash Cache",
    "Pattern Scanner",
    "DeBERTa Cascade",
    "Batch Evaluation"
  ],
  "description": [
    "PromptGuard-Cascade detects prompt injection through a CPU-friendly pipeline combining input normalization, cached verdicts, weighted pattern matching, and DeBERTa classifiers.",
    "Inputs pass through progressively more expensive stages, with early exits when a confident verdict is available. Normalization handles Unicode variants, hidden characters, and common encoding techniques before classification.",
    "The saved SafeGuard test report records 91.46% accuracy across 2,060 prompts, with 94.72% precision and 77.23% recall for injection detection. Average latency was 59.7 ms per prompt in that run.",
    "On 116 Deepset test prompts, the saved report records 74.14% accuracy, 94.12% precision, and 53.33% recall, with average latency of 147 ms. These dataset-specific results expose the tradeoff between false alarms and missed attacks.",
    "The Python CLI supports single prompts and CSV batches, producing predictions, confusion matrices, stage counts, and latency reports. Built with PyTorch and Hugging Face transformers."
  ]
},
  {
  "slug": "zayn-clinic",
  "title": "Zayn's Skin & Wellness Clinic",
  "category": "Client · Healthcare",
  "year": "2025",
  "img": "/projects/zayn-site.jpg",
  "client": "Zayn's Skin & Wellness Clinic",
  "repositoryUrl": "https://github.com/dpraj611/zaynskin",
  "websiteUrl": "https://zaynskinclinic.com",
  "deliverables": [
    "Responsive Website",
    "Treatment Pages",
    "Doctor Profiles",
    "Booking Links",
    "Article Library",
    "Netlify Deployment"
  ],
  "description": [
    "A client website for a skin and wellness clinic, helping visitors explore dermatology, hair treatments, weight management, and wellness services.",
    "The React and TypeScript application organizes detailed treatment pages, doctor profiles, FAQs, and an article library through React Router. Tailwind CSS and Framer Motion support the responsive interface and transitions.",
    "Booking calls to action connect visitors with the clinic. Netlify deployment, a sitemap, and crawl directives support ongoing delivery and discovery."
  ]
},
  {
  "slug": "mini-moments",
  "title": "Mini Moments Nursery",
  "category": "Client · Education",
  "year": "2025",
  "img": "/projects/minimoments.png",
  "client": "Mini Moments Nursery",
  "repositoryUrl": "https://github.com/dpraj611/minimoments",
  "websiteUrl": "https://minimomentsnursery.com/",
  "deliverables": [
    "Responsive Website",
    "Curriculum Pages",
    "Nursery Gallery",
    "Parent Information",
    "Netlify Deployment"
  ],
  "description": [
    "A client website for Mini Moments Nursery, giving parents a welcoming introduction to the nursery and its approach to early childhood learning.",
    "Built with React, TypeScript, Vite, and Tailwind CSS, the site presents the nursery curriculum, facilities, and parent information through a responsive experience.",
    "The live website is hosted on Netlify, with source-controlled updates and dedicated pages that help families explore the nursery before getting in touch."
  ]
},
]

export interface Article {
  slug: string
  title: string
  date: string
  tag: string
  img: string
  excerpt: string
  quote: string
  body: string[]
}

export const articles: Article[] = [
  {
    slug: 'runtime-isolation-linux',
    title: 'Runtime isolation in Linux: namespaces, seccomp, and cgroups',
    date: 'Oct 2026',
    tag: 'Systems',
    img: img1,
    excerpt:
      'Linux gives us three powerful isolation primitives, but their security properties depend entirely on how they are composed. Here is what each one actually guarantees.',
    quote: 'Isolation is not a feature you enable — it is a boundary you design, test, and trust only as far as you have verified.',
    body: [
      'Namespaces, seccomp-BPF, and cgroups are often described as the building blocks of container security, but each solves a different problem. Namespaces limit what a process can see. Cgroups limit what it can use. Seccomp limits what it can ask the kernel to do. Real isolation comes from composing all three — and from understanding where each one stops.',
      'In the Astra Runtime project, I worked with all three to build containment for simulated lateral-movement scenarios. The hardest lesson was that namespaces alone do not prevent privilege escalation: a process inside a PID namespace can still call kernel syscalls that reach beyond its namespace. That is where seccomp-BPF becomes essential — it filters syscalls before the kernel acts on them, giving you a second boundary that namespaces cannot provide.',
      'The forensic replay layer was the final piece. By recording syscall sequences during a run, we could replay execution deterministically after an incident and observe exactly which boundary failed. Isolation is not a feature you enable — it is a boundary you design, test, and trust only as far as you have verified.',
    ],
  },
  {
    slug: 'automated-js-analysis',
    title: 'Evaluating automated JavaScript security analysis',
    date: 'Aug 2026',
    tag: 'Research',
    img: img4,
    excerpt:
      'Detection patterns are easy. The hard part is deciding which findings are real — and confidence scoring is where most automated tools quietly fail.',
    quote: 'A detection pattern finds a symptom. Confidence scoring decides whether that symptom is worth investigating.',
    body: [
      'Building GhostJS Scanner meant engineering a pipeline with 148 detection patterns for JavaScript vulnerabilities. Patterns are the easy part — regex and AST traversal catch the obvious sinks. The real challenge is validation: most tools generate hundreds of findings, most of which are false positives, and security engineers stop trusting a tool that cries wolf.',
      'The solution was entropy-based validation. Instead of reporting every pattern match equally, the pipeline scores each finding based on the surrounding context — how much user-controlled data reaches the sink, whether sanitization appears upstream, and how complex the data flow is. Findings with low entropy get suppressed; high-entropy flows surface to the top. This improved analysis accuracy by roughly 40%.',
      'The lesson generalizes beyond JavaScript. A detection pattern finds a symptom. Confidence scoring decides whether that symptom is worth investigating. If your automated tool does not have a defensible scoring mechanism, it is not an analysis tool — it is a noise generator.',
    ],
  },
  {
    slug: 'container-security-adversarial',
    title: 'Container security under adversarial conditions',
    date: 'Jun 2026',
    tag: 'Security',
    img: img2,
    excerpt:
      'Containers feel isolating, but the isolation is thinner than most teams assume. Testing under adversarial conditions reveals where the boundary actually holds.',
    quote: 'A container is a process with a label, not a vault. Test the boundary before you trust it.',
    body: [
      'DockSec started with a simple question: how much isolation does a default container actually provide? The answer, under controlled adversarial testing, was less than most people assume. Default capabilities, seccomp profiles that allow hundreds of syscalls, and shared kernel attack surface all narrow the boundary between container and host.',
      'I tested common misconfigurations — privileged mode, missing seccomp profiles, overly permissive capabilities — and mapped each to a realistic escape or escalation path. The goal was not to exploit in production but to understand failure modes: which configurations hold under pressure and which collapse on first contact with a determined adversary.',
      'The takeaway is practical. A container is a process with a label, not a vault. If you treat it as isolation, you are trusting a boundary you have never tested. The fix is not more layers blindly — it is knowing which layer actually holds under adversarial conditions and configuring it deliberately.',
    ],
  },
  {
    slug: 'ai-security-reliability',
    title: 'Evaluating the reliability of AI-assisted security analysis',
    date: 'Apr 2026',
    tag: 'AI & Security',
    img: breakImg,
    excerpt:
      'Language models can accelerate security analysis, but only if their findings survive verification. Here is how I tested whether they do.',
    quote: 'An AI finding is a hypothesis, not a conclusion. Verify it before you act on it.',
    body: [
      'The promise of AI-assisted security is tempting: feed code to a language model, get a list of vulnerabilities back. In practice, the findings range from genuinely insightful to confidently wrong, and the difficulty is telling which is which. Without a verification layer, AI analysis is a liability dressed as productivity.',
      'I built a controlled test set of known vulnerabilities and clean code, then ran model-generated analysis against it. The false-positive rate was high enough to erode trust quickly — the model often described plausible-looking issues that did not hold up under manual review. The most useful pattern was to treat each AI finding as a hypothesis: the model proposes, an automated validator checks evidence, and only findings with corroborating signals reach the security engineer.',
      'AI does not replace security analysis. It accelerates the early triage if, and only if, you keep findings grounded in technical evidence and subject them to verification. An AI finding is a hypothesis, not a conclusion. The engineers who get value from these tools are the ones who build the verification pipeline first and the model integration second.',
    ],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
export const nextProject = (slug: string) =>
  projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length]
export const nextArticle = (slug: string) =>
  articles[(articles.findIndex((a) => a.slug === slug) + 1) % articles.length]
