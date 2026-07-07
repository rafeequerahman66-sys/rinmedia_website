const ITEMS = [
  { src: '/images/trust/Nova Residency - Launch day (14).jpg',  alt: 'Nova Residency — launch day' },
  { src: '/images/trust/demo day.JPG',                          alt: 'Demo day at Zo House' },
  { src: '/images/trust/OCU_0778.JPG',                          alt: 'Speaker at a Rin Media event' },
  { src: '/images/trust/DSC05073.jpg',                          alt: 'Monad Blitz group photo' },
  { src: '/images/trust/DSC06731.jpg',                          alt: 'ByBit catering' },
  { src: '/images/trust/cai-breakout-discussion.jpg',           alt: 'Consumer AI Breakout — candid discussion' },
  { src: '/images/trust/cai-breakout-speaker.jpg',              alt: 'Consumer AI Breakout — speaker' },
  { src: '/images/trust/cai-breakout-listener.jpg',             alt: 'Consumer AI Breakout — engaged audience' },
  { src: '/images/trust/cai-breakout-conversation.jpg',         alt: 'Consumer AI Breakout — conversation' },
  { src: '/images/trust/cai-breakout-colorgame.jpg',            alt: 'Consumer AI Breakout — colour game' },
  { src: '/images/trust/DSC00708.JPG',                          alt: 'Monad Blitz Pune — smiling participant' },
  { src: '/images/trust/DSC01448.JPG',                          alt: 'Monad Blitz Pune — hackathon floor' },
  { src: '/images/trust/IMG_0153.JPEG',                         alt: 'Monad Blitz Pune — editing setup' },
  { src: '/images/trust/IMG_0159.JPEG',                         alt: 'Monad Blitz Pune — focused work' },
  { src: '/images/trust/IMG_0161.JPEG',                         alt: 'Monad Blitz Pune — building together' },
  { src: '/images/trust/bybit-booth.jpg',                       alt: 'ByBit booth activation' },
  { src: '/images/trust/founder-chat.jpg',                      alt: 'Founder interview' },
  { src: '/images/trust/monad-blitz.jpg',                       alt: 'Monad Blitz hackathon' },
  { src: '/images/trust/rooftop-dinner.jpg',                    alt: 'Rooftop founders dinner' },
  { src: '/images/trust/Consumer Ai Breakout - Boundless VC.jpg', alt: 'Consumer AI Breakout — Boundless VC' },
  { src: '/images/trust/bybit-cheers.jpg',                      alt: 'ByBit cheers' },
  { src: '/images/trust/flap-event.jpg',                        alt: 'FLAP event' },
  { src: '/images/trust/founders-meetup.jpg',                   alt: 'Founders meetup' },
  { src: '/images/trust/couch-talk.jpg',                        alt: 'Couch interview' },
  { src: '/images/trust/bybit-card.jpg',                        alt: 'ByBit card' },
  { src: '/images/trust/tech-candid.jpg',                       alt: 'Tech candid' },
]

// Split across three rows scrolling in alternating directions
const PER_ROW = Math.ceil(ITEMS.length / 3)
const ROW_1 = ITEMS.slice(0, PER_ROW)
const ROW_2 = ITEMS.slice(PER_ROW, PER_ROW * 2)
const ROW_3 = ITEMS.slice(PER_ROW * 2)

function MarqueeRow({ items, direction, duration }) {
  // Duplicate the set so the -50% loop is seamless
  const doubled = [...items, ...items]
  return (
    <div className="rin-works-row">
      <div
        className={`rin-works-row__track rin-works-row__track--${direction}`}
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {doubled.map((item, i) => (
          <div className="rin-works-card" key={`${item.src}-${i}`} aria-hidden={i >= items.length}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SectionWorks() {
  return (
    <section id="works" className="rin-section rin-section--narrow">
      <div className="rin-works__head" data-reveal>
        <p className="rin-eyebrow" style={{ marginBottom: '1rem' }}>Our work</p>
        <h2 className="rin-h2">Snaps from our beautiful works</h2>
        <p className="rin-body">
          We help our clients grow their bottom line with clear and cinematic storytelling.
        </p>
      </div>

      <div className="rin-works-marquee">
        <MarqueeRow items={ROW_1} direction="right" duration={42} />
        <MarqueeRow items={ROW_2} direction="left" duration={48} />
        <MarqueeRow items={ROW_3} direction="right" duration={54} />
      </div>
    </section>
  )
}
