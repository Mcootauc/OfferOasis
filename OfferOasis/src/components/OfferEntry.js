import { useState } from 'react'
import { createOffer } from '../services/offerService'
import { setKey, setLanguage, fromAddress, setLocationType } from 'react-geocode'
import Loading from './Loading.js'

export default function OfferEntry({ setWritingFalse }) {
  const [itemName, setItemName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUpload, setImageUpload] = useState() // New state for the uploaded file
  const [error, setError] = useState(null)
  const [promiseInProgress, setPromiseInProgress] = useState(false)

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  setKey('AIzaSyCa1tGEne5TA_U1ILd3sYSrhH9K95V3Pes')

  // set response language. Defaults to english.
  setLanguage('en')

  // set location_type filter . Its optional.
  // google geocoder returns more that one address for given lat/lng.
  // In some case we need one address as response for which google itself provides a location_type filter.
  // So we can easily parse the result for fetching address components
  // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
  // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
  setLocationType('ROOFTOP')

  async function createNewOffer(e) {
    e.preventDefault()
    setError(null)
    if (!itemName.trim() || !description.trim() || price.length === 0 || address.length === 0 || !imageUpload) {
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
          Pickup Address
          <textarea
            id="pickupAddress"
            placeholder="e.g 1 LMU Drive, 90045, CA"
            rows={3}
            cols={200}
            type="text"
            onChange={e => setAddress(e.target.value)}
            required
          />
          Choose an Image to Upload
          <input
            id="imgInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => setImageUpload(e.target.files[0])}
          />
          <div id="buttons">
            <button id="createButton" onClick={createNewOffer}>
              Create
            </button>
            <button id="cancelButton" onClick={cancelOffer}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }
}
