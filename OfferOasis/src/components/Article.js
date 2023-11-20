import { formatRelative, isValid } from 'date-fns'
import { likeArticle } from '../services/articleService'

export default function Article({ removeArticle, article, username, imageUrl }) {
  const articleDate = article?.date.toDate()
  const formattedDate = isValid(articleDate) ? formatRelative(articleDate, new Date()) : ''

  const handleDelete = async () => {
    await removeArticle(article.id)
  }

  const handleLike = async () => {
    await likeArticle(article.id, username)
  }

  return (
    <article>
      {!article ? (
        <p>No post selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          {!imageUrl ? (
            <img src="./img/loading.gif" id="postImage" alt="Porchita" width="137px" />
          ) : (
            <img src={imageUrl} id="postImage" alt="postImage" />
          )}
          <div>
            <button onClick={handleLike}>Like</button>
            {!article.likesCount ? '' : <p>{article.likesCount} Like/s</p>}
          </div>
          <p className="date">{`Posted: ${formattedDate}`}</p>
          <p className="author">
            Made by <span className="authorID">{article.authorID ?? 'anonymous'}</span>
          </p>
          <p className="body">{article.body}</p>
          {username === article.authorID ? <button onClick={handleDelete}>Delete</button> : ''}
        </section>
      )}
    </article>
  )
}
