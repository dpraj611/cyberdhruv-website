import { Link, useParams } from 'react-router'
import { motion } from 'framer-motion'
import { getProject, nextProject } from '@/data/content'
import AstraTopology from '@/components/AstraTopology'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug ?? '')

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl font-extrabold uppercase">Project not found</h1>
        <Link to="/#works" data-hover className="link-sweep mt-6 font-mono2 text-xs uppercase tracking-[0.3em] text-[#ff4d00]">
          ← Selected projects
        </Link>
      </main>
    )
  }

  const next = nextProject(project.slug)

  return (
    <main className={`pt-32 md:pt-40 ${project.slug === 'astra-runtime' ? '' : 'project-detail'}`}>
      <div className="px-6 md:px-10">
        <div className="flex items-center gap-6">
          <Link to="/#works" data-hover className="link-sweep font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ece9e4]/50">
            ← Selected projects
          </Link>
          <Link to="/" data-hover className="link-sweep font-mono2 text-[11px] uppercase tracking-[0.3em] text-[#ff4d00]">
            ← Back to home
          </Link>
        </div>

        {project.caseStudy && (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#ece9e4]/15 pt-5 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ff4d00]">
            <span>01 / {project.category}</span>
            <span>Featured project</span>
          </div>
        )}

        <motion.h1
          className="mt-8 font-display text-[12vw] font-extrabold uppercase leading-[0.9] tracking-tighter md:text-[7vw]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {project.title}
        </motion.h1>

        {project.caseStudy && (
          <p className="mt-5 max-w-4xl font-display text-2xl font-bold leading-tight text-[#ece9e4]/80 md:text-4xl">
            {project.caseStudy.subtitle}
          </p>
        )}

        <motion.div
          className="mt-10 grid grid-cols-2 gap-8 border-t border-[#ece9e4]/15 pt-8 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {project.caseStudy ? project.caseStudy.metadata.map((item) => (
            <div key={item.label}>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">{item.label}</p>
              <p className="mt-2 text-sm text-[#ece9e4]/80">{item.value}</p>
            </div>
          )) : (
            <>
              <div><p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Client</p><p className="mt-2 text-sm text-[#ece9e4]/80">{project.client}</p></div>
              <div><p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Sector</p><p className="mt-2 text-sm text-[#ece9e4]/80">{project.category}</p></div>
              <div><p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Year</p><p className="mt-2 text-sm text-[#ece9e4]/80">{project.year}</p></div>
              <div><p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#ece9e4]/40">Deliverables</p><p className="mt-2 text-sm text-[#ece9e4]/80">{project.deliverables.join(', ')}</p></div>
            </>
          )}
        </motion.div>
      </div>

      {project.slug === 'astra-runtime' ? (
        <div className="mt-14">
          <AstraTopology />
        </div>
      ) : (
        <motion.div
          className="mt-14 aspect-[16/9] w-full overflow-hidden"
          initial={{ clipPath: 'inset(8% 4% 8% 4%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ delay: 0.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {project.caseStudy?.projectUrl ? (
            <a href={project.caseStudy.projectUrl} target="_blank" rel="noreferrer" data-hover className="group block h-full">
              <img src={project.img} alt={`${project.title} project interface`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </a>
          ) : (
            <img src={project.img} alt={`${project.title} project interface`} className="h-full w-full object-cover" />
          )}
        </motion.div>
      )}

      {(project.repositoryUrl || project.websiteUrl) && (
        <div className="flex flex-wrap gap-6 px-6 pt-8 md:px-10">
          {project.websiteUrl && <a className="link-sweep py-3 font-mono2 text-xs uppercase tracking-widest text-[#ff4d00]" href={project.websiteUrl} target="_blank" rel="noreferrer">Visit website ↗</a>}
          {project.repositoryUrl && <a className="link-sweep py-3 font-mono2 text-xs uppercase tracking-widest" href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository ↗</a>}
        </div>
      )}
      <section className="grid gap-10 border-b border-[#ece9e4]/15 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
        <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
          ( Technical brief )
        </p>
        <div className="max-w-3xl space-y-6">
          {project.description.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#ece9e4]/80 md:text-xl">
              {para}
            </p>
          ))}
        </div>
      </section>

      {project.caseStudy ? (
        <>
          
      <section className="grid gap-10 border-b border-[#ece9e4]/15 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
            <div>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">
                ( {project.caseStudy.contributionLabel} )
              </p>
              <p className="mt-5 max-w-xs font-mono2 text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[#ece9e4]/40">
                {project.caseStudy.contributionIntro}
              </p>
            </div>
            <div className="border-t border-[#ece9e4]/15">
              {project.caseStudy.contributions.map((contribution, i) => (
                <div key={contribution.code} className="border-b border-[#ece9e4]/15 py-6">
                  <div className="flex items-start justify-between gap-6">
                    <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#ff4d00]">
                      {String(i + 1).padStart(2, '0')} — {contribution.code}
                    </span>
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ece9e4]/35">
                      module
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-[#ece9e4]/90 md:text-3xl">
                    {contribution.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#ece9e4]/65">
                    {contribution.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {project.caseStudy.workflow ? (
            <section className="border-b border-[#ece9e4]/15 px-6 py-20 md:px-10 md:py-28">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( {project.caseStudy.workflowLabel} )</p>
              <p className="mt-6 max-w-4xl font-mono2 text-sm uppercase leading-relaxed tracking-[0.12em] text-[#ece9e4]/65 md:text-base">{project.caseStudy.workflowIntro}</p>
              <div className="mt-10 grid border-t border-[#ece9e4]/15 md:grid-cols-7">
                {project.caseStudy.workflow.map((step) => (
                  <div key={step.code} className="border-b border-[#ece9e4]/15 p-5 md:border-b-0 md:border-r md:p-6 last:border-r-0">
                    <p className="font-mono2 text-[10px] text-[#ff4d00]">{step.code}</p>
                    <h2 className="mt-5 font-display text-xl font-bold uppercase leading-tight text-[#ece9e4]/90">{step.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#ece9e4]/55">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="border-b border-[#ece9e4]/15 px-6 py-20 md:px-10 md:py-28">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Architecture and execution flow )</p>
              <div className="mt-10 border-y border-[#ece9e4]/15">
                <div className="grid gap-6 border-b border-[#ece9e4]/15 p-6 md:grid-cols-[1fr_2fr] md:p-8"><span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ff4d00]">M-01 · Core Runtime</span><p className="font-mono2 text-xs uppercase leading-relaxed tracking-[0.14em] text-[#ece9e4]/65">Capability manager · Process manager · EventBus</p></div>
                <div className="grid gap-4 p-6 md:grid-cols-5 md:p-8">{project.caseStudy.contributions.slice(1, 5).map((contribution) => (<div key={contribution.code} className="border-l border-[#ff4d00]/60 pl-4"><p className="font-mono2 text-[10px] tracking-[0.15em] text-[#ff4d00]">{contribution.code}</p><p className="mt-3 font-display text-lg font-bold uppercase leading-tight text-[#ece9e4]/85">{contribution.title}</p></div>))}</div>
                <div className="grid gap-6 border-t border-[#ece9e4]/15 p-6 md:grid-cols-[1fr_2fr] md:p-8"><span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ff4d00]">M-21 · Assembly Core</span><p className="font-mono2 text-xs uppercase leading-relaxed tracking-[0.14em] text-[#ece9e4]/65">Low-level primitive implementations</p></div>
              </div>
              <p className="mt-5 font-mono2 text-[10px] uppercase tracking-[0.18em] text-[#ece9e4]/35">Conceptual grouping of the six implemented modules, not a complete dependency graph.</p>
            </section>
          )}

          
      <section className="grid gap-10 border-b border-[#ece9e4]/15 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
            <div>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Technical specifications )</p>
              <div className="mt-8 grid grid-cols-2 gap-px bg-[#ece9e4]/15">
                {project.caseStudy.specifications.map((specification) => (
                  <div key={specification.label} className="bg-[#0a0a0a] p-5 md:p-7">
                    <p className="font-display text-4xl font-extrabold text-[#ff4d00] md:text-5xl">{specification.value}</p>
                    <p className="mt-3 font-mono2 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#ece9e4]/45">{specification.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Security engineering )</p>
              <h2 className="mt-8 font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">{project.caseStudy.securityTitle}</h2>
              <ul className="mt-8 border-t border-[#ece9e4]/15">
                {project.caseStudy.considerations.map((consideration, i) => (
                  <li key={consideration} className="flex gap-4 border-b border-[#ece9e4]/15 py-4 text-sm leading-relaxed text-[#ece9e4]/70">
                    <span className="font-mono2 text-[10px] text-[#ff4d00]">{String(i + 1).padStart(2, '0')}</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {project.caseStudy.scope && (
            
      <section className="grid gap-10 border-b border-[#ece9e4]/15 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
              <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( {project.caseStudy.scopeTitle} )</p>
              <ul className="border-t border-[#ece9e4]/15">{project.caseStudy.scope.map((item, i) => (<li key={item} className="flex gap-4 border-b border-[#ece9e4]/15 py-5 text-base leading-relaxed text-[#ece9e4]/70"><span className="font-mono2 text-[10px] text-[#ff4d00]">{String(i + 1).padStart(2, '0')}</span>{item}</li>))}</ul>
            </section>
          )}

          
      <section className="grid gap-10 border-b border-[#ece9e4]/15 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Technology stack )</p>
            <div className="flex flex-wrap gap-3">
              {project.caseStudy.stack.map((technology) => (
                <span key={technology} className="border border-[#ece9e4]/20 px-4 py-3 font-mono2 text-[10px] uppercase tracking-[0.18em] text-[#ece9e4]/70">{technology}</span>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-b border-[#ece9e4]/15 px-6 py-12 md:grid-cols-[1fr_2fr] md:px-10">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Project repository )</p>
            {project.caseStudy.repositoryUrl ? (
              <a href={project.caseStudy.repositoryUrl} target="_blank" rel="noreferrer" data-hover className="link-sweep font-mono2 text-xs uppercase tracking-[0.2em] text-[#ece9e4]/65 transition-colors hover:text-[#ff4d00]">{project.caseStudy.repository} ↗</a>
            ) : (
              <span className="font-mono2 text-xs uppercase tracking-[0.2em] text-[#ece9e4]/65">{project.caseStudy.repository}</span>
            )}
          </section>
        </>
      ) : (
        <section className="grid gap-10 px-6 py-20 md:grid-cols-[1fr_2fr] md:px-10 md:py-28">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ff4d00]">( Deliverables )</p>
            <p className="mt-5 max-w-xs font-mono2 text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[#ece9e4]/40">Core areas, methods, and technologies used across the project.</p>
          </div>
          <div className="border-t border-[#ece9e4]/15">
            {project.deliverables.map((deliverable, i) => (
              <div key={deliverable} className="grid grid-cols-[3rem_1fr] items-center border-b border-[#ece9e4]/15 py-5 md:grid-cols-[4rem_1fr_8rem]">
                <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#ff4d00]">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-xl font-bold uppercase tracking-tight text-[#ece9e4]/90 md:text-2xl">{deliverable}</span>
                <span className="hidden justify-self-end font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#ece9e4]/35 md:block"></span>
              </div>
            ))}
          </div>
        </section>
      )}

      <Link
        to={`/works/${next.slug}`}
        data-hover
        className="group block border-t border-[#ece9e4]/15 px-6 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-[#ece9e4]/50">
          Next project
        </p>
        <span className="mt-4 block font-display text-[10vw] font-extrabold uppercase leading-[0.9] tracking-tighter transition-colors duration-500 group-hover:text-[#ff4d00] md:text-[6vw]">
          {next.title} →
        </span>
      </Link>
    </main>
  )
}

