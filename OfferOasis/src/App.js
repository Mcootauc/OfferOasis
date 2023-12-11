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
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
      console.log(posts)
    }
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  async function addArticle({ title, body, authorID, imageName }) {
    await createArticle({ title, body, authorID, imageName }).then(article => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  async function removeArticle(articleId) {
    const outcome = await deleteArticle(articleId)
    if (!outcome) {
      return
    }
    //removes article from the articles array
    const newArticle = articles.filter(article => article.id !== articleId)
    //resets the react state to say "No article selected"
    setArticle(null)
    setArticles(newArticle)

    //removes image from storage
    const desertRef = ref(storage, `images/${article.imageName}`)
    deleteObject(desertRef)
      .then(() => {})
      .catch(error => {
        alert('Image upload error:', error)
      })
  }

  return (
    <div className="App">
      <header>
        OfferOasis
        {user && <button onClick={() => setWriting(true)}>New Post</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>
      {!user ? (
        ''
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} user={user} />
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
