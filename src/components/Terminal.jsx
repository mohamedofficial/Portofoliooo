import { useState, useEffect, useRef } from 'react'
import './Terminal.css'

function Terminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to the terminal. Type "help" for available commands.' }
  ])
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  about    - About me',
      '  ls       - List files',
      '  cat      - Read a file',
      '  clear    - Clear terminal',
      '  whoami   - Display username',
      ''
    ],
    about: () => [
      'white Hacker (0xmvmd)',
      'Security researcher and developer',
      'Passionate about cybersecurity and coding',
      ''
    ],
    ls: () => [
      'about.md',
      'projects.md',
      'blog.md',
      'contact.md',
      ''
    ],
    cat: (args) => {
      if (!args || args.trim() === '') {
        return ['Usage: cat <filename>', '']
      }
      const files = {
        'about.md': '# About\n\nSecurity researcher and developer...',
        'projects.md': '# Projects\n\nList of projects...',
        'blog.md': '# Blog\n\nRecent posts...',
        'contact.md': '# Contact\n\nGet in touch...'
      }
      const content = files[args.trim()]
      if (content) {
        return [content, '']
      }
      return [`File not found: ${args}`, '']
    },
    clear: () => [],
    whoami: () => ['0xmvmd', '']
  }

  const handleCommand = (cmd) => {
    const parts = cmd.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    setHistory(prev => [...prev, { type: 'input', content: cmd }])

    if (commands[command]) {
      const output = commands[command](args)
      if (command === 'clear') {
        setHistory([])
      } else {
        output.forEach(line => {
          setHistory(prev => [...prev, { type: 'output', content: line }])
        })
      }
    } else if (cmd.trim() !== '') {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `Command not found: ${command}. Type "help" for available commands.` 
      }])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="terminal" ref={terminalRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="button red"></span>
          <span className="button yellow"></span>
          <span className="button green"></span>
        </div>
        <span className="terminal-title">terminal</span>
      </div>
      <div className="terminal-body">
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'input' && <span className="prompt">$ </span>}
            <span>{item.content}</span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <span className="prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}

export default Terminal

