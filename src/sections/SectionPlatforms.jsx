const PLATFORMS = [
  {
    name: 'YouTube',
    mark: (
      <svg viewBox="0 0 28 28" width="38" height="38" aria-hidden>
        <rect x="1" y="6" width="26" height="16" rx="5.2" fill="#FF0000" />
        <path d="M11.4 10.3v7.4l6.4-3.7z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    mark: (
      <svg viewBox="0 0 28 28" width="38" height="38" aria-hidden>
        <defs>
          <linearGradient id="rinIg" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#FEDA75" />
            <stop offset="0.3" stopColor="#FA7E1E" />
            <stop offset="0.6" stopColor="#D62976" />
            <stop offset="1" stopColor="#962FBF" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="22" height="22" rx="6.5" fill="url(#rinIg)" />
        <circle cx="14" cy="14" r="5.2" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="20.3" cy="7.7" r="1.4" fill="#fff" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    mark: (
      <svg viewBox="0 0 28 28" width="38" height="38" aria-hidden>
        <rect width="28" height="28" rx="6" fill="#0A66C2" />
        <circle cx="8.6" cy="8.8" r="1.95" fill="#fff" />
        <rect x="6.8" y="12" width="3.6" height="9.6" fill="#fff" />
        <path d="M12.7 12h3.45v1.35c.5-.9 1.6-1.65 3.05-1.65 2.55 0 3.75 1.65 3.75 4.45v5.45h-3.6v-4.95c0-1.2-.42-2-1.5-2-1.02 0-1.55.68-1.55 2v4.95h-3.6z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: 'X',
    mark: (
      <svg viewBox="0 0 28 28" width="38" height="38" aria-hidden>
        <path d="M16.5 12.4 24 4h-2.3l-6.1 6.9L10.8 4H4l7.9 11.2L4 24h2.3l6.5-7.3 5.1 7.3H24zM7.1 5.7h2.9l10 14.7h-2.9z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    mark: (
      <svg viewBox="0 0 28 28" width="38" height="38" aria-hidden>
        <path d="M17.9 4.8c.3 2 1.7 3.6 3.7 3.9v3c-1.4 0-2.7-.4-3.7-1.1v5.1a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v3.1a2.3 2.3 0 1 0 1.6 2.2V4.8z" fill="#25F4EE" transform="translate(-1.1 1)" />
        <path d="M17.9 4.8c.3 2 1.7 3.6 3.7 3.9v3c-1.4 0-2.7-.4-3.7-1.1v5.1a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v3.1a2.3 2.3 0 1 0 1.6 2.2V4.8z" fill="#FE2C55" transform="translate(1.1 -0.4)" />
        <path d="M17.9 4.8c.3 2 1.7 3.6 3.7 3.9v3c-1.4 0-2.7-.4-3.7-1.1v5.1a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v3.1a2.3 2.3 0 1 0 1.6 2.2V4.8z" fill="#fff" />
      </svg>
    ),
  },
]

export default function SectionPlatforms() {
  return (
    <section id="platforms" className="rin-section rin-plat">
      <div className="rin-plat__inner">
        <p className="rin-eyebrow" data-reveal>Everywhere your audience is</p>

        <h2 className="rin-h2 rin-plat__title">
          <span className="rin-plat__line" data-reveal>
            One production. Every <em>platform.</em>
          </span>
        </h2>

        <p className="rin-plat__sub" data-reveal style={{ transitionDelay: '80ms' }}>
          A single creative engine, tuned to how people actually watch on each channel —
          built for founders, VCs and tech teams who need to show up sharp, not everywhere
          for the sake of it.
        </p>

        <div className="rin-plat__panel" data-reveal style={{ transitionDelay: '140ms' }}>
          <ul className="rin-plat__grid">
            {PLATFORMS.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  className="rin-plat__tile"
                  aria-label={p.name}
                  style={{ '--tile-delay': `${i * 0.4}s` }}
                >
                  <span className="rin-plat__mark" aria-hidden>{p.mark}</span>
                  <span className="rin-plat__label">{p.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
