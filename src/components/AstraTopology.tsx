import { useMemo, useState, type KeyboardEvent } from 'react'

type ModuleStatus = 'built' | 'reserved'
type Layer = 'Core' | 'Services' | 'Security' | 'Intelligence' | 'Application' | 'Infrastructure'

type AstraModule = {
  id: string
  name: string
  description: string
  status: ModuleStatus
  layer: Layer
  x: number
  y: number
}

type Dependency = {
  from: string
  to: string
}

const modules: AstraModule[] = [
  { id: 'M-01', name: 'Core Runtime', description: 'Capability tokens, services, events, and process supervision.', status: 'built', layer: 'Core', x: 290, y: 112 },
  { id: 'M-21', name: 'ASM Core', description: 'Low-level primitives and constant-time operations.', status: 'built', layer: 'Core', x: 500, y: 112 },
  { id: 'M-02', name: 'Isolation', description: 'Linux namespaces and sandbox boundaries.', status: 'built', layer: 'Services', x: 120, y: 222 },
  { id: 'M-03', name: 'IPC Engine', description: 'Capability-mediated shared-memory communication.', status: 'built', layer: 'Services', x: 315, y: 222 },
  { id: 'M-06', name: 'Allocator', description: 'Capability-gated memory pool routing.', status: 'built', layer: 'Services', x: 545, y: 222 },
  { id: 'M-09', name: 'eBPF Observability', description: 'USDT probes and ring-buffer collection.', status: 'built', layer: 'Services', x: 760, y: 222 },
  { id: 'M-04', name: 'Checkpoint', description: 'State snapshots and restore boundaries.', status: 'reserved', layer: 'Security', x: 120, y: 342 },
  { id: 'M-05', name: 'Replay', description: 'Deterministic execution replay.', status: 'reserved', layer: 'Security', x: 315, y: 342 },
  { id: 'M-12', name: 'Verify', description: 'Capability and evidence verification.', status: 'reserved', layer: 'Security', x: 545, y: 342 },
  { id: 'M-08', name: 'AI Scheduler', description: 'Policy-aware scheduling intelligence.', status: 'reserved', layer: 'Intelligence', x: 120, y: 462 },
  { id: 'M-16', name: 'HAL', description: 'Hardware abstraction layer.', status: 'reserved', layer: 'Intelligence', x: 315, y: 462 },
  { id: 'M-17', name: 'Profiler', description: 'Runtime performance profiling.', status: 'reserved', layer: 'Intelligence', x: 545, y: 462 },
  { id: 'M-07', name: 'Job Engine', description: 'Application job execution.', status: 'reserved', layer: 'Application', x: 70, y: 582 },
  { id: 'M-10', name: 'WASM', description: 'WebAssembly workload support.', status: 'reserved', layer: 'Application', x: 250, y: 582 },
  { id: 'M-11', name: 'AQL', description: 'Astra query language.', status: 'reserved', layer: 'Application', x: 430, y: 582 },
  { id: 'M-15', name: 'Consensus', description: 'Distributed coordination.', status: 'reserved', layer: 'Application', x: 610, y: 582 },
  { id: 'M-13', name: 'Network', description: 'Network transport primitives.', status: 'reserved', layer: 'Infrastructure', x: 70, y: 702 },
  { id: 'M-14', name: 'VFS', description: 'Virtual filesystem interface.', status: 'reserved', layer: 'Infrastructure', x: 250, y: 702 },
  { id: 'M-18', name: 'Crypto', description: 'Cryptographic service boundary.', status: 'reserved', layer: 'Infrastructure', x: 430, y: 702 },
  { id: 'M-19', name: 'Virtual Time', description: 'Deterministic clock service.', status: 'reserved', layer: 'Infrastructure', x: 610, y: 702 },
  { id: 'M-20', name: 'Module Loader', description: 'Runtime module loading.', status: 'reserved', layer: 'Infrastructure', x: 790, y: 702 },
]

const dependencies: Dependency[] = [
  { from: 'M-01', to: 'M-21' },
  { from: 'M-02', to: 'M-01' }, { from: 'M-03', to: 'M-01' }, { from: 'M-06', to: 'M-01' }, { from: 'M-09', to: 'M-01' },
  { from: 'M-04', to: 'M-02' }, { from: 'M-04', to: 'M-03' }, { from: 'M-05', to: 'M-03' },
  { from: 'M-12', to: 'M-03' }, { from: 'M-12', to: 'M-06' },
  { from: 'M-08', to: 'M-04' }, { from: 'M-08', to: 'M-05' }, { from: 'M-16', to: 'M-05' }, { from: 'M-17', to: 'M-06' },
  { from: 'M-07', to: 'M-08' }, { from: 'M-07', to: 'M-03' }, { from: 'M-10', to: 'M-03' }, { from: 'M-11', to: 'M-05' },
  { from: 'M-15', to: 'M-12' }, { from: 'M-15', to: 'M-17' }, { from: 'M-13', to: 'M-07' }, { from: 'M-14', to: 'M-07' },
  { from: 'M-14', to: 'M-10' }, { from: 'M-18', to: 'M-16' }, { from: 'M-19', to: 'M-15' }, { from: 'M-20', to: 'M-11' }, { from: 'M-20', to: 'M-15' },
]

const layers: { label: string; key: Layer; y: number }[] = [
  { label: 'L1 — CORE', key: 'Core', y: 142 },
  { label: 'L2 — SERVICES (BUILT)', key: 'Services', y: 252 },
  { label: 'L3 — SECURITY (RESERVED)', key: 'Security', y: 372 },
  { label: 'L4 — INTELLIGENCE (RESERVED)', key: 'Intelligence', y: 492 },
  { label: 'L5 — APPLICATION (RESERVED)', key: 'Application', y: 612 },
  { label: 'L6 — INFRASTRUCTURE (RESERVED)', key: 'Infrastructure', y: 732 },
]

const nodeWidth = 132
const nodeHeight = 58
const graphWidth = 930
const graphHeight = 790
const mobileGraphWidth = 360
const mobileGraphHeight = 950
const mobileNodeWidth = 108
const mobileNodeHeight = 46
const mobilePositions: Record<string, { x: number; y: number }> = {
  'M-01': { x: 54, y: 58 }, 'M-21': { x: 198, y: 58 },
  'M-02': { x: 6, y: 180 }, 'M-03': { x: 126, y: 180 }, 'M-06': { x: 246, y: 180 }, 'M-09': { x: 126, y: 238 },
  'M-04': { x: 6, y: 340 }, 'M-05': { x: 126, y: 340 }, 'M-12': { x: 246, y: 340 },
  'M-08': { x: 6, y: 460 }, 'M-16': { x: 126, y: 460 }, 'M-17': { x: 246, y: 460 },
  'M-07': { x: 6, y: 580 }, 'M-10': { x: 126, y: 580 }, 'M-11': { x: 246, y: 580 }, 'M-15': { x: 126, y: 638 },
  'M-13': { x: 6, y: 760 }, 'M-14': { x: 126, y: 760 }, 'M-18': { x: 246, y: 760 }, 'M-19': { x: 78, y: 838 }, 'M-20': { x: 198, y: 838 },
}

function collectChain(start: string, direction: 'upstream' | 'downstream'): Set<string> {
  const visited = new Set<string>()
  const queue = [start]
  while (queue.length > 0) {
    const current = queue.shift() as string
    dependencies.forEach((edge) => {
      const next = direction === 'upstream' ? (edge.from === current ? edge.to : null) : (edge.to === current ? edge.from : null)
      if (next && !visited.has(next)) {
        visited.add(next)
        queue.push(next)
      }
    })
  }
  return visited
}

function edgePath(from: AstraModule, to: AstraModule): string {
  const startX = from.x + nodeWidth / 2
  const startY = from.y + nodeHeight
  const endX = to.x + nodeWidth / 2
  const endY = to.y
  const curve = Math.max(28, Math.abs(endY - startY) * 0.42)
  return `M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${endY - curve}, ${endX} ${endY}`
}

function mobileEdgePath(from: AstraModule, to: AstraModule): string {
  const start = mobilePositions[from.id]
  const end = mobilePositions[to.id]
  const startX = start.x + mobileNodeWidth / 2
  const startY = start.y + mobileNodeHeight
  const endX = end.x + mobileNodeWidth / 2
  const endY = end.y
  const curve = Math.max(22, Math.abs(endY - startY) * 0.38)
  return `M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${endY - curve}, ${endX} ${endY}`
}

function formatCount(value: number): string {
  return String(value).padStart(2, '0')
}

export default function AstraTopology() {
  const [selectedId, setSelectedId] = useState<string | null>('M-01')
  const selected = modules.find((module) => module.id === selectedId) ?? null
  const upstream = useMemo(() => selectedId ? collectChain(selectedId, 'upstream') : new Set<string>(), [selectedId])
  const downstream = useMemo(() => selectedId ? collectChain(selectedId, 'downstream') : new Set<string>(), [selectedId])
  const related = useMemo(() => new Set([selectedId, ...upstream, ...downstream]), [selectedId, upstream, downstream])
  const directUpstream = useMemo(() => new Set(dependencies.filter((edge) => edge.from === selectedId).map((edge) => edge.to)), [selectedId])
  const directDownstream = useMemo(() => new Set(dependencies.filter((edge) => edge.to === selectedId).map((edge) => edge.from)), [selectedId])
  const getModule = (id: string): AstraModule => modules.find((module) => module.id === id) as AstraModule

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedId(id)
    }
  }

  return (
    <div className="w-full overflow-x-auto bg-[#f3f2ef] px-4 py-5 md:px-8 md:py-8">
      <div className="mx-auto min-w-0 max-w-[1480px] md:min-w-[1260px]">
        <div className="px-3 pb-7 md:px-4">
          <p className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-[#d54b3c]">Full topology · all 21 modules</p>
          <h2 className="mt-5 font-display text-[10vw] font-bold leading-[0.95] tracking-tight text-[#101b24] md:text-6xl">Every module, every dependency, in one picture.</h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#5b6975] md:text-lg">Six built (green), fifteen reserved (grey). Arrows always run from a module to whatever it leans on. Click any module to light up its full dependency chain — both what it depends on and what depends on it.</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[930px_1fr]">
          <svg viewBox={`0 0 ${mobileGraphWidth} ${mobileGraphHeight}`} className="w-full rounded border border-[#d4d6d5] bg-white md:hidden" role="img" aria-label="Interactive Astra Runtime module dependency topology, mobile layout">
            <defs>
              <marker id="astra-mobile-arrow-default" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#c2c8cb" /></marker>
              <marker id="astra-mobile-arrow-upstream" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#d54b3c" /></marker>
              <marker id="astra-mobile-arrow-downstream" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#1c9d60" /></marker>
            </defs>
            {layers.map((layer) => <text key={`mobile-${layer.key}`} x="6" y={layer.y - 17} fill="#9aa3a8" fontFamily="monospace" fontSize="7" letterSpacing=".8">{layer.label}</text>)}
            {dependencies.map((edge) => {
              const isUpstream = selectedId === edge.from || upstream.has(edge.from) && upstream.has(edge.to)
              const isDownstream = selectedId === edge.to || downstream.has(edge.from) && downstream.has(edge.to)
              const active = isUpstream || isDownstream
              const stroke = isUpstream ? '#d54b3c' : isDownstream ? '#1c9d60' : '#cbd0d2'
              return <path key={`mobile-${edge.from}-${edge.to}`} d={mobileEdgePath(getModule(edge.from), getModule(edge.to))} fill="none" stroke={stroke} strokeWidth={active ? 2 : 1} opacity={selectedId && !active ? 0.25 : 0.78} markerEnd={`url(#astra-mobile-arrow-${isUpstream ? 'upstream' : isDownstream ? 'downstream' : 'default'})`} />
            })}
            {modules.map((module) => {
              const position = mobilePositions[module.id]
              const isSelected = module.id === selectedId
              const isRelated = related.has(module.id)
              const direct = directUpstream.has(module.id) || directDownstream.has(module.id)
              return <g key={`mobile-${module.id}`} transform={`translate(${position.x}, ${position.y})`} role="button" tabIndex={0} aria-label={`Select ${module.id} ${module.name}`} onClick={() => setSelectedId(module.id)} onKeyDown={(event) => handleKeyDown(event, module.id)} className="cursor-pointer outline-none" opacity={selectedId && !isRelated ? 0.32 : 1}>
                <rect width={mobileNodeWidth} height={mobileNodeHeight} rx="3" fill={module.status === 'built' ? '#29aa68' : '#f0f1f0'} stroke={isSelected ? '#d54b3c' : direct ? '#d54b3c' : module.status === 'built' ? '#209456' : '#d8dada'} strokeWidth={isSelected ? 2.5 : direct ? 1.7 : 1.1} strokeDasharray={module.status === 'reserved' ? '4 3' : undefined} />
                <text x={mobileNodeWidth / 2} y="18" textAnchor="middle" fill={module.status === 'built' ? '#fff' : '#27343d'} fontFamily="monospace" fontWeight="700" fontSize="8" letterSpacing=".7">{module.id}</text>
                <text x={mobileNodeWidth / 2} y="34" textAnchor="middle" fill={module.status === 'built' ? '#effff5' : '#56636b'} fontFamily="Arial, sans-serif" fontSize="7.5">{module.name}</text>
              </g>
            })}
          </svg>
          <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="hidden w-full rounded border border-[#d4d6d5] bg-white md:block" role="img" aria-label="Interactive Astra Runtime module dependency topology">
            <defs>
              <marker id="astra-arrow-default" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#c2c8cb" /></marker>
              <marker id="astra-arrow-upstream" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#d54b3c" /></marker>
              <marker id="astra-arrow-downstream" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#1c9d60" /></marker>
            </defs>
            {layers.map((layer) => <text key={layer.key} x="24" y={layer.y} fill="#9aa3a8" fontFamily="monospace" fontSize="10" letterSpacing="1.6">{layer.label}</text>)}
            <g aria-hidden="true">
              {dependencies.map((edge) => {
                const isUpstream = selectedId === edge.from || upstream.has(edge.from) && upstream.has(edge.to)
                const isDownstream = selectedId === edge.to || downstream.has(edge.from) && downstream.has(edge.to)
                const active = isUpstream || isDownstream
                const stroke = isUpstream ? '#d54b3c' : isDownstream ? '#1c9d60' : '#cbd0d2'
                return <path key={`${edge.from}-${edge.to}`} d={edgePath(getModule(edge.from), getModule(edge.to))} fill="none" stroke={stroke} strokeWidth={active ? 2.4 : 1.2} opacity={selectedId && !active ? 0.28 : 0.82} markerEnd={`url(#astra-arrow-${isUpstream ? 'upstream' : isDownstream ? 'downstream' : 'default'})`} className="transition-all duration-300" />
              })}
            </g>
            {modules.map((module) => {
              const isSelected = module.id === selectedId
              const isRelated = related.has(module.id)
              const direct = directUpstream.has(module.id) || directDownstream.has(module.id)
              return (
                <g key={module.id} transform={`translate(${module.x}, ${module.y})`} role="button" tabIndex={0} aria-label={`Select ${module.id} ${module.name}`} onClick={() => setSelectedId(module.id)} onKeyDown={(event) => handleKeyDown(event, module.id)} className="cursor-pointer outline-none" opacity={selectedId && !isRelated ? 0.32 : 1}>
                  <rect width={nodeWidth} height={nodeHeight} rx="4" fill={module.status === 'built' ? '#29aa68' : '#f0f1f0'} stroke={isSelected ? '#d54b3c' : direct ? '#d54b3c' : module.status === 'built' ? '#209456' : '#d8dada'} strokeWidth={isSelected ? 3 : direct ? 2 : 1.3} strokeDasharray={module.status === 'reserved' ? '5 3' : undefined} className="transition-all duration-300" />
                  <text x={nodeWidth / 2} y="22" textAnchor="middle" fill={module.status === 'built' ? '#fff' : '#27343d'} fontFamily="monospace" fontWeight="700" fontSize="11" letterSpacing="1">{module.id}</text>
                  <text x={nodeWidth / 2} y="41" textAnchor="middle" fill={module.status === 'built' ? '#effff5' : '#56636b'} fontFamily="Arial, sans-serif" fontSize="10">{module.name}</text>
                </g>
              )
            })}
          </svg>

          <aside className="min-h-[790px] rounded border border-[#d4d6d5] bg-white p-6 text-[#17232c]">
            <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#9aa3a8]">How to read this map</p>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#53616b]">
              <li><span className="font-semibold text-[#1c9d60]">Solid green</span> = built and tested today (6 modules)</li>
              <li><span className="font-semibold text-[#53616b]">Dashed grey</span> = reserved scaffolding (15 modules)</li>
              <li>Curved lines run from a module to what it depends on.</li>
              <li>The graph is a strict DAG — no circular dependencies.</li>
              <li>Click any module to spotlight its complete dependency chain.</li>
            </ul>

            {selected ? (
              <div className="mt-7 border-t border-[#e0e1df] pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="font-mono2 text-[10px] tracking-[0.2em] text-[#d54b3c]">{selected.id}</p><h3 className="mt-2 font-display text-2xl font-bold leading-tight">{selected.name}</h3></div>
                  <span className={`shrink-0 px-2 py-1 font-mono2 text-[9px] uppercase tracking-[0.15em] ${selected.status === 'built' ? 'bg-[#29aa68] text-white' : 'border border-dashed border-[#b8bec1] text-[#6b777e]'}`}>{selected.status}</span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#53616b]">{selected.description}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-[#e0e1df] py-5">
                  <div><dt className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#9aa3a8]">Layer</dt><dd className="mt-1 text-sm">{selected.layer}</dd></div>
                  <div><dt className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#9aa3a8]">Direct in</dt><dd className="mt-1 text-sm">{formatCount(directUpstream.size)}</dd></div>
                  <div><dt className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#9aa3a8]">Upstream</dt><dd className="mt-1 text-sm">{formatCount(upstream.size)}</dd></div>
                  <div><dt className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#9aa3a8]">Downstream</dt><dd className="mt-1 text-sm">{formatCount(downstream.size)}</dd></div>
                </dl>
                <div className="space-y-4 text-xs text-[#53616b]"><div><p className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#d54b3c]">Depends on</p><p className="mt-2 leading-relaxed">{directUpstream.size ? [...directUpstream].map((id) => `${id} · ${getModule(id).name}`).join('  /  ') : 'None — root node'}</p></div><div><p className="font-mono2 text-[9px] uppercase tracking-[0.15em] text-[#1c9d60]">Used by</p><p className="mt-2 leading-relaxed">{directDownstream.size ? [...directDownstream].map((id) => `${id} · ${getModule(id).name}`).join('  /  ') : 'None — leaf node'}</p></div></div>
              </div>
            ) : <p className="mt-7 border-t border-[#e0e1df] pt-6 text-sm leading-relaxed text-[#53616b]">Select any module to inspect its dependency chain and architectural role.</p>}

            <button type="button" onClick={() => setSelectedId(null)} className="mt-7 w-full border border-[#d4d6d5] px-4 py-3 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#53616b] transition-colors hover:border-[#d54b3c] hover:text-[#d54b3c]">Clear selection</button>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#e0e1df] pt-5 font-mono2 text-[9px] uppercase tracking-[0.14em] text-[#7e898f]"><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d54b3c]" />upstream</span><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#1c9d60]" />downstream</span></div>
          </aside>
        </div>
      </div>
    </div>
  )
}
