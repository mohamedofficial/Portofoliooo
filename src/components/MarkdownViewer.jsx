import './MarkdownViewer.css'

function MarkdownViewer({ file, showRaw }) {
  if (!file) return null

  if (showRaw) {
    return (
      <div className="markdown-viewer">
        <div className="raw-view">
          <pre className="raw-content">
            <code>{file.raw}</code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="markdown-viewer">
      {file.frontmatter && Object.keys(file.frontmatter).length > 0 && (
        <div className="frontmatter">
          <h4>Metadata</h4>
          <ul className="frontmatter-list">
            {Object.entries(file.frontmatter).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {file.images && file.images.length > 0 && (
        <div className="image-warning">
          <p>⚠️ Local image references found:</p>
          <ul>
            {file.images.map((img, index) => (
              <li key={index}>{img}</li>
            ))}
          </ul>
          <p>Please upload images separately or use external URLs.</p>
        </div>
      )}
      
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  )
}

export default MarkdownViewer

