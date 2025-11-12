import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// Configure marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('Highlight error:', err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Markdown content
 * @returns {Object} - { frontmatter: Object, content: string }
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (match) {
    const frontmatterStr = match[1]
    const markdownContent = match[2]
    const frontmatter = {}
    
    frontmatterStr.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
      }
    })
    
    return { frontmatter, content: markdownContent }
  }
  
  return { frontmatter: null, content }
}

/**
 * Render markdown to HTML
 * @param {string} raw - Raw markdown content
 * @returns {string} - HTML string
 */
export function renderMarkdown(raw) {
  try {
    // Don't strip markers - render everything as is
    const html = marked.parse(raw)
    return html
  } catch (error) {
    console.error('Markdown rendering error:', error)
    return `<pre>${escapeHtml(raw)}</pre>`
  }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

/**
 * Extract image references from markdown
 * @param {string} content - Markdown content
 * @returns {Array} - Array of image paths
 */
export function extractImageReferences(content) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g
  const images = []
  let match
  
  while ((match = imageRegex.exec(content)) !== null) {
    const imagePath = match[1]
    // Check if it's a local path (not http/https)
    if (!imagePath.startsWith('http') && !imagePath.startsWith('//')) {
      images.push(imagePath)
    }
  }
  
  return images
}

