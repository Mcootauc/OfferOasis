import { useState } from 'react'
import { createPost } from '../services/postService'
import Loading from './Loading'

export default function ArticleEntry({ setWritingFalse }) {
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUpload, setImageUpload] = useState() // New state for the uploaded file
  const [error, setError] = useState(null)
  const [promiseInProgress, setPromiseInProgress] = useState(false)

  async function createNewPost(e) {
    e.preventDefault()
    setError(null)
    if (!itemName.trim() || !description.trim() || price.length === 0 || !imageUpload) {
      setError('All parameters must be supplied!')
      return
    }
    setPromiseInProgress(true)
    await createPost(itemName, description, price, imageUpload)
    setPromiseInProgress(false)
    setWritingFalse()
  }

  function cancelPosting(e) {
    e.preventDefault()
    setWritingFalse()
  }
  if (promiseInProgress) {
    return <img src="../../imgs/loading.gif" id="postImage" alt="Porchita" width="137px" />
  } else {
    return (
      <div className="articleEntry">
        <form onSubmit={createNewPost}>
          {error && <p className="error">{error}</p>}
          Item Name
          <input id="productName" value={itemName} onChange={e => setItemName(e.target.value)} />
          Description
          <textarea
            id="description"
            rows="8"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          Price
          <input id="price" value={price} onChange={e => setPrice(e.target.value)} />
          Choose an Image to Upload
          <input
            id="imgInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => setImageUpload(e.target.files[0])}
          />
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
}
