import Article from './Article.js'
import { fetchAllPosts } from '../services/postService'
import { useEffect } from 'react'
import { set } from 'date-fns'

export function Home({ removeArticle, article, username, imageUrl, posts, setPosts }) {
  useEffect(() => {
    fetchAllPosts().then(setPosts)
  }, [])

  return (
    <div className="container">
      {!posts ? (
        <h2>No Posts Yet</h2>
      ) : (
        posts.map(post => (
          <Article key={post.id} {...post} removeArticle={removeArticle} username={username} imageUrl={imageUrl} />
        ))
      )}
    </div>
  )
}
