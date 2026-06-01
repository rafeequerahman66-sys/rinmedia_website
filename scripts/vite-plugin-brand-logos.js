/**
 * Vite plugin: virtual:brand-logos
 *
 * Auto-scans /public/brand-logos/ at build time AND watches for changes during
 * dev. Exposes a virtual module that resolves to a list of every logo file in
 * that folder. Drop a new logo into the folder → it appears on the site with
 * no code changes and no manual import.
 *
 * Usage:
 *   import logos from 'virtual:brand-logos'
 *   // logos = [{ slug: 'solana', name: 'Solana', url: '/brand-logos/solana.svg' }, ...]
 */
import fs from 'node:fs'
import path from 'node:path'

const VIRTUAL_ID = 'virtual:brand-logos'
const RESOLVED_ID = '\0' + VIRTUAL_ID
const EXT_RE = /\.(svg|png|webp|jpe?g)$/i

function slugToName(slug) {
  // "bnb-chain" → "BNB Chain", "0g-labs" → "0G Labs", "together-fund" → "Together Fund"
  return slug
    .split(/[-_]/)
    .map(part => {
      if (/^[a-z]?\d/i.test(part)) return part.toUpperCase()      // 0g, 2049 → uppercase
      if (part.length <= 3) return part.toUpperCase()              // bnb, p2p, vc → uppercase
      return part.charAt(0).toUpperCase() + part.slice(1)         // others → Title Case
    })
    .join(' ')
}

export default function brandLogosPlugin() {
  let publicDir = ''

  function scan() {
    const dir = path.join(publicDir, 'brand-logos')
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter(f => EXT_RE.test(f))
      // Files starting with a NN- prefix sort FIRST (lower number = earlier).
      // Everything else sorts alphabetically after them.
      .sort((a, b) => a.localeCompare(b))
      .map(file => {
        // Strip optional "NN-" sort prefix so the slug/display name stay clean.
        const stem = file.replace(EXT_RE, '')
        const slug = stem.replace(/^\d+-/, '')
        return {
          slug,
          name: slugToName(slug),
          url: `/brand-logos/${file}`,
          file,
        }
      })
  }

  return {
    name: 'rin-media:brand-logos',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id === RESOLVED_ID) {
        const logos = scan()
        return `export default ${JSON.stringify(logos, null, 2)};`
      }
    },
    configureServer(server) {
      const dir = path.join(publicDir, 'brand-logos')
      // Use Vite's watcher (chokidar) so we pick up adds/removes/renames
      server.watcher.add(dir)
      const reload = (file) => {
        if (!file.includes('brand-logos')) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload', path: '*' })
      }
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
      server.watcher.on('change', reload)
    },
  }
}
