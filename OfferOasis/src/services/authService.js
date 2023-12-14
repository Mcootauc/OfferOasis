import '../CSS/App.css'
import { auth } from '../firebaseConfig'
import { useState, useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

/**
 * Handles the Sign in, Sign out, and Authentication
 */

export function SignIn() {
  return <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}>Sign In</button>
}

export function SignOut() {
  return (
    <div id="displayName">
      Hello, {auth.currentUser.displayName} &nbsp;
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  )
}

export function useAuthentication() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null)
    })
  }, [])
  return user
}
