import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { renderMarkdown, parseFrontmatter, extractImageReferences } from '../utils/markdownUtils'
import MarkdownViewer from '../components/MarkdownViewer'
import './Blog.css'

function Blog() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showRaw, setShowRaw] = useState(false)

  const handleUploadMarkdownFiles = useCallback(async (uploadedFiles) => {
    const newFiles = []
    
    for (const file of uploadedFiles) {
      if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
        try {
          const text = await readFileAsText(file)
          const { frontmatter, content } = parseFrontmatter(text)
          // Render content without frontmatter to preserve all markdown markers
          // Frontmatter is extracted for metadata display separately
          const contentToRender = frontmatter ? content : text
          const html = renderMarkdown(contentToRender)
          const images = extractImageReferences(text)
          
          const fileData = {
            id: Date.now() + Math.random(),
            filename: file.name,
            raw: text,
            html: html,
            frontmatter: frontmatter,
            images: images,
            uploadDate: new Date().toISOString()
          }
          
          newFiles.push(fileData)
          
          // Show warning if local images found
          if (images.length > 0) {
            console.warn(`Local images found in ${file.name}:`, images)
          }
        } catch (error) {
          console.error(`Error reading file ${file.name}:`, error)
        }
      }
    }
    
    setFiles(prev => [...prev, ...newFiles])
    if (newFiles.length > 0 && !selectedFile) {
      setSelectedFile(newFiles[0])
    }
  }, [selectedFile])

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const onDrop = useCallback((acceptedFiles) => {
    handleUploadMarkdownFiles(acceptedFiles)
  }, [handleUploadMarkdownFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md']
    },
    multiple: true
  })

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleUploadMarkdownFiles(selectedFiles)
  }

  const filteredFiles = files.filter(file => 
    file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (file.frontmatter?.title && file.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="blog">
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>Upload and view Markdown files</p>
      </section>

      <section className="blog-content">
        <div className="blog-upload-section">
          <h2>Upload Markdown Files</h2>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
          >
            <input {...getInputProps()} />
            <input
              type="file"
              accept=".md,.markdown"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-input"
            />
            <div className="dropzone-content">
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <>
                  <p>Drag & drop Markdown files here, or click to select</p>
                  <label htmlFor="file-input" className="btn btn-primary">
                    Select Files
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="blog-list-section">
            <div className="blog-search">
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="blog-layout">
              <div className="blog-file-list">
                <h3>Uploaded Files ({files.length})</h3>
                <ul className="file-list">
                  {filteredFiles.map(file => (
                    <li
                      key={file.id}
                      className={`file-item ${selectedFile?.id === file.id ? 'active' : ''}`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <span className="file-name">{file.filename}</span>
                      {file.frontmatter?.title && (
                        <span className="file-title">{file.frontmatter.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-viewer">
                {selectedFile && (
                  <>
                    <div className="viewer-header">
                      <h3>{selectedFile.filename}</h3>
                      <button
                        onClick={() => setShowRaw(!showRaw)}
                        className="btn btn-secondary"
                      >
                        {showRaw ? 'Show Rendered' : 'Show Raw'}
                      </button>
                    </div>
                    <MarkdownViewer
                      file={selectedFile}
                      showRaw={showRaw}
                    />
                  </>
                )}
                {!selectedFile && (
                  <div className="no-file-selected">
                    <p>Select a file to view its content</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {files.length === 0 && (
          <div className="empty-state">
            <p>No files uploaded yet. Upload a Markdown file to get started.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Blog

