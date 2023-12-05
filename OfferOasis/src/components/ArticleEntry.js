import { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig.js'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

export default function ArticleEntry({ addArticle, user }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [imageUpload, setImageUpload] = useState(null) // New state for the uploaded file
  const [imageName, setImageName] = useState('') // New state for the image unique identifier
  const [error, setError] = useState(null)

  async function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim() || !imageUpload) {
      setError('Both the title, body, and image must be supplied')
    } else {
      await uploadImage()
    }
  }

  const uploadImage = async () => {
    if (imageUpload == null) return
    const theImageName = `${imageUpload.name + v4()}`
    setImageName(theImageName)
  }

  //adds article only when imageName is updated with the unique identifier
  useEffect(() => {
    if (imageName) {
      const imageRef = ref(storage, `images/${imageName}`)
      uploadBytes(imageRef, imageUpload)
        .then(() => {
          addArticle({ title, body, authorID: user.displayName, imageName })
        })
        .catch(error => {
          alert('Image upload error:', error)
        })
    }
  }, [imageName, title, body, user.displayName, addArticle, imageUpload])

  return (
    <div className="articleEntry">
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} />
        Body
        <textarea rows="8" value={body} onChange={e => setBody(e.target.value)}></textarea>
        Choose an Image to Upload
        <input type="file" id="imgInput" accept=".jpg, .jpeg" onChange={e => setImageUpload(e.target.files[0])} />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
