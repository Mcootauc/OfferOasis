// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOH4PsXGq1N5UD41guHjPijTRd-U2aJSA',
  authDomain: 'offeroasis-190de.firebaseapp.com',
  projectId: 'offeroasis-190de',
  storageBucket: 'offeroasis-190de.appspot.com',
  messagingSenderId: '394166920002',
  appId: '1:394166920002:web:b3698e2d90b7752e725edb'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, app, storage }
