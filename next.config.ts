import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // I file .mdx si possono importare come componenti (contenuti delle lezioni in content/lezioni/).
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

// Plugin indicati per nome (stringhe): è il formato richiesto da Turbopack.
// - remark-gfm: tabelle, liste di controllo e testo barrato, come in Obsidian
// - remark-frontmatter + remark-mdx-frontmatter: le proprietà in cima al file (tra ---) diventano
//   l'export "frontmatter" della lezione (il filo, il lab, il bottino, ...)
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter', 'remark-mdx-frontmatter'],
  },
})

export default withMDX(nextConfig)
