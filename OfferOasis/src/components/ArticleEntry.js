import { useState } from 'react'
import { createPost } from '../services/postService'

export default function ArticleEntry({ setWritingFalse }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUpload, setImageUpload] = useState() // New state for the uploaded file
  const [error, setError] = useState(null)

  async function createNewPost(e) {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !body.trim() || !imageUpload) {
      setError('Both the title, body, and image must be supplied')
    } else {
      createPost(title, body, imageUpload)
    }
  }

  function cancelPosting(e) {
    e.preventDefault()
    setWritingFalse()
  }

  return (
    <div className="articleEntry">
      <form onSubmit={createNewPost}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} />
        Body
        <textarea rows="8" value={body} onChange={e => setBody(e.target.value)}></textarea>
        Choose an Image to Upload
        <input type="file" id="imgInput" accept=".png, .jpg, .jpeg" onChange={e => setImageUpload(e.target.files[0])} />
        <button id="createButton" onClick={createNewPost}>
          Create
        </button>
        <button id="backButton" onClick={cancelPosting}>
          Back
        </button>
      </form>
    </div>
  )
}
