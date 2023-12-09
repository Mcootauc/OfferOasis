import Article from './Article.js'
import ArticleEntry from './ArticleEntry.js'
import { useEffect } from 'react'

export function Home(addArticle, removeArticle, article, username, writing, imageUrl) {
  useEffect(() => {
    console.log(username)
  }, [])
  return (
    <div className="container">
      <Article removeArticle={removeArticle} article={article} username={username} imageUrl={imageUrl} />
    </div>
  )
}
