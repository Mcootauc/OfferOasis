import SingleOffer from './SingleOffer.js'
import { fetchAllOffers } from '../services/offerService.js'
import { useEffect } from 'react'
import '../CSS/Home.css'

export function Home({ goToPage, changeToDetails, removeOffer, username, offers, setOffers }) {
  useEffect(() => {
    fetchAllOffers().then(setOffers)
    console.log(
      offers.map(offer => (
        <SingleOffer key={offer.id} {...offer} goToPage={goToPage} removeOffer={removeOffer} username={username} />
      ))
    )
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
