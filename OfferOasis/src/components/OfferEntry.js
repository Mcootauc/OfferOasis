import { useState } from 'react'
import { createOffer } from '../services/offerService'
import Loading from './Loading'

export default function OfferEntry({ setWritingFalse }) {
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUpload, setImageUpload] = useState() // New state for the uploaded file
  const [error, setError] = useState(null)
  const [promiseInProgress, setPromiseInProgress] = useState(false)

  async function createNewOffer(e) {
    e.preventDefault()
    setError(null)
    if (!itemName.trim() || !description.trim() || price.length === 0 || !imageUpload) {
      setError('All parameters must be supplied!')
      return
    }
    setPromiseInProgress(true)
    await createOffer(itemName, description, price, imageUpload)
    setPromiseInProgress(false)
    setWritingFalse()
  }

  function cancelOffer(e) {
    e.preventDefault()
    setWritingFalse()
  }

  if (promiseInProgress) {
    return <img src="../../imgs/loading.gif" id="offerImage" alt="Porchita" width="137px" />
  } else {
    return (
      <div className="offerEntry">
        <form onSubmit={createNewOffer}>
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
          <button id="createButton" onClick={createNewOffer}>
            Create
          </button>
          <button id="backButton" onClick={cancelOffer}>
            Back
          </button>
        </form>
      </div>
    )
  }
}
