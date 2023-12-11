import { formatRelative, isValid } from 'date-fns'
import '../CSS/Article.css'

export default function Article({ id, authorID, body, date, imageURL, title, removeArticle, username }) {
  const articleDate = date.toDate()
  const formattedDate = isValid(articleDate) ? formatRelative(articleDate, new Date()) : ''

  const handleDelete = async () => {
    await removeArticle(id)
  }

  const showImageUrl = () => {
    console.log('lets go:' + imageURL)
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
        <p className="date">{`Posted: ${formattedDate}`}</p>
        <p className="author">
          Made by <span className="authorID">{authorID ?? 'anonymous'}</span>
        </p>
        <p className="body">{body}</p>
        {username === authorID ? <button onClick={handleDelete}>Delete</button> : ''}
        <button onClick={showImageUrl}>bruh</button>
      </section>
    </article>
  )
}
