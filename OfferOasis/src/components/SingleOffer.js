import '../CSS/SingleOffer.css'
import { formatRelative, isValid } from 'date-fns'
import { Offer } from '../Class/Offer'

/**
 * Displays the details of a single offer
 */

export default function SingleOffer({
  id,
  authorID,
  description,
  price,
  date,
  imageURL,
  itemName,
  imageName,
  latitude,
  longitude,
  goToPage,
  changeToDetails,
  removeOffer,
  username
}) {
  const offerDate = date.toDate()
  const formattedDate = isValid(offerDate) ? formatRelative(offerDate, new Date()) : ''

  function setToDetails() {
    changeToDetails(
      new Offer(id, authorID, description, price, date, imageURL, imageName, itemName, latitude, longitude)
    )
    goToPage('details')
  }

  const handleDelete = async () => {
    await removeOffer(id, imageName)
  }

  return (
    <article id="singleArticle">
      <section id="singleOffer" onClick={setToDetails}>
        <h2>{itemName}</h2>
        <img src={imageURL} id="offerImage" alt="offerImage" />
        <p className="price">{`$${price}`}</p>
        <p className="date">{`Posted: ${formattedDate}`}</p>
        <p className="author">
          Made by <span className="authorID">{authorID ?? 'anonymous'}</span>
        </p>
      </section>
      {username === authorID ? <button onClick={handleDelete}>Delete</button> : ''}
    </article>
  )
}
