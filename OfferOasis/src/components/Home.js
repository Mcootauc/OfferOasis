import '../CSS/Home.css'
import SingleOffer from './SingleOffer.js'
import { fetchAllOffers } from '../services/offerService.js'
import { useEffect } from 'react'

/**
 * Displays the home page
 */

export function Home({ goToPage, changeToDetails, removeOffer, username, offers, setOffers }) {
  useEffect(() => {
    fetchAllOffers().then(setOffers)
  }, [])

  return (
    <div id="homeContainer" className="grid">
      {offers.length === 0 ? (
        <h2>No Offers Yet</h2>
      ) : (
        offers.map(offer => (
          <SingleOffer
            key={offer.id}
            {...offer}
            goToPage={goToPage}
            changeToDetails={changeToDetails}
            removeOffer={removeOffer}
            username={username}
          />
        ))
      )}
    </div>
  )
}
