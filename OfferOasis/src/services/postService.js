import { Post } from '../Post'
import { db } from '../firebaseConfig'
import { collection, getDocs, addDoc, orderBy } from 'firebase/firestore'
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
    allPosts.push(
      new Post(
        doc.id,
        data.userName,
        data.description,
        data.price,
        data.date,
        data.postImage,
        data.imageName,
        data.itemName
      )
    )
  })
  console.log(Object.entries(allPosts).map(([id, data]) => ({ id, ...data })))
  return Object.entries(allPosts).map(([id, data]) => ({ id, ...data }))
}

const postsCollection = collection(db, 'posts')

export async function createPost(itemName, description, price, postImage) {
  // As this is just fake data for messing around, we'll throw in a quick
  // and unreliable database id. In a real app, the id should be generated
  // by the database itself (or you can use UUIDs).
  //save nft to firebase
  let id = uuidv4()
  let imagePath = await uploadFile(postImage, id)

  //delay until image is registered in firebase
  await new Promise(resolve => setTimeout(resolve, 2000))

  try {
    const url = await getDownloadURL(ref(storage, imagePath))

    const docRef = await addDoc(postsCollection, {
      userName: auth.currentUser.displayName,
      itemName: itemName,
      description: description,
      price: price,
      postImage: url,
      imageName: id,
      date: new Date()
    })
    return { id: docRef.id, itemName, description, price, postImage: url, imageName: id, date: new Date() }
  } catch (error) {
    console.error('Error from firebase: ', error)
    alert('Error occurred saving image or doc: ' + error.message)
    throw error // Re-throw the error if you want to handle it elsewhere
  }
}
