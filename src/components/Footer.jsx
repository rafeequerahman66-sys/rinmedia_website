const COMPANY = [
  { label: 'About', href: '/#how' },
  { label: 'Services', href: '/#capabilities' },
  { label: 'Portfolio', href: '/#works' },
  { label: 'Pricing', href: '/#subscription' },
  { label: 'Contact', href: '/#contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

// TODO: replace the '#' placeholders below with Rin Media's real profile URLs.
const LINKEDIN_URL = 'https://www.linkedin.com/company/rin-media'
const INSTAGRAM_URL = 'https://www.instagram.com/rinmedia_xyz/'
const YOUTUBE_URL = '#' // TODO: add YouTube URL
const X_URL = 'https://x.com/rinmedia_xyz'

const SOCIAL = [
  {
    label: 'LinkedIn', href: LINKEDIN_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
        <path d="M6.94 5A1.94 1.94 0 1 1 3.06 5a1.94 1.94 0 0 1 3.88 0zM3.4 8.5h3.1V21H3.4zM9.3 8.5h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21H9.3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram', href: INSTAGRAM_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X', href: X_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        <path d="M14.2 10.6 20.6 3h-2l-5.3 6L9 3H3.5l6.7 9.6L3.5 21h2l5.6-6.4L15.3 21H21zM11.6 13.2l-.7-.9-4.9-7h2.5l4.2 6 .7.9 5.1 7.3h-2.5z" />
      </svg>
    ),
  },
  {
    label: 'YouTube', href: YOUTUBE_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden>
        <path d="M23 12s0-3.2-.4-4.7a2.4 2.4 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.4 2.4 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.4 2.4 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.4 2.4 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="rin-footer">
      <div className="rin-footer__inner">
        <div className="rin-footer__top">
          <div className="rin-footer__brand-col">
            <div className="rin-footer__brand">
              <span className="rin-footer__dot" />
              <span>Rin Media</span>
            </div>
            <p className="rin-footer__blurb">
              A creative production studio turning ideas into content that performs —
              across every platform your audience is on.
            </p>
            <div className="rin-footer__contact">
              <a className="rin-footer__mail" href="mailto:rinmedia.xyz@gmail.com" data-native>
                rinmedia.xyz@gmail.com
              </a>
              <a className="rin-footer__mail" href="https://www.rinmedia.xyz" target="_blank" rel="noreferrer" data-native>
                www.rinmedia.xyz
              </a>
            </div>
          </div>

          <nav className="rin-footer__col" aria-label="Company">
            <h3 className="rin-footer__heading">Company</h3>
            <ul>
              {COMPANY.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav className="rin-footer__col" aria-label="Legal">
            <h3 className="rin-footer__heading">Legal</h3>
            <ul>
              {LEGAL.map((l) => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="rin-footer__col">
            <h3 className="rin-footer__heading">Social</h3>
            <div className="rin-footer__social">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rin-footer__social-link"
                  target="_blank"
                  rel="noreferrer"
                  data-native
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rin-footer__bottom">
          <span>© 2026 Rin Media. All Rights Reserved.</span>
          <span className="rin-footer__made">Built in Bangalore, India.</span>
        </div>
      </div>
    </footer>
  )
}
