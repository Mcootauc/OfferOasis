import { useEffect, useState } from 'react'
import Article from './components/Article.js'
import ArticleEntry from './components/ArticleEntry.js'
import { SignIn, SignOut, useAuthentication } from './services/authService.js'
import { fetchArticles, createArticle, deleteArticle } from './services/articleService.js'
import { storage } from './firebaseConfig.js'
import { ref, deleteObject, getDownloadURL } from 'firebase/storage'
import './CSS/App.css'
import { Home } from './components/Home.js'

export default function App() {
  const [articles, setArticles] = useState([])
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  function setWritingFalse() {
    setWriting(false)
  }

  async function removeArticle(postId, imageName) {
    const outcome = await deleteArticle(postId)
    if (!outcome) {
      return
    }
    //removes article from the articles array
    const newPost = posts.filter(post => post.id !== postId)
    //resets the react state to say "No article selected"
    setPosts(newPost)

    //removes image from storage
    const desertRef = ref(storage, `images/${imageName}`)
    deleteObject(desertRef)
      .then(() => {})
      .catch(error => {
        alert('Image upload error:', error)
      })
  }

  return (
    <div className="App">
      <header>
        <span id="titleName">OfferOasis</span>
        {user && <button onClick={() => setWriting(true)}>New Post</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>
      {!user ? (
        ''
      ) : writing ? (
        <ArticleEntry setWritingFalse={setWritingFalse} user={user} />
      ) : (
        <Home
          removeArticle={removeArticle}
          article={article}
          username={user.displayName}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    </div>
  )
}
