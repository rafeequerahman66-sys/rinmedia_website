const TAGS = [
  'Brand Films',
  'Event Coverage',
  'AI Ads',
  'Explainer Videos',
  'Podcasting',
  'Founder Videos',
  'AI Avatars',
  'Social Content',
  'Motion Graphics',
  'Aftermovies',
  'Launch Films',
  '3D Animation',
  'UI/UX Design',
  'Brand Design',
]

export default function SectionCapabilities() {
  return (
    <section id="capabilities" className="rin-section">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
        <p className="rin-eyebrow" style={{ marginBottom: '1rem' }}>Our capabilities</p>
        <h2 className="rin-h2">We can help you with…</h2>
      </div>

      <div className="rin-tags" data-reveal>
        {TAGS.map((tag) => (
          <span className="rin-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </section>
  )
}
