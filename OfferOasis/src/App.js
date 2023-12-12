import { useState } from 'react'
import OfferEntry from './components/OfferEntry.js'
import { SignIn, SignOut, useAuthentication } from './services/authService.js'
import { deleteOffer } from './services/offerService.js'
import { storage } from './firebaseConfig.js'
import { ref, deleteObject } from 'firebase/storage'
import './CSS/App.css'
import { Home } from './components/Home.js'

export default function App() {
  const [offers, setOffers] = useState([])
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  function setWritingFalse() {
    setWriting(false)
  }

  async function removeOffer(offerID, imageName) {
    const outcome = await deleteOffer(offerID)
    if (!outcome) {
      return
    }

    //removes offer from the offers array
    const newOffer = offers.filter(offer => offer.id !== offerID)

    //resets the react state to say "No Offers Yet"
    setOffers(newOffer)

    //removes image from storage
    const desertRef = ref(storage, `images/${imageName}`)
    deleteObject(desertRef)
      .then(() => {})
      .catch(error => {
        alert('Image upload error:', error)
      })
  }

  return (
    <div className="App">
      <header>
        <span id="titleName">OfferOasis</span>
        {user && <button onClick={() => setWriting(true)}>New Offer</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>
      {!user ? (
        ''
      ) : writing ? (
        <OfferEntry setWritingFalse={setWritingFalse} user={user} />
      ) : (
        <Home removeOffer={removeOffer} username={user.displayName} offers={offers} setOffers={setOffers} />
      )}
    </div>
  )
}
