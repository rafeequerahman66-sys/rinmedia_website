# RIN MEDIA — Strategy & Design System

> The strategic foundation for the redesign.
> Source of truth for all subsequent phases.

---

## 1. Brand Foundation

### What the logo tells us

The mark is a lowercase wordmark `rin` set in a rounded geometric sans-serif with **a green square replacing the dot of the `i`**. Read as a system, the geometry says four things:

| Element | Meaning | Implication for the site |
|---|---|---|
| **Lowercase `rin`** | Approachable, modern, calm. Not shouting. | Voice should be confident-quiet, not promotional. Headlines that observe, not pitch. |
| **Rounded geometry** | Soft technology. Friendly system. | UI uses generous radii (16–32px). Avoid sharp corners, except in micro-detail. |
| **Green square dot** | The *idea*. A pixel. A signal. A spark. | This is the **single visual unit** that becomes the protagonist. It assembles, multiplies, transforms across the site. |
| **Position: above the wordmark** | Ideas come first; the system catches them. | In the 3D system, the square always **leads** — it enters the frame before the supporting geometry assembles. |

### Brand personality

- **Calm** (not loud)
- **Intentional** (not playful)
- **Editorial** (not promotional)
- **Technological-warm** (not cold like SaaS, not glossy like agency)

If Linear is the developer's calm SaaS, **rin** is the founder's calm media partner.

---

## 2. Positioning

### Current vs. new

| | Current site | New direction (per brief) |
|---|---|---|
| **One-liner** | Premium creative production studio | The Content Operating System for Startups, AI Companies & Technology Brands |
| **Promise** | "WE DON'T DO NORMAL." | "Ideas In. Visibility Out." |
| **Value prop** | Cinematic storytelling | Your External Media Team |
| **Audience** | Brands, founders, builders, communities | Startups, SaaS, AI companies, founders, accelerators |
| **Frame** | Studio (you commission work) | Operating system / infrastructure (you plug into us) |

### Voice & tone rules

- **Use the founder's verb-first sentences.** Not "We make videos" — **"Make people watch."**
- **Treat each section like a single sentence of a manifesto.** Short, declarative, visual.
- **The green square narrates.** Wherever it appears in the 3D system, that's the moment of focus.
- **Never use the word "agency."** We are infrastructure.

### What we keep from current site
- All 17 client logos
- All 12 trust photos
- Both showreel videos (Founder Stories, Builder Events)
- "100+ Events / 50+ Founders / 1M+ Views / 1000+ Stories" stats
- Section headlines: "Content is everywhere / Attention isn't", "Most brands blend in / The best stories don't", "WE MAKE PEOPLE WATCH"
- These already align with the new positioning — they describe the problem (content/attention) and the system's purpose (making watchable work).

### What we evolve
- **Scene 01 hero**: "WE DON'T DO NORMAL." stays, but the supporting line becomes **"The Content Operating System for ambitious teams."** (Replaces "Creative Production Studio")
- **Scene 05 (Reveal)**: "We Are Rin Media" stays — supporting copy adds **"Your External Media Team"** as the explicit positioning line
- **Scene 06 (Services)**: Keep all six services, present them as a **content pipeline** (Capture → Create → Edit → Repurpose → Distribute) instead of disconnected cards
- **Scene 09 (Positioning)**: "We don't just make videos / We create stories people remember" stays — add a small line above it: **"Ideas In. Visibility Out."**

---

## 3. Design System

### Color tokens

```css
/* Surface */
--rin-bg:         #050505;   /* page background, deeper than current #000 */
--rin-surface:    #0E0E10;   /* cards, modals, elevated surfaces */
--rin-line:       #1F1F22;   /* dividers, hairlines */

/* Text */
--rin-text:       #FFFFFF;   /* primary */
--rin-text-2:     #A1A1AA;   /* secondary, captions, meta */
--rin-text-3:     #5A5A60;   /* tertiary, decorative numerals */

/* Accent — the green square */
--rin-green:      #C5E384;   /* primary accent — sparingly */
--rin-green-soft: rgba(197, 227, 132, 0.15);
--rin-green-glow: rgba(197, 227, 132, 0.45);
```

**Replaces** the current champagne-gold `#D9B26A` everywhere. The gold goes; the green takes over the same touchpoints (cursor hover, footer location, CTA pills, progress bar).

### Typography

```css
/* Headings — Space Grotesk (Google Fonts, free) */
--rin-font-head: 'Space Grotesk', 'Satoshi', system-ui, sans-serif;

/* Body — Inter (Google Fonts, free) */
--rin-font-body: 'Inter', system-ui, sans-serif;

/* Metadata / labels — JetBrains Mono (Google Fonts, free) */
--rin-font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

| Use | Font | Weight | Size |
|---|---|---|---|
| Hero display | Space Grotesk | 500 | clamp(3.5rem, 11vw, 11rem) |
| Section headlines | Space Grotesk | 500 | clamp(2.5rem, 6vw, 6rem) |
| Subheads | Space Grotesk | 500 | clamp(1.25rem, 2vw, 1.75rem) |
| Body | Inter | 400 | 1rem · 1.6 line-height |
| Labels / meta | JetBrains Mono | 400 | 11–13px · 0.18em tracking, UPPERCASE |
| Captions | Inter | 400 | 0.9rem |

Replaces Satoshi for headlines and body. Satoshi was good but unmemorable; Space Grotesk has the rounded geometric vocabulary that **matches the `rin` wordmark exactly** — same family of letterforms.

### Spacing & rhythm

8px baseline. Section vertical rhythm: 12vh between scenes, 8vh between blocks within a scene. Generous left/right padding: 6vw desktop, max(5vw, 1.25rem) mobile.

### Radius

| Use | Radius |
|---|---|
| Cards, surfaces | 24–32px |
| Buttons / pills | 999px (fully rounded) |
| Image tiles | 16px |
| Micro elements (chips, tags) | 8px |

### Motion tokens

```css
--ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);    /* primary */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* magnetic / playful */
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);     /* hero reveals */

--dur-1: 0.3s;   /* micro */
--dur-2: 0.6s;   /* hover / state */
--dur-3: 1.2s;   /* reveal */
--dur-4: 2.0s;   /* hero / loader */
```

---

## 4. Information Architecture

The 11-scene narrative stays — it's already strong. We **reframe** each scene to fit the Content OS positioning.

| # | Scene | Role | What changes |
|---|---|---|---|
| **01** | Hero | The thesis statement | Add Content Engine 3D scene (green square enters, multiplies). Sub-line becomes "The Content Operating System." |
| **02** | Pacing | The problem | Unchanged. "Content is everywhere / Attention isn't." Replace retro camera 3D with **first frame of Content Engine** — single green square floating, scale grows with scroll. |
| **03** | Transition | The premise | Unchanged. "Most brands blend in / The best stories don't." Replace movie-camera 3D with **green square fragmenting + reassembling**. |
| **04** | Purpose | The mission | Unchanged. "WE MAKE PEOPLE WATCH." Replace retro-computer 3D with **green squares forming a screen**. |
| **05** | Reveal | Studio identity | Add tagline: "Your External Media Team." Keep R3F rin-logo model if available, OR use a 3D version of the lowercase `rin` wordmark assembling. |
| **06** | **Capabilities → The Pipeline** | What we do | **Biggest restructure.** Transform 4 service cards into an **interactive horizontal pipeline**: `Capture → Create → Edit → Repurpose → Distribute`. The green square travels through stages, transforms at each, exits as visibility. |
| **07** | Work | Proof | Keep both showreels. Add tile dimmer + scrub-on-hover (Netflix style). Add category filter chip row above (`All · Brand Films · Event · Founder Stories`). |
| **08** | Clients | Trust | Keep editorial bento + 17-logo grid. Reduce visual noise — the bento has 12 photos, that's a lot; **trim to 6–8 strongest** for a tighter spread. |
| **09** | Positioning | The promise | Add "Ideas In. Visibility Out." above the existing headline. |
| **10** | Results | The numbers | Keep stats. Restyle as **terminal-readout aesthetic** (mono numbers, animated count, JetBrains Mono labels). |
| **11** | CTA | The close | Keep "Let's create something unforgettable." Add a second CTA option: **"Book a 15-min intro call"** with Calendly (if URL provided). |

### New: floating consultation button

A small persistent **`Talk to us`** pill, bottom-right after Scene 02 enters viewport. Subtle gold→green migration. Disappears in Scene 11 (we're already at the CTA).

---

## 5. The Content Engine — 3D system

Replaces the three retro device models with a single coherent system.

### The protagonist
A **single green square** (rounded corners, emissive `#C5E384`, slight float). It's the literal element from the logo.

### The pipeline
The square moves through 5 stages across the scroll:

```
[Scene 02]  IDEA              · single green square pulsing
[Scene 03]  CAPTURE           · square multiplies → grid of squares (a "shoot")
[Scene 04]  PRODUCTION        · squares align into a film strip
[Scene 06]  THE PIPELINE      · 5-stage horizontal animation, square transforms at each
[Scene 09]  VISIBILITY        · squares disperse outward into a starfield
```

Each scene shows **one stage** of the journey. The scroll itself becomes the timeline.

### Why not Spline?

The brief asks for Spline. Spline is a paid SaaS design tool that exports embeds. **Recommendation: skip Spline.** Reasons:
1. We already have R3F + Drei in the stack — no new dependency
2. Spline embeds add 1–3MB to first paint
3. We have full control in code (we can scrub the 3D scene to scroll progress; Spline does this but less flexibly)
4. R3F geometry rendering one rounded square is ~50 lines of code

If you specifically want the Spline workflow (editing in their visual tool), we can revisit — but I'd push back.

### Mobile fallback
The Content Engine renders at full quality on desktop. On mobile (<720px):
- Drop point lights to 1
- Reduce instanced mesh count by 50%
- Disable camera sway
- Pause when off-screen (IntersectionObserver)

Target: 60fps on iPhone 12, 30fps on iPhone SE.

---

## 6. Motion System

### Principles

1. **Motion narrates** — every animation reveals meaning, not decoration
2. **Slow in, fast out** — `cubic-bezier(0.22, 1, 0.36, 1)` for cinematic feel
3. **Stagger is hierarchy** — never simultaneous reveals; 80–120ms stagger
4. **Scroll is time** — pin scenes, scrub animations to scroll progress, don't autoplay

### Animation library

| Pattern | Use | Trigger | Duration |
|---|---|---|---|
| Char-by-char text reveal | Big headlines (Scenes 2, 3, 4, 9, 11) | scroll-into-view | 1.2s, 35ms stagger per char |
| Mask wipe | Section transitions | scroll | 0.6s |
| Magnetic button | "Start a Project", "Book a Call", "Talk to Us" | hover | 0.3s spring |
| Logo cell lift | Trust grid hover | hover | 0.3s |
| Number count-up | Scene 10 stats | view enter once | 2s ease-out |
| Image parallax | Project tiles, hero photo | scroll scrub | continuous |
| Green-square pulse | The hero, idle state | infinite loop | 3s |

### Remove
- The current scene-by-scene fade-up (replace with char-by-char reveal)
- The current "scroll to explore" right-side scroll indicator (replaced by centered mouse-icon, but on hero only — other scenes don't need it)

---

## 7. Conversion Strategy

### Lead capture priorities (in order)

1. **Email** (`rinmedia.xyz@gmail.com` via mailto) — current primary
2. **Calendly booking** — *needs URL from you* — secondary CTA
3. **Newsletter signup** — optional, low priority for B2B media

### CTA inventory

| Location | Current | Updated |
|---|---|---|
| Navbar | None | `Book a Call` pill (green accent) |
| Hero | `View Our Work` (scrolls to Scene 07) | Keep + add `Book a Call` as secondary |
| After Scene 02 | None | Floating `Talk to us` pill, lower-right |
| Project tiles (Scene 07) | `↗` arrow | Keep + add `Inquire about this project` on tile hover |
| Scene 11 CTA | `Start a Project` (mailto) | Keep + add `Book a 15-min intro call` (Calendly) |
| Footer | Email link | Keep |

### Sticky CTA rules
- Appears after user passes hero (scroll > 100vh)
- Disappears in Scene 11 (they've reached the CTA scene already)
- On mobile: collapses to icon-only pill in lower-right safe area

### Lead flow
- All CTAs route to the same Calendly OR same mailto — no fragmentation
- Mailto bodies are **prefilled** with context (project type, source CTA)
- Example: `Start a Project` mailto subject: `New Project — RIN MEDIA`, body: `Hi Rin Media, I'd like to start a project. About me: [...]`

---

## 8. Mobile Strategy

### Breakpoints

```css
sm:  640px   /* large phone */
md:  720px   /* tablet portrait */
lg:  1024px  /* tablet landscape / small desktop */
xl:  1280px  /* desktop */
2xl: 1536px  /* large desktop */
```

### Mobile-first rules
- All padding floored at `max(5vw, 1.25rem)`
- Tap targets ≥ 44px (Apple HIG)
- Burger nav under 720px (already done)
- 3D scenes downsample on mobile (lower DPR, fewer instances)
- Videos `preload="metadata"` not `auto`
- Trust bento collapses to single column on mobile
- Client logo grid: 4 cols on tablet, 2 cols on phone

### Performance budget

| Metric | Desktop | Mobile |
|---|---|---|
| LCP (largest contentful paint) | < 1.8s | < 2.5s |
| FID (first input delay) | < 100ms | < 100ms |
| CLS (cumulative layout shift) | < 0.05 | < 0.05 |
| Lighthouse Performance | 95+ | 90+ |
| Bundle JS gzipped | < 250kB | < 200kB |
| LCP image | < 100kB | < 60kB |

Current bundle is 432kB gzipped — too heavy. We'll code-split R3F and the loader.

---

## 9. Tech stack decision — **stay on Vite + React + R3F**

The brief specifies Next.js 15 + TypeScript + ShadCN + Spline. **My recommendation: don't migrate.** Reasons:

| Concern | Next.js argument | Counter-argument for current stack |
|---|---|---|
| SEO / SSR | Next does SSR/SSG | Site is fully static after JS hydration. SEO is fine — meta tags, OG cards via `react-helmet`. |
| File-based routing | Next does this | Site is single-page narrative. Routes aren't needed. |
| Image optimization | `next/image` | Vite + `unplugin-imagemin` does the same; current photos already hand-optimized. |
| API routes | Next | Site has zero backend logic. Mailto handles inquiries. |
| Build speed | Both fast | Vite is already faster than Next dev. |
| Type safety | TypeScript via Next | We can add TS to current Vite project in 1 commit (it just works). |
| ShadCN | ShadCN is Next-friendly | ShadCN works in any React project — we already have Tailwind. |
| Spline | Spline is framework-agnostic | If we want Spline, we add it. But I recommend against (see §5). |

**What I'd add to current stack:**
- TypeScript (gradual migration — start with `allowJs: true`, convert files as we touch them)
- ShadCN UI primitives (Button, Card, Dialog) — drop-in components for any new UI
- `react-helmet-async` for proper SEO meta

**Net result:** 0 days lost to migration, ~70 commits of polish preserved, room to add TS + ShadCN incrementally.

**If you insist on Next.js**, I'll do it — just confirm and budget 2 weeks for the migration before any new features ship.

---

## 10. Phase roadmap

| Phase | Output | Status | When |
|---|---|---|---|
| **1** | Audit | ✅ done | (last turn) |
| **2** | This strategy doc | ✅ done | **(this turn)** |
| **3** | Design tokens swap | gold→green, font swap to Space Grotesk + Inter + JetBrains Mono | next session, 1 commit |
| **4** | Update existing scenes to new tokens | text style updates, accent swap throughout | 1 commit |
| **5** | Build the green-square 3D protagonist | R3F component, replaces retro-camera in Scene 02 | 1 commit |
| **6** | Roll out the Content Engine through Scenes 03, 04, 09 | square evolves through pipeline | 2 commits |
| **7** | Scene 06 — services as pipeline | biggest visual restructure | 1 commit |
| **8** | Polish — char-by-char headline reveals, terminal stat counters, floating Talk to Us pill | 2 commits |
| **9** | Add TypeScript gradually, add ShadCN button + dialog | optional, 1 commit |
| **10** | Mobile QA + perf optimization | 1 commit |
| **11** | Calendly wiring (when URL provided) | 1 commit |

**~10 focused sessions** to fully execute the brief on the existing stack. Each commit is reversible.

---

## 11. Open questions for you

Before I move to Phase 3 (executing the token swap), please confirm:

1. **Strategy doc approved** — anything you'd add, remove, or change? Especially around positioning and voice.
2. **Tech stack** — are you OK staying on Vite + React + R3F (per my recommendation), or do you want the Next.js migration?
3. **Calendly URL** — paste it when ready; I'll wire it into the CTAs.
4. **Bento trim** — Scene 08 currently has 12 trust photos. Are you OK if I trim to 6–8 of the strongest to reduce visual noise? If yes, I'll pick.
5. **Subscript edits**:
   - Replace "Creative Production Studio" (hero supporting line) with **"The Content Operating System"**?
   - Add **"Your External Media Team"** as the Scene 05 supporting line?
   - Add **"Ideas In. Visibility Out."** above Scene 09 headline?
   - These are the only copy changes I'd recommend; they're how the new positioning becomes visible.

---

*Strategy doc complete. Awaiting your go-ahead for Phase 3 (token swap) or any revisions.*
