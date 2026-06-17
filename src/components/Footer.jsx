export default function Footer() {
  return (
    <footer className="rin-footer">
      <div className="rin-footer__inner">
        <div className="rin-footer__brand">
          <span style={{
            width: 9, height: 9, borderRadius: '50%',
            background: 'var(--lime)', boxShadow: '0 0 14px var(--lime-glow)',
          }} />
          <span>Rin Media</span>
        </div>
        <div className="rin-footer__meta">
          <span>© 2024</span>
          <a href="mailto:rinmedia.xyz@gmail.com">rinmedia.xyz@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}
