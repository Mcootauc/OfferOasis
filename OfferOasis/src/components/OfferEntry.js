import '../CSS/OfferEntry.css'
import Loading from './Loading.js'
import { useState } from 'react'
import { createOffer } from '../services/offerService'
import { setKey, setLanguage, fromAddress, setLocationType } from 'react-geocode'

/**
 * Handles the offer entry page
 */

export default function OfferEntry({ setWritingFalse }) {
  const [error, setError] = useState(null)
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [itemName, setItemName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUpload, setImageUpload] = useState()
  const [promiseInProgress, setPromiseInProgress] = useState(false)

  // Set Google Maps Geocoding API
  setKey('AIzaSyCa1tGEne5TA_U1ILd3sYSrhH9K95V3Pes')

  // Set response language
  setLanguage('en')

  // set location_type filter
  setLocationType('ROOFTOP')

  async function createNewOffer(e) {
    e.preventDefault()
    setError(null)
    if (hasParameters()) {
      setError('All parameters must be supplied!')
      return
    }
    setPromiseInProgress(true)
    await fromAddress(address).then(
      async response => {
        const { lat, lng } = response.results[0].geometry.location
        await createOffer(itemName, description, price, imageUpload, lat, lng)
      },
      error => {
        console.error(error)
      }
    )
    setPromiseInProgress(false)
    setWritingFalse()
  }

  function hasParameters() {
    return !itemName.trim() || !description.trim() || price.length === 0 || address.length === 0 || !imageUpload
  }

  function cancelOffer(e) {
    e.preventDefault()
    setWritingFalse()
  }

  if (promiseInProgress) {
    return <Loading />
  } else {
    return (
      <div className="offerEntry">
        <form onSubmit={createNewOffer}>
          {error && <p className="error">{error}</p>}
          <p>Item Name</p>
          <input
            id="productName"
            placeholder="e.g: Desk"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
          <p>Description</p>
          <textarea
            id="description"
            placeholder="e.g: This is a great item!"
            rows="7"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <p>Price</p>
          <input id="price" placeholder="e.g: 100" value={price} onChange={e => setPrice(e.target.value)} />
          <p>Pickup Address</p>
          <textarea
            id="pickupAddress"
            placeholder="e.g: 1 LMU Drive, 90045, CA"
            rows={2}
            cols={200}
            type="text"
            onChange={e => setAddress(e.target.value)}
          />
          <p>Choose an Image to Upload</p>
          <input
            id="imgInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => setImageUpload(e.target.files[0])}
          />
          <div id="buttons">
            <button id="cancelButton" onClick={cancelOffer}>
              Delete
            </button>
            <button id="createButton" onClick={createNewOffer}>
              Create
            </button>
          </div>
        </form>
      </div>
    )
  }
}
