import { motion } from 'framer-motion'

export default function Footer() {
  const year = 2024
  return (
    <footer className="rin-footer">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="rin-footer__inner"
      >
        <span className="rin-footer__brand">Rin Media</span>

        <div className="rin-footer__meta">
          <span className="rin-footer__location">Made with care in Bengaluru 🌴</span>
          <span className="rin-footer__sep" />
          <span>© {year}</span>
          <span className="rin-footer__sep" />
          <a href="mailto:rinmedia.xyz@gmail.com">rinmedia.xyz@gmail.com</a>
        </div>
      </motion.div>
    </footer>
  )
}
