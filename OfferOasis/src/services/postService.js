import { Post } from '../Post'

const { db } = require('../firebase/firebaseConfig')
const { collection, getDocs } = require('firebase/firestore')

/**
 * fetches all posts in the "posts" collection
 */
export async function fetchAllPosts() {
  const allPosts = []
  const querySnapshot = await getDocs(collection(db, 'articles'), orderBy('date', 'desc'))
  querySnapshot.forEach(doc => {
    let data = doc.data()
    allPosts.push(new Post(doc.id, data.authorID, data.body, data.date, data.imageName, data.title))
  })
  return Object.entries(allPosts).map(([id, data]) => ({ id, ...data }))
}
