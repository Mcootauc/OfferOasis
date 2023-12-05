// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from '../firebaseConfig'
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  increment
} from 'firebase/firestore'

export async function createArticle({ title, body, authorID, imageName }) {
  const data = { title, body, date: Timestamp.now(), authorID, imageName }
  const docRef = await addDoc(collection(db, 'articles'), data)
  return { id: docRef.id, ...data }
}

const PAGE_SIZE = 20
export async function fetchArticles() {
  const snapshot = await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc'), limit(PAGE_SIZE)))
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function deleteArticle(articleID) {
  try {
    await deleteDoc(doc(db, 'articles', articleID))
  } catch (e) {
    alert('Error removing document: ', e)
    return false
  }
  return true
}
