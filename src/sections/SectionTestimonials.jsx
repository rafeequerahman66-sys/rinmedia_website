import { Tweet } from 'react-tweet'

const TWEET_IDS = [
  '2064352315453386874', // @kalamazooooo
  '2026215711010619627', // @Monad_APAC
  '2048766614011846819', // @BLRxZo
  '1999442739377897811', // @BybitSouthasia
  '2065074832891682975', // @rafeeque_w3k
  '2058526074322255978', // @BLRxZo
]

export default function SectionTestimonials() {
  return (
    <section id="testimonials" className="rin-section">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
        <h2 className="rin-h2">Our Works</h2>
      </div>

      <div className="rin-tweet-grid">
        {TWEET_IDS.map((id, i) => (
          <div className="rin-tweet" key={`${id}-${i}`} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
            <Tweet id={id} />
          </div>
        ))}
      </div>
    </section>
  )
}
