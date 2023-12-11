import Article from './Article.js'
import { fetchAllPosts } from '../services/postService'
import { useEffect } from 'react'
import '../CSS/Home.css'
import { set } from 'date-fns'

export function Home({ removeArticle, username, posts, setPosts }) {
  useEffect(() => {
    fetchAllPosts().then(setPosts)
    console.log(
      posts.map(post => <Article key={post.id} {...post} removeArticle={removeArticle} username={username} />)
    )
  }, [])

  return (
    <div id="homeContainer" className="grid">
      {!posts ? (
        <h2>No Posts Yet</h2>
      ) : (
        posts.map(post => <Article key={post.id} {...post} removeArticle={removeArticle} username={username} />)
      )}
    </div>
  )
}
