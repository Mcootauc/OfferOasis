import { formatRelative, isValid } from 'date-fns'
import '../CSS/Article.css'

export default function Article({ id, authorID, body, price, date, imageURL, title, removeArticle, username }) {
  const articleDate = date.toDate()
  const formattedDate = isValid(articleDate) ? formatRelative(articleDate, new Date()) : ''

  const handleDelete = async () => {
    await removeArticle(id)
  }

  return (
    <article>
      <section>
        <h2>{title}</h2>
        {!imageURL ? (
          <img src="./img/loading.gif" id="postImage" alt="postedImage" width="137px" />
        ) : (
          <img src={imageURL} id="postImage" alt="postImage" />
        )}
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
