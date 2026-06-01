#!/usr/bin/env node
/**
 * Fetches brand logos from the Brandfetch Brand API and saves them to
 * public/brand-logos/<slug>.<ext>. Runs once at build time so the secret API
 * key never reaches the browser.
 *
 * Usage:
 *   BRANDFETCH_API_KEY=your_key node scripts/fetch-brand-logos.mjs
 *
 * Picks the best logo per brand using this preference:
 *   1. format=svg  +  type=logo + theme=dark
 *   2. format=svg  +  type=logo
 *   3. format=svg  +  type=icon
 *   4. format=png  +  type=logo (largest size)
 *   5. format=png  +  type=icon (largest size)
 */

import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.resolve(PROJECT_ROOT, 'public', 'brand-logos')
const MANIFEST_PATH = path.resolve(OUT_DIR, 'manifest.json')
const ENV_PATH = path.resolve(PROJECT_ROOT, '.env')

// --- Minimal .env loader (no deps needed) ---
function loadEnv(filepath) {
  if (!fsSync.existsSync(filepath)) return
  const text = fsSync.readFileSync(filepath, 'utf8')
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    // strip optional surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key && !(key in process.env)) {
      process.env[key] = val
    }
  }
}
loadEnv(ENV_PATH)

// Only brands Rin Media has actually worked with. Keep this list in sync with
// PARTNERS in src/scenes/Scene08Trust.jsx.
const PARTNERS = [
  { slug: 'solana',        domain: 'solana.com' },
  { slug: 'avalanche',     domain: 'avax.network' },
  { slug: 'bnb-chain',     domain: 'bnbchain.org' },
  { slug: 'supra',         domain: 'supra.com' },
  { slug: 'movement',      domain: 'movementlabs.xyz' },
  { slug: 'monad',         domain: 'monad.xyz' },
  { slug: '0g-labs',       domain: '0g.ai' },
  { slug: 'p2p',           domain: 'p2p.org' },
  { slug: 'mudrex',        domain: 'mudrex.com' },
  { slug: 'token2049',     domain: 'token2049.com' },
  { slug: 'zo-house',      domain: 'zo.xyz' },
  { slug: 'together-fund', domain: 'together.fund' },
]

const API_KEY = process.env.BRANDFETCH_API_KEY
if (!API_KEY) {
  console.error('❌ BRANDFETCH_API_KEY is empty.')
  console.error('   1. Get a free key at https://brandfetch.com/developers')
  console.error(`   2. Paste it into  ${ENV_PATH}`)
  console.error('   3. Re-run:  npm run fetch-logos')
  process.exit(1)
}
console.log(`🔑  Using Brandfetch key ${API_KEY.slice(0, 6)}…${API_KEY.slice(-4)}`)
console.log(`📦  Output: ${OUT_DIR}\n`)

// Search Brandfetch for the brand by domain → returns brandId + a signed CDN
// icon URL. We then upgrade that URL to request a larger logo SVG and download.
async function searchBrand(domain) {
  const url = `https://api.brandfetch.io/v2/search/${domain}?c=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`search HTTP ${res.status}`)
  const list = await res.json()
  if (!Array.isArray(list) || !list.length) return null
  // Prefer the verified result matching this exact domain.
  const exact = list.find(b => b.domain === domain) || list[0]
  return exact
}

function variantsFromIconUrl(iconUrl) {
  // The search response gives e.g.:
  //   https://cdn.brandfetch.io/{bid}/w/128/h/128/fallback/lettermark/icon.webp?c={cdnId}
  // Try, in priority order: a high-res SVG logo, hi-res WebP logo, hi-res icon, original
  const hi = iconUrl.replace('/w/128/h/128/', '/w/512/h/512/')
  return [
    { url: hi.replace('icon.webp', 'logo.svg'), ext: 'svg' },
    { url: hi.replace('icon.webp', 'logo.webp'), ext: 'webp' },
    { url: hi.replace('icon.webp', 'symbol.svg'), ext: 'svg' },
    { url: hi.replace('icon.webp', 'icon.svg'), ext: 'svg' },
    { url: hi, ext: 'webp' }, // hi-res icon
    { url: iconUrl, ext: 'webp' }, // original icon as last resort
  ]
}

// Inspect actual file bytes — Brandfetch sometimes returns image bytes with
// a mismatched content-type (e.g. WebP bytes labeled image/svg+xml).
function detectExt(buf) {
  // SVG (text-based) — XML/SVG prolog
  const head = buf.slice(0, 256).toString('utf8').trimStart().toLowerCase()
  if (head.startsWith('<?xml') || head.startsWith('<svg')) return 'svg'
  // PNG magic: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png'
  // WebP magic: RIFF....WEBP
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
      buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'webp'
  // JPEG magic: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg'
  return null
}

async function tryDownload(variants, destStem) {
  for (const v of variants) {
    try {
      const res = await fetch(v.url, { redirect: 'follow' })
      if (!res.ok) continue
      const ct = res.headers.get('content-type') || ''
      if (!ct.startsWith('image/')) continue
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 200) continue // probably a placeholder
      // Trust the actual bytes, not the content-type header.
      const ext = detectExt(buf)
      if (!ext) continue
      const dest = `${destStem}.${ext}`
      await fs.writeFile(dest, buf)
      return { dest, ext, ct, size: buf.length, source: v.url }
    } catch {
      continue
    }
  }
  return null
}

function hashBuffer(buf) {
  return crypto.createHash('sha1').update(buf).digest('hex').slice(0, 16)
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const manifest = {}
  const downloaded = [] // { slug, dest, hash, meta }

  for (const p of PARTNERS) {
    process.stdout.write(`→ ${p.slug.padEnd(18)}  `)
    try {
      const brand = await searchBrand(p.domain)
      if (!brand) {
        console.log(`⚠️  not found`)
        manifest[p.slug] = { error: 'not-found', domain: p.domain }
        continue
      }
      const variants = variantsFromIconUrl(brand.icon)
      const stem = path.join(OUT_DIR, p.slug)
      const result = await tryDownload(variants, stem)
      if (!result) {
        console.log(`⚠️  no image variant succeeded`)
        manifest[p.slug] = { error: 'no-image', domain: p.domain, brandId: brand.brandId }
        continue
      }
      const buf = await fs.readFile(result.dest)
      const hash = hashBuffer(buf)
      downloaded.push({
        slug: p.slug,
        dest: result.dest,
        hash,
        ext: result.ext,
        size: result.size,
        brand,
      })
      console.log(`✓ ${result.ext.padEnd(4)} ${(result.size / 1024).toFixed(1).padStart(5)}KB  ${hash}  ${brand.name}${brand.verified ? ' ✔︎' : ''}`)
    } catch (err) {
      console.log(`✗ ${err.message}`)
      manifest[p.slug] = { error: err.message, domain: p.domain }
    }
  }

  // Detect Brandfetch placeholder logos: any hash appearing 2+ times is a
  // shared default/watermark image, not a real brand logo.
  const hashCounts = {}
  for (const d of downloaded) hashCounts[d.hash] = (hashCounts[d.hash] || 0) + 1
  const placeholderHashes = new Set(Object.entries(hashCounts).filter(([, c]) => c > 1).map(([h]) => h))

  if (placeholderHashes.size > 0) {
    console.log(`\n🧹 Removing ${placeholderHashes.size} placeholder hash(es) used by multiple brands:`)
  }

  for (const d of downloaded) {
    if (placeholderHashes.has(d.hash)) {
      console.log(`   ✗ ${d.slug.padEnd(18)} (shared placeholder)`)
      await fs.unlink(d.dest).catch(() => {})
      manifest[d.slug] = { error: 'placeholder-detected', domain: d.brand.domain, brandId: d.brand.brandId }
      continue
    }
    manifest[d.slug] = {
      domain: d.brand.domain,
      name: d.brand.name,
      brandId: d.brand.brandId,
      verified: d.brand.verified,
      file: `/brand-logos/${d.slug}.${d.ext}`,
      format: d.ext,
      size: d.size,
      hash: d.hash,
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
  const kept = Object.values(manifest).filter(m => !m.error).length
  console.log(`\n✔ ${kept} real logos kept of ${PARTNERS.length} brands.`)
  console.log(`✔ Manifest written to ${MANIFEST_PATH}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
