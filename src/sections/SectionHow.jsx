const STEPS = [
  {
    title: 'Subscribe & get started',
    caption: 'Submit as many requests as you need without worrying about individual project fees.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    title: 'Polished films — on time',
    caption: 'Our creatives get to work to deliver your request. Receive your cut within a few days.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="6" width="14" height="12" rx="2" />
        <path d="M17 10l4-2v8l-4-2z" />
      </svg>
    ),
  },
  {
    title: 'Revisions made simple',
    caption: 'Custom edits, prompt replies, and as many revisions as you need.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
      </svg>
    ),
  },
]

export default function SectionHow() {
  return (
    <section id="how" className="rin-section">
      <div className="rin-how__header" data-reveal>
        <div>
          <p className="rin-eyebrow" style={{ marginBottom: '1.25rem' }}>How we work</p>
          <h2 className="rin-h2">Get a dedicated creative team at a fraction of the cost.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
          <p className="rin-body">
            Senior creatives. Senior pipeline. A subscription model that swaps unpredictable
            project fees for a steady creative engine — so your story keeps moving while
            you keep building.
          </p>
          <a className="rin-btn rin-btn--lime" href="#subscription">See Pricing</a>
        </div>
      </div>

      <div className="rin-how__steps">
        {STEPS.map((step, i) => (
          <div className="rin-step" key={step.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="rin-step__icon">{step.icon}</div>
            <div className="rin-step__connector" aria-hidden />
            <h3 className="rin-h3">{step.title}</h3>
            <p className="rin-caption">{step.caption}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
