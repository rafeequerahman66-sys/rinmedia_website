import { Tweet } from 'react-tweet'

const TWEET_IDS = [
  '2064352315453386874', // @kalamazooooo
  '2026215711010619627', // @Monad_APAC
  '2048766614011846819', // @BLRxZo
  '1999442739377897811', // @BybitSouthasia
  '2065074832891682975', // @rafeeque_w3k
  '2058526074322255978', // @BLRxZo
  '2043706728953622753', // @nitprashant
  '2054195733751091707', // @BybitSouthasia
  '2056345471170601309', // @BLRxZo
  '2055271510747865228', // @WTFxZo
  '2038594548885307406', // @insidrcommunity
  '2036768540758515720', // @BLRxZo
  '2010703714420453411', // @rinmedia_xyz
  '1937542503286341977', // @Atlantis_p2p
  '2054150944485720100', // @deepansh_see
]

// Split across two rows that scroll in opposite directions
const MID = Math.ceil(TWEET_IDS.length / 2)
const ROW_TOP = TWEET_IDS.slice(0, MID)
const ROW_BOTTOM = TWEET_IDS.slice(MID)

function MarqueeRow({ ids, direction }) {
  // Duplicate the set so the -50% loop is seamless
  const doubled = [...ids, ...ids]
  return (
    <div className="rin-tweet-row">
      <div className={`rin-tweet-row__track rin-tweet-row__track--${direction}`}>
        {doubled.map((id, i) => (
          <div className="rin-tweet" key={`${id}-${i}`} aria-hidden={i >= ids.length}>
            <Tweet id={id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SectionTestimonials() {
  return (
    <section id="testimonials" className="rin-section">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
        <h2 className="rin-h2">Our Works</h2>
      </div>

      <div className="rin-tweet-marquee">
        <MarqueeRow ids={ROW_TOP} direction="right" />
        <MarqueeRow ids={ROW_BOTTOM} direction="left" />
      </div>
    </section>
  )
}
