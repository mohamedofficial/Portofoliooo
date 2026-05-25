import { renderMarkdown } from '../utils/markdownUtils'

const rawPosts = [
  {
    id: 'post-1',
    title: 'Getting started with HTB: first steps',
    date: '2026-05-20',
    category: 'HTB',
    excerpt: 'A short guide to begin with Hack The Box labs and basic workflow.',
    raw: `# Getting started with HTB\n\nThis post covers the first steps to get started with Hack The Box...`,
  },
  {
    id: 'post-2',
    title: 'Android reversing: tooling and tips',
    date: '2026-04-15',
    category: 'Android',
    excerpt: 'Quick overview of useful tools when reversing Android apps.',
    raw: `# Android reversing\n\nNotes on APK tooling, frida, jadx and common pitfalls.`,
  },
  {
    id: 'post-3',
    title: 'Reversing 101: binary basics',
    date: '2026-03-09',
    category: 'Reversing',
    excerpt: 'Introductory notes for reversing beginners.',
    raw: `# Binary reversing basics\n\nHow to read assembly, use gdb and static analysis.`,
  }
]

const posts = rawPosts.map(p => ({
  ...p,
  html: renderMarkdown(p.raw),
}))

export default posts
