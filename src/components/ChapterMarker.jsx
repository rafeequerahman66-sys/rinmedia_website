/**
 * Small chapter numeral pinned to top-right of a scene.
 * Blockwee / Linear style — gives the user a sense of progress.
 *
 *   <ChapterMarker n={3} total={11} label="Pacing" />  →  03 — Pacing — 11
 */
export default function ChapterMarker({ n, total = 11, label }) {
  const pad = (v) => String(v).padStart(2, '0')
  return (
    <div className="rin-chapter" aria-hidden>
      <span className="rin-chapter__num">{pad(n)}</span>
      <span className="rin-chapter__divider" />
      {label && <span>{label}</span>}
      {label && <span className="rin-chapter__divider" />}
      <span>{pad(total)}</span>
    </div>
  )
}
