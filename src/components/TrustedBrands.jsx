/**
 * Two-row infinite logo marquee ("Trusted by amazing brands").
 *
 * Pure CSS animation (transform: translateX on a GPU layer) — no JS loop and
 * no animation state. Each row renders its logo group twice; the track slides
 * by exactly one group (-50%), so the loop point is invisible. The second copy
 * is aria-hidden so screen readers hear every brand once.
 *
 * `s` is a per-logo optical scale: wordmarks with tall icons or tiny x-heights
 * need nudging so every brand reads at the same visual weight.
 */

const ROW_ONE = [
  { src: '/brand-logos/nodeops.webp',      alt: 'NodeOps' },
  { src: '/brand-logos/p2p.webp',          alt: 'P2P.me',      s: 0.95 },
  { src: '/brand-logos/avalanche.svg',     alt: 'Avalanche' },
  { src: '/brand-logos/bnb-chain.svg',     alt: 'BNB Chain' },
  { src: '/brand-logos/starkware.svg',     alt: 'StarkWare' },
  { src: '/brand-logos/stellar.webp',      alt: 'Stellar' },
  { src: '/brand-logos/openai.svg',        alt: 'OpenAI',      s: 0.85 },
  { src: '/brand-logos/monad.svg',         alt: 'Monad' },
  { src: '/brand-logos/bybit.webp',        alt: 'Bybit',       s: 0.9 },
  { src: '/brand-logos/hugging-face.svg',  alt: 'Hugging Face', s: 1.55 },
  { src: '/brand-logos/sarvam.webp',       alt: 'Sarvam',      s: 0.8 },
  { src: '/brand-logos/nasscom.svg',       alt: 'nasscom',     s: 0.65 },
  { src: '/brand-logos/vcluster.svg',      alt: 'vCluster',    s: 1.5 },
  { src: '/brand-logos/00-zo-house.svg',   alt: 'Zo House' },
  { src: '/brand-logos/else-play.webp',    alt: 'else/play',   s: 1.05 },
]

const ROW_TWO = [
  { src: '/brand-logos/venture-catalysts.webp',          alt: 'Venture Catalysts', s: 1.5 },
  { src: '/brand-logos/jarvislabs.webp',                 alt: 'Jarvislabs.ai',     s: 0.85 },
  { src: '/brand-logos/claude-community-bangalore.webp', alt: 'Claude Community Bangalore', s: 2.2 },
  { src: '/brand-logos/nova.svg',                        alt: 'Nova Residency', s: 1.25 },
  { src: '/brand-logos/sgl.webp',                        alt: 'SGL',          s: 1.2 },
  { src: '/brand-logos/flap.webp',                       alt: 'FLAP',         s: 0.95 },
  { src: '/brand-logos/boundless-vc.webp',               alt: 'Boundless VC', s: 0.95 },
  { src: '/brand-logos/mudrex.webp',                     alt: 'Mudrex' },
  { src: '/brand-logos/together-fund.svg',               alt: 'Together Fund' },
  { src: '/brand-logos/pizza-dao.webp',                  alt: 'Pizza DAO',    s: 0.85 },
  { src: '/brand-logos/web3-kerala.webp',                alt: 'Web3 Kerala',  s: 1.3 },
  { src: '/brand-logos/easy-broker.svg',                 alt: 'Easy Broker',  s: 1.3 },
  { src: '/brand-logos/xcast.svg',                       alt: 'XCast', label: 'XCast' },
  { src: '/brand-logos/indian-angel-network.webp',      alt: 'Indian Angel Network', s: 1.6 },
  { src: '/brand-logos/know-shubhangi.webp',            alt: 'knowShubhangi', s: 0.85 },
]

function LogoGroup({ logos, hidden }) {
  return (
    <ul className="rin-logos__group" aria-hidden={hidden || undefined}>
      {logos.map((logo) => (
        <li className="rin-logos__item" key={logo.src}>
          <img
            src={logo.src}
            alt={hidden ? '' : logo.alt}
            style={logo.s ? { '--s': logo.s } : undefined}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          {logo.label && <span className="rin-logos__label" aria-hidden="true">{logo.label}</span>}
        </li>
      ))}
    </ul>
  )
}

function LogoRow({ logos, reverse }) {
  return (
    <div className={`rin-logos__row${reverse ? ' rin-logos__row--reverse' : ''}`}>
      <div className="rin-logos__track">
        <LogoGroup logos={logos} />
        <LogoGroup logos={logos} hidden />
      </div>
    </div>
  )
}

export default function TrustedBrands() {
  return (
    <div className="rin-logos" role="region" aria-label="Brands we have worked with">
      <LogoRow logos={ROW_ONE} />
      <LogoRow logos={ROW_TWO} reverse />
    </div>
  )
}
