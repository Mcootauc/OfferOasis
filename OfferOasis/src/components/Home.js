import Article from './Article.js'
import { fetchAllPosts } from '../firebaseServices/postService'
import { useEffect } from 'react'

export function Home(removeArticle, article, username, imageUrl, setPosts) {
  useEffect(() => {
    fetchAllPosts().then(setPosts)
  }, [])

  return (
    <div className="container">
      <Article removeArticle={removeArticle} article={article} username={username} imageUrl={imageUrl} />
    </div>
  )
}
