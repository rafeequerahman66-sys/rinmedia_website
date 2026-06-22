import { motion } from 'framer-motion'

const BRAND_LOGOS = [
  { src: '/brand-logos/nova.svg',          alt: 'Nova Residency' },
  { src: '/brand-logos/monad.svg',         alt: 'Monad' },
  { src: '/brand-logos/bybit.png',         alt: 'ByBit' },
  { src: '/brand-logos/flap.png',          alt: 'FLAP',      scale: 2.6 },
  { src: '/brand-logos/boundless-vc.png',  alt: 'Boundless', scale: 2.6 },
  { src: '/brand-logos/00-zo-house.svg',   alt: 'Zo House' },
  { src: '/brand-logos/nodeops.png',       alt: 'NodeOps' },
  { src: '/brand-logos/p2p.png',           alt: 'P2P.org',   scale: 2.6 },
  { src: '/brand-logos/avalanche.svg',     alt: 'Avalanche' },
  { src: '/brand-logos/bnb-chain.svg',     alt: 'BNB Chain' },
  { src: '/brand-logos/starkware.svg',     alt: 'Starkware' },
  { src: '/brand-logos/stellar.svg',       alt: 'Stellar' },
  { src: '/brand-logos/mudrex.webp',       alt: 'Mudrex' },
  { src: '/brand-logos/together-fund.svg', alt: 'Together Fund' },
  { src: '/brand-logos/pizza-dao.png',     alt: 'Pizza DAO' },
  { src: '/brand-logos/web3-kerala.png',   alt: 'Web3 Kerala' },
]

function Star() {
  return (
    <svg className="rin-hero__star" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
    </svg>
  )
}

export default function SectionHero() {
  return (
    <section id="hero" className="rin-hero">
      <div className="rin-hero__glow" aria-hidden />

      <div className="rin-hero__inner">
        <motion.h1
          className="rin-hero__h1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          We Make People Watch Your{' '}
          <span className="rin-hero__story">
            Story
            <Star />
          </span>
        </motion.h1>

        <motion.p
          className="rin-hero__sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          We build cinematic content and creative strategy that makes ambitious brands,
          founders, and communities impossible to scroll past.
        </motion.p>

        <motion.div
          className="rin-hero__ctas"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <a className="rin-btn rin-btn--lime" href="#contact">Book a Meeting</a>
          <a className="rin-btn rin-btn--outline" href="#works">View Our Work</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <p className="rin-eyebrow" style={{ marginBottom: '1.5rem' }}>Trusted by amazing brands</p>
          <div className="rin-marquee">
            <div className="rin-marquee__track">
              {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                <div className="rin-marquee__item" key={i} aria-hidden={i >= BRAND_LOGOS.length}>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    draggable="false"
                    style={logo.scale ? { height: `${26 * logo.scale}px`, maxWidth: `${140 * logo.scale}px` } : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="rin-hero__scroll-hint" aria-hidden />
    </section>
  )
}
