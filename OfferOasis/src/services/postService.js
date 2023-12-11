import { Post } from '../Post'
import { db } from '../firebaseConfig'
import { collection, query, getDocs, addDoc, orderBy, limit, Timestamp, deleteDoc, doc } from 'firebase/firestore'
import { auth, storage } from '../firebaseConfig.js'
import { ref, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { uploadFile } from './uploadFileService.js'

/**
 * fetches all posts in the "posts" collection
 */
export async function fetchAllPosts() {
  const allPosts = []
  const querySnapshot = await getDocs(collection(db, 'posts'), orderBy('date', 'desc'))
  querySnapshot.forEach(doc => {
    let data = doc.data()
    allPosts.push(new Post(doc.id, data.userName, data.body, data.date, data.postImage, data.title))
  })
  console.log(Object.entries(allPosts).map(([id, data]) => ({ id, ...data })))
  return Object.entries(allPosts).map(([id, data]) => ({ id, ...data }))
}

const postsCollection = collection(db, 'posts')

export async function createPost(title, body, postImage) {
  // As this is just fake data for messing around, we'll throw in a quick
  // and unreliable database id. In a real app, the id should be generated
  // by the database itself (or you can use UUIDs).
  //save nft to firebase
  let imagePath = await uploadFile(postImage)
  //delay until image is registered in firebase
  await new Promise(resolve => setTimeout(resolve, 10000))

  getDownloadURL(ref(storage, imagePath))
    .then(async url => {
      await addDoc(postsCollection, {
        id: uuidv4(),
        userName: auth.currentUser.displayName,
        title: title,
        body: body,
        postImage: url,
        date: new Date()
      })
        .then(function (docRef) {
          console.log('url ' + url)
          console.log('new doc ' + docRef.id)
        })
        .catch(function (firebaseError) {
          alert('error occured saving doc: ' + firebaseError.message)
        })
    })
    .catch(error => {
      // Handle any errors
      console.log('error from firebase ' + error)
      alert('error occured saving image: ' + error)
    })

  return { id: Math.random(), title, body, postImage, date: new Date() }
}
