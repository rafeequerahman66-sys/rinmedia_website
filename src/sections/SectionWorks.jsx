import { useState } from 'react'

const ITEMS = [
  { src: '/images/trust/Nova Residency - Launch day (14).jpg',  alt: 'Nova Residency — launch day' },
  { src: '/images/trust/demo day.JPG',                          alt: 'Demo day at Zo House' },
  { src: '/images/trust/OCU_0778.JPG',                          alt: 'Speaker at a Rin Media event' },
  { src: '/images/trust/DSC05073.jpg',                          alt: 'Monad Blitz group photo' },
  { src: '/images/trust/DSC06731.jpg',                          alt: 'ByBit catering' },
  { src: '/images/trust/bybit-booth.jpg',                       alt: 'ByBit booth activation' },
  { src: '/images/trust/founder-chat.jpg',                      alt: 'Founder interview' },
  { src: '/images/trust/monad-blitz.jpg',                       alt: 'Monad Blitz hackathon' },
  { src: '/images/trust/rooftop-dinner.jpg',                    alt: 'Rooftop founders dinner' },
  { src: '/images/trust/Consumer Ai Breakout - Boundless VC.jpg', alt: 'Consumer AI Breakout — Boundless VC' },
  { src: '/images/trust/bybit-cheers.jpg',                      alt: 'ByBit cheers' },
  { src: '/images/trust/flap-event.jpg',                        alt: 'FLAP event' },
  { src: '/images/trust/founders-meetup.jpg',                   alt: 'Founders meetup' },
  // hidden by default
  { src: '/images/trust/couch-talk.jpg',                        alt: 'Couch interview' },
  { src: '/images/trust/bybit-card.jpg',                        alt: 'ByBit card' },
  { src: '/images/trust/tech-candid.jpg',                       alt: 'Tech candid' },
]

const VISIBLE_COUNT = 8

export default function SectionWorks() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="works" className="rin-section">
      <div className="rin-works__head" data-reveal>
        <p className="rin-eyebrow" style={{ marginBottom: '1rem' }}>Our work</p>
        <h2 className="rin-h2">Snaps from our beautiful works</h2>
        <p className="rin-body">
          We help our clients grow their bottom line with clear and cinematic storytelling.
        </p>
      </div>

      <div className="rin-works__grid">
        {ITEMS.map((item, i) => {
          const isHidden = i >= VISIBLE_COUNT && !expanded
          return (
            <a
              key={item.src}
              className="rin-works__item"
              href={item.src}
              target="_blank"
              rel="noreferrer"
              style={{ display: isHidden ? 'none' : 'block' }}
              data-reveal
            >
              <img src={item.src} alt={item.alt} loading="lazy" draggable="false" />
            </a>
          )
        })}
      </div>

      {!expanded && ITEMS.length > VISIBLE_COUNT && (
        <div className="rin-works__more">
          <button className="rin-btn rin-btn--outline" onClick={() => setExpanded(true)}>
            Load More
          </button>
        </div>
      )}
    </section>
  )
}
