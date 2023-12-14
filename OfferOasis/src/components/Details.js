import '../CSS/Details.css'
import { useState } from 'react'
import { Maps } from '../Maps/Maps.js'

/**
 * Displays the details of a offer
 */

export function Details({ goToPage, offerDetails }) {
  const [priceText, setPriceText] = useState('Buy $' + offerDetails.price)

  function setPageToHome() {
    goToPage('home')
  }

  function handleClick() {
    setPriceText('Bought!')
    setTimeout(() => {
      setPriceText('Buy $' + offerDetails.price)
    }, 1500)
  }

  return (
    <div class="detailContainer">
      <header>
        <span id="detailsTitleAndLogo" onClick={setPageToHome}>
          <img src="imgs/Oasis.png" id="headerLogo" alt="logo" width="20px" />
          OfferOasis
        </span>
      </header>
      <div class="leftPane">
        <h2 id="descriptionTitle">Description</h2>
        <article>{offerDetails.description}</article>
      </div>
      <div class="middlePane">
        <h2 id="offerTitle">{offerDetails.itemName}</h2>
        <span id="imageAndButton">
          <img src={offerDetails.imageURL} id="image" alt="post" />
          <button onClick={handleClick} id="buyButton">
            {priceText}
          </button>
        </span>
      </div>
      <div class="rightPane">
        <h2 id="locationTitle">Location</h2>
        <div id="googleMapsWidget">
          <Maps postTitle={offerDetails.title} latitude={offerDetails.latitude} longitude={offerDetails.longitude} />
        </div>
      </div>
    </div>
  )
}
