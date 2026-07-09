export default function SectionContact() {
  return (
    <section id="contact" className="rin-contact">
      <div className="rin-contact__glow" aria-hidden />
      <div className="rin-contact__inner" data-reveal>
        <p className="rin-eyebrow">Get in touch</p>
        <h2 className="rin-h2 rin-contact__h2">Let's bring your story to life.</h2>
        <p className="rin-body rin-contact__sub">
          Tell us what you're building. We'll show you how to make people watch.
        </p>
        <div className="rin-contact__ctas">
          <a
            className="rin-btn rin-btn--lime"
            href="https://calendly.com/rafeequerahman66/30min"
            target="_blank"
            rel="noreferrer"
          >
            Book a call ↗
          </a>
          <a className="rin-btn rin-btn--outline" href="mailto:rinmedia.xyz@gmail.com">
            rinmedia.xyz@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
