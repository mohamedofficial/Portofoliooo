# Dark Hacker Mario Portfolio

Portfolio website with a dark hacker/Mario theme. Built with React + Vite.

## Features

- 🎨 Dark theme with Mario-inspired red accents (#e63946)
- 📝 Markdown file uploader and renderer (drag & drop)
- 💻 Interactive Terminal component
- 📱 Responsive design (320px - 1920px)
- 🚀 GitHub Pages ready
- 🔤 Custom fonts: VT323 (headings) & Space Grotesk (body)

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Build

```bash
npm run build
```

The `dist` folder will contain the static site ready for deployment.

## Configuration

### Base Path for GitHub Pages

If deploying to GitHub Pages, you need to configure the base path:

1. Create a `.env` file in the root directory:
   ```
   VITE_BASE_PATH=/your-repo-name/
   ```
   Replace `your-repo-name` with your actual repository name.

2. Update `package.json` homepage field:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. For custom domain, set `VITE_BASE_PATH=/` in `.env`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
first_try/
├── src/
│   ├── components/      # React components (Layout, Terminal, MarkdownViewer)
│   ├── pages/          # Page components (Home, About, Projects, Blog, Contact)
│   ├── utils/          # Utility functions (markdownUtils)
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## Usage

### Markdown Upload

1. Go to the Blog page
2. Drag & drop Markdown files or click to select
3. View rendered content with syntax highlighting
4. Toggle between rendered and raw view
5. Frontmatter (YAML) is automatically extracted and displayed as metadata

### Terminal Commands

Available commands in the Terminal component:
- `help` - Show available commands
- `about` - Display about information
- `ls` - List files
- `cat <filename>` - Read a file
- `clear` - Clear terminal
- `whoami` - Display username

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Marked** - Markdown parser
- **Highlight.js** - Syntax highlighting
- **React Dropzone** - File upload

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

white Hacker (0xmvmd)

