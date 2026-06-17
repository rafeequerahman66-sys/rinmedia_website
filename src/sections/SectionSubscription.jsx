const BENEFITS = [
  {
    title: 'On-demand requests',
    caption: 'Put all your requests in the queue and watch them come to life, one by one, on time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18M7 13h6" />
      </svg>
    ),
  },
  {
    title: 'Top-notch quality',
    caption: 'High-end work from a dedicated team of senior creatives that feels bespoke, every time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
      </svg>
    ),
  },
  {
    title: 'Powered by Rin Media',
    caption: 'Lightning-fast turnarounds backed by a full in-house production and post pipeline.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
      </svg>
    ),
  },
]

export default function SectionSubscription() {
  return (
    <section id="subscription" className="rin-section">
      <div className="rin-subs__header" data-reveal>
        <div>
          <p className="rin-eyebrow" style={{ marginBottom: '1.25rem' }}>Benefits</p>
          <h2 className="rin-h2">The creative subscription that connects you to your dream team.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', alignItems: 'flex-start' }}>
          <p className="rin-body">
            One predictable monthly engagement. Senior creatives on tap. Production,
            post, motion, and strategy under one roof — moving as fast as your roadmap.
          </p>
          <a className="rin-btn rin-btn--lime" href="#contact">See Pricing</a>
        </div>
      </div>

      <div className="rin-subs__grid">
        {BENEFITS.map((b, i) => (
          <div className="rin-benefit" key={b.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="rin-benefit__icon">{b.icon}</div>
            <h3 className="rin-h3">{b.title}</h3>
            <p className="rin-caption">{b.caption}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
