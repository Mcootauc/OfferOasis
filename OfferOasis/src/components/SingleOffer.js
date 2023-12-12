import { formatRelative, isValid } from 'date-fns'
import '../CSS/SingleOffer.css'

export default function SingleOffer({
  id,
  authorID,
  description,
  price,
  date,
  imageURL,
  itemName,
  imageName,
  removeOffer,
  username
}) {
  const offerDate = date.toDate()
  const formattedDate = isValid(offerDate) ? formatRelative(offerDate, new Date()) : ''

  const handleDelete = async () => {
    await removeOffer(id, imageName)
  }

  return (
    <article>
      <section>
        <h2>{itemName}</h2>
        <img src={imageURL} id="offerImage" alt="offerImage" />
        <p className="price">{`$${price}`}</p>
        <p className="date">{`Posted: ${formattedDate}`}</p>
        <p className="author">
          Made by <span className="authorID">{authorID ?? 'anonymous'}</span>
        </p>
        {username === authorID ? <button onClick={handleDelete}>Delete</button> : ''}
      </section>
    </article>
  )
}
