import '../CSS/Details.css'
import { useState } from 'react'

/**
 * View shows details about a post
 */

export function Details({ goToPage, offerDetails }) {
  const [buttonText, setButtonText] = useState('Buy $' + offerDetails.price)

  function setPageToHome() {
    goToPage('home')
  }

  function handleClick() {
    setButtonText('Bought!')
    setTimeout(() => {
      setButtonText('Buy $' + offerDetails.price)
    }, 1500)
  }

  return (
    <div class="container">
      <header>
        <span id="titleAndLogo">
          <img src="imgs/Oasis.png" id="headerLogo" alt="logo" width="20px" />
          OfferOasis
        </span>
        <button onClick={setPageToHome} id="backButton">
          Back
        </button>
      </header>
      <div class="leftpane">
        <h2 id="descriptionTitle">Description</h2>
        <article>{offerDetails.description}</article>
      </div>
      <div class="middlepane">
        <h2 id="offerTitle">{offerDetails.itemName}</h2>
        <img src={offerDetails.imageURL} id="image" alt="post" />
        <button onClick={handleClick} id="buyButton">
          {buttonText}
        </button>
      </div>
      <div class="rightpane">
        {/* <div id="googleMapsWidget">
          <MapContainer
            postTitle={offerDetails.itemName}
            latitude={offerDetails.latitude}
            longitude={offerDetails.longitude}
          />
        </div> */}
        <h2 id="locationTitle">Location</h2>
        <h2 id="widget">Insert Widget Here</h2>
      </div>
    </div>
  )
}
