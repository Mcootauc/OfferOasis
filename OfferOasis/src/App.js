import './CSS/App.css'
import OfferEntry from './components/OfferEntry.js'
import { Home } from './components/Home.js'
import { Details } from './components/Details.js'
import { storage } from './firebaseConfig.js'
import { useState } from 'react'
import { deleteOffer } from './services/offerService.js'
import { ref, deleteObject } from 'firebase/storage'
import { SignIn, SignOut, useAuthentication } from './services/authService.js'

export default function App() {
  const [offers, setOffers] = useState([])
  const [writing, setWriting] = useState(false)
  const [page, setPage] = useState('home')
  const [offerDetails, setDetails] = useState(null)
  const user = useAuthentication()

  function setWritingFalse() {
    setWriting(false)
  }

  function changeToDetails(offer) {
    setDetails(offer)
  }

  function goToPage(goTo) {
    setPage(goTo)
  }

  async function removeOffer(offerID, imageName) {
    const outcome = await deleteOffer(offerID)
    if (!outcome) {
      return
    }

    // Removes offer from the offers array
    const newOffer = offers.filter(offer => offer.id !== offerID)

    // Resets the react state to say "No Offers Yet"
    setOffers(newOffer)

    // Removes image from storage
    const desertRef = ref(storage, `images/${imageName}`)
    deleteObject(desertRef)
      .then(() => {})
      .catch(error => {
        alert('Image upload error:', error)
      })
  }
  if (page === 'home') {
    return (
      <div className="App">
        <header>
          <span id="titleAndLogo">
            <img src="imgs/Oasis.png" id="headerLogo" alt="logo" width="20px" />
            OfferOasis
          </span>
          {user && (
            <button id="newOfferButton" onClick={() => setWriting(true)}>
              New Offer
            </button>
          )}
          {!user ? <SignIn /> : <SignOut />}
        </header>
        {!user ? (
          <h1 id="noUserText">Sign in to buy or sell Products!</h1>
        ) : writing ? (
          <OfferEntry setWritingFalse={setWritingFalse} user={user} />
        ) : (
          <Home
            goToPage={goToPage}
            changeToDetails={changeToDetails}
            removeOffer={removeOffer}
            username={user.displayName}
            offers={offers}
            setOffers={setOffers}
          />
        )}
      </div>
    )
  } else if (page === 'details') {
    return (
      <div className="App">
        <Details goToPage={goToPage} offerDetails={offerDetails} />
      </div>
    )
  }
}
