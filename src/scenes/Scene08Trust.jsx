import { motion } from 'framer-motion'
import brandLogos from 'virtual:brand-logos'

const IMG = {
  flapEvent: '/images/trust/flap-event.jpg',
  bybitBooth: '/images/trust/bybit-booth.jpg',
  foundersMeetup: '/images/trust/founders-meetup.jpg',
  techCandid: '/images/trust/tech-candid.jpg',
  couchTalk: '/images/trust/couch-talk.jpg',
  monadBlitz: '/images/trust/monad-blitz.jpg',
  rooftopDinner: '/images/trust/rooftop-dinner.jpg',
  founderChat: '/images/trust/founder-chat.jpg',
  boundlessVC: '/images/trust/Consumer%20Ai%20Breakout%20-%20Boundless%20VC.jpg',
  bybitCard: '/images/trust/bybit-card.jpg',
  bybitCheers: '/images/trust/bybit-cheers.jpg',
}

const ease = [0.22, 1, 0.36, 1]

// --- Editorial primitives ---

function Photo({ src, alt, caption, style = {}, imgStyle = {}, delay = 0 }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease, delay }}
      style={{ position: 'relative', margin: 0, ...style }}
    >
      <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.8, ease }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'center',
            ...imgStyle,
          }}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: '12px',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 400,
          }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}

function Stat({ number, label, align = 'left', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease, delay }}
      style={{
        textAlign: align,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(4rem, 9vw, 9rem)',
          fontWeight: 700,
          letterSpacing: '-0.05em',
          lineHeight: 0.9,
          color: '#fff',
        }}
      >
        {number}
      </span>
      <span
        style={{
          marginTop: '12px',
          fontSize: '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </motion.div>
  )
}

// --- Our Clients — premium trust wall (Stripe / OpenAI / Linear / Vercel style) ---
//
// Logos auto-discover from /public/brand-logos/ via the Vite plugin.
// Drop a new file into that folder → it appears here on next reload.

// Slugs whose source files are dark (black/navy on transparent OR on white)
// and would be invisible on the black site background. We CSS-invert these to
// render as white-on-transparent. `filter: brightness(0) invert(1)` works for
// both case A (dark on transparent → white on transparent) and case B (dark
// on white → white on black, which blends with the page bg).
const DARK_LOGOS = new Set([
  'boundless-vc',     // black wordmark on white JPG background
  'bybit',            // dark navy on transparent
  'nodeops',          // dark gray on transparent
  'horizontal-logo',  // dark navy wordmark
])

// Per-logo size tweaks — some source files include built-in canvas padding
// which makes them visually shrink when normalised to the standard height.
const SIZE_OVERRIDES = {
  'boundless-vc': 92,
  flap:           76,
  'pizza-dao':    48,
  logomark:       52,
  p2p:            88,
}

function LogoCell({ logo }) {
  const height = SIZE_OVERRIDES[logo.slug] || 42
  const isDark = DARK_LOGOS.has(logo.slug)

  return (
    <div className="rin-logo-cell" title={logo.name}>
      <img
        src={logo.url}
        alt={logo.name}
        loading="lazy"
        draggable={false}
        className={`rin-logo-cell__img${isDark ? ' rin-logo-cell__img--invert' : ''}`}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '180px',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function LogoStrip() {
  return (
    <section
      aria-label="Our clients"
      style={{
        width: '100%',
        background: '#000',
        padding: 'clamp(4rem, 8vh, 7rem) 2vw clamp(4rem, 8vh, 7rem)',
      }}
    >
      <style>{`
        .rin-our-clients-title {
          font-family: 'Inter', 'SF Pro Display', 'Outfit', system-ui, sans-serif;
          font-weight: 700;
          color: #fff;
          text-align: center;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin: 0 auto 20px;
          font-size: 56px;
        }
        @media (max-width: 1024px) {
          .rin-our-clients-title { font-size: 44px; }
        }
        @media (max-width: 640px) {
          .rin-our-clients-title { font-size: 32px; }
        }

        .rin-our-clients-rule {
          width: 80px;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 auto 64px;
        }
        @media (max-width: 640px) {
          .rin-our-clients-rule { margin-bottom: 44px; }
        }

        .rin-logo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          column-gap: 80px;
          row-gap: 48px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
          align-items: center;
          justify-items: center;
        }
        @media (max-width: 1024px) {
          .rin-logo-grid {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 56px;
            row-gap: 40px;
          }
        }
        @media (max-width: 640px) {
          .rin-logo-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 32px;
            row-gap: 36px;
          }
        }

        .rin-logo-cell {
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: default;
        }
        .rin-logo-cell__img {
          opacity: 0.75;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        /* On phones the grid cells are narrower than 180px — never let the
           image overflow the cell. Inline max-width loses to !important. */
        @media (max-width: 640px) {
          .rin-logo-cell__img { max-width: 100% !important; }
        }
        .rin-logo-cell__img--invert {
          filter: brightness(0) invert(1);
        }
        .rin-logo-cell:hover .rin-logo-cell__img {
          opacity: 1;
          transform: translateY(-2px);
        }
      `}</style>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className="rin-our-clients-title"
      >
        Our Clients
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
        className="rin-our-clients-rule"
      />

      {brandLogos.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.9rem',
          }}
        >
          No logos in /public/brand-logos/ yet.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="rin-logo-grid"
        >
          {brandLogos.map(logo => (
            <LogoCell key={logo.slug} logo={logo} />
          ))}
        </motion.div>
      )}
    </section>
  )
}

// --- Section header ---

function Header() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto 10rem', padding: '0 2vw' }}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          fontWeight: 400,
          marginBottom: '2.5rem',
        }}
      >
        — Rin Media in the field
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease, delay: 0.1 }}
        style={{
          fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
          color: '#fff',
          maxWidth: '14ch',
          margin: 0,
        }}
      >
        Stories told where<br />
        innovation happens.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 0.25 }}
        style={{
          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '50ch',
          marginTop: '2.5rem',
          fontWeight: 400,
        }}
      >
        From startup houses and founder communities to global conferences
        and industry events — we've documented the people building what's next.
      </motion.p>
    </div>
  )
}

// --- Acts ---

function ActHero() {
  return (
    <div
      className="rin-act rin-act--hero"
      style={{
        maxWidth: '1240px',
        margin: '0 auto 10rem',
        padding: '0 2vw',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 3fr)',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'flex-end',
      }}
    >
      <Photo
        src={IMG.monadBlitz}
        alt="MONAD Blitz Startup House"
        caption="MONAD Blitz · Startup House · Hyderabad"
        imgStyle={{ aspectRatio: '16/10', objectPosition: 'center 35%' }}
        delay={0.1}
      />
      <div style={{ paddingBottom: '40px' }}>
        <Stat number="100+" label="Events Covered" delay={0.3} />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease, delay: 0.45 }}
          style={{
            marginTop: '2.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '24ch',
          }}
        >
          Hackathons, startup houses, builder summits — we ship aftermovies
          that feel like the night itself.
        </motion.p>
      </div>
    </div>
  )
}

function ActSecondary() {
  return (
    <div
      className="rin-act rin-act--secondary"
      style={{
        maxWidth: '1240px',
        margin: '0 auto 10rem',
        padding: '0 2vw',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 7fr)',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ paddingTop: '40px' }}>
        <Stat number="50+" label="Founders Filmed" delay={0.1} />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease, delay: 0.25 }}
          style={{
            marginTop: '2.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '24ch',
          }}
        >
          From world-stage launches to intimate founder portraits, the brands
          you trust have trusted us first.
        </motion.p>
      </div>
      <Photo
        src={IMG.bybitBooth}
        alt="ByBit at World Fintech Summit"
        caption="ByBit · World Fintech Summit · Day 2"
        imgStyle={{ aspectRatio: '16/10' }}
        delay={0.15}
      />
    </div>
  )
}

function ActStatement() {
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto 10rem',
        padding: '0 2vw',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease }}
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.12)',
          margin: '0 auto 4rem',
          width: '120px',
          transformOrigin: 'center',
        }}
      />

      <motion.h3
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease, delay: 0.15 }}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 6rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
          color: '#fff',
          margin: 0,
        }}
      >
        Shot with the best.
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease, delay: 0.3 }}
        style={{
          marginTop: '2rem',
          fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '32ch',
          margin: '2rem auto 0',
          fontWeight: 400,
        }}
      >
        Trusted by builders, founders, creators, and the communities they
        belong to.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease, delay: 0.1 }}
        style={{
          height: '1px',
          background: 'rgba(255,255,255,0.12)',
          margin: '4rem auto 0',
          width: '120px',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}

function ActMoments() {
  // Editorial asymmetric collage — 8 supporting moments + 2+ Countries stat
  return (
    <div
      className="rin-act rin-act--moments"
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 2vw',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'auto',
        rowGap: 'clamp(2rem, 6vw, 6rem)',
        columnGap: 'clamp(1.5rem, 3vw, 3rem)',
      }}
    >
      {/* Row 1 — Public moments */}
      <div style={{ gridColumn: '1 / span 5', gridRow: '1' }}>
        <Photo
          src={IMG.flapEvent}
          alt="FLAP Community Meetup"
          caption="FLAP Community · Bengaluru"
          imgStyle={{ aspectRatio: '4/3' }}
          delay={0}
        />
      </div>

      <div style={{ gridColumn: '8 / span 4', gridRow: '1', alignSelf: 'flex-end', paddingBottom: '40px' }}>
        <Photo
          src={IMG.foundersMeetup}
          alt="Founder Gathering"
          caption="Emergent Team"
          imgStyle={{ aspectRatio: '3/2' }}
          delay={0.1}
        />
      </div>

      {/* Row 2 — Stat + intimate */}
      <div style={{ gridColumn: '1 / span 3', gridRow: '2', alignSelf: 'center' }}>
        <Stat number="2+" label="Countries" delay={0.05} />
      </div>

      <div style={{ gridColumn: '4 / span 5', gridRow: '2' }}>
        <Photo
          src={IMG.couchTalk}
          alt="Builders Interview"
          caption="Builders Interview"
          imgStyle={{ aspectRatio: '3/2' }}
          delay={0.15}
        />
      </div>

      <div style={{ gridColumn: '10 / span 3', gridRow: '2', alignSelf: 'flex-end' }}>
        <Photo
          src={IMG.techCandid}
          alt="MONAD Blitz Pune"
          caption="MONAD Blitz · Pune"
          imgStyle={{ aspectRatio: '1/1' }}
          delay={0.25}
        />
      </div>

      {/* Row 3 — Zo House BLR rooftop (wide cinematic) + ByBit cheers */}
      <div style={{ gridColumn: '1 / span 7', gridRow: '3' }}>
        <Photo
          src={IMG.rooftopDinner}
          alt="Zo House BLR rooftop"
          caption="Founder Dinner · Zo House BLR"
          imgStyle={{ aspectRatio: '16/10' }}
          delay={0.05}
        />
      </div>

      <div style={{ gridColumn: '9 / span 4', gridRow: '3', alignSelf: 'flex-end', paddingBottom: '60px' }}>
        <Photo
          src={IMG.bybitCheers}
          alt="ByBit night cheers"
          caption="ByBit · IBW After Hours"
          imgStyle={{ aspectRatio: '3/2' }}
          delay={0.18}
        />
      </div>

      {/* Row 4 — ByBit card moment + builders unwind */}
      <div style={{ gridColumn: '2 / span 5', gridRow: '4', alignSelf: 'flex-start', paddingTop: '40px' }}>
        <Photo
          src={IMG.bybitCard}
          alt="ByBit debit card reveal at Zo House"
          caption="ByBit · IBW After Hours"
          imgStyle={{ aspectRatio: '3/2' }}
          delay={0.05}
        />
      </div>

      <div style={{ gridColumn: '8 / span 4', gridRow: '4' }}>
        <Photo
          src={IMG.founderChat}
          alt="Founder chat"
          caption="Builders Unwind"
          imgStyle={{ aspectRatio: '3/2' }}
          delay={0.15}
        />
      </div>

      {/* Row 5 — Boundless VC cohort, ecosystem-scale closer */}
      <div style={{ gridColumn: '1 / span 12', gridRow: '5' }}>
        <Photo
          src={IMG.boundlessVC}
          alt="Consumer AI Breakout — Boundless VC"
          caption="Consumer AI Breakout · Boundless VC"
          imgStyle={{ aspectRatio: '21/9' }}
          delay={0.1}
        />
      </div>
    </div>
  )
}

// --- Main scene ---

export default function Scene08Trust() {
  return (
    <section
      id="scene-08"
      style={{
        background: '#000',
        width: '100%',
        padding: 'clamp(8rem, 16vh, 14rem) 0 8rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontFamily: "'Inter', 'Outfit', sans-serif",
        color: '#fff',
        position: 'relative',
      }}
    >
      <Header />
      <ActHero />
      <ActSecondary />
      <ActStatement />
      <ActMoments />
      <LogoStrip />
    </section>
  )
}
