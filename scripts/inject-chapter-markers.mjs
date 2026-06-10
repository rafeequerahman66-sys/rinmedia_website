#!/usr/bin/env node
// One-off: inject <ChapterMarker /> as first child of each scene's <section>.
// Idempotent — skips files that already have it.

import fs from 'node:fs'
import path from 'node:path'

const CHAPTERS = [
  { n: 1,  file: 'Scene01Hero.jsx',         label: 'Intro' },
  { n: 2,  file: 'Scene02Pacing.jsx',       label: 'Pacing' },
  { n: 3,  file: 'Scene03Transition.jsx',   label: 'Story' },
  { n: 4,  file: 'Scene04Purpose.jsx',      label: 'Purpose' },
  { n: 5,  file: 'Scene05Reveal.jsx',       label: 'Studio' },
  { n: 6,  file: 'Scene06Capabilities.jsx', label: 'Craft' },
  { n: 7,  file: 'Scene07Work.jsx',         label: 'Work' },
  { n: 8,  file: 'Scene08Trust.jsx',        label: 'Clients' },
  { n: 9,  file: 'Scene09Positioning.jsx',  label: 'Stand' },
  { n: 10, file: 'Scene10Results.jsx',      label: 'Impact' },
  { n: 11, file: 'Scene11CTA.jsx',          label: 'Contact' },
]

let total = 0
for (const c of CHAPTERS) {
  const filepath = path.join('src/scenes', c.file)
  let src = fs.readFileSync(filepath, 'utf8')
  if (src.includes('<ChapterMarker')) {
    console.log('=', c.file, '(already has marker)')
    continue
  }
  const idStr = String(c.n).padStart(2, '0')
  // Match <section ... id="scene-XX" ... > spanning multiple lines.
  const sectionRe = new RegExp('(<section\\b[^>]*id="scene-' + idStr + '"[\\s\\S]*?>)')
  if (!sectionRe.test(src)) {
    console.log('✗', c.file, '(no section match)')
    continue
  }
  src = src.replace(sectionRe, '$1\n      <ChapterMarker n={' + c.n + '} label="' + c.label + '" />')
  fs.writeFileSync(filepath, src)
  console.log('✓', c.file)
  total++
}
console.log('Total:', total)
