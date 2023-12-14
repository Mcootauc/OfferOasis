import { Offer } from '../Class/Offer.js'
import { db } from '../firebaseConfig.js'
import { collection, getDocs, addDoc, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { auth, storage } from '../firebaseConfig.js'
import { ref, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { uploadFile } from './uploadFileService.js'

/**
 * fetches all offers in the "offers" collection
 */
export async function fetchAllOffers() {
  const allOffers = []
  const querySnapshot = await getDocs(collection(db, 'offers'), orderBy('date', 'desc'))
  querySnapshot.forEach(doc => {
    let data = doc.data()
    allOffers.push(
      new Offer(
        doc.id,
        data.userName,
        data.description,
        data.price,
        data.date,
        data.offerImage,
        data.imageName,
        data.itemName,
        data.latitude,
        data.longitude
      )
    )
  })
  console.log(Object.entries(allOffers).map(([id, data]) => ({ id, ...data })))
  return Object.entries(allOffers).map(([id, data]) => ({ id, ...data }))
}

const offersCollection = collection(db, 'offers')
export async function createOffer(itemName, description, price, offerImage, latitude, longitude) {
  // As this is just fake data for messing around, we'll throw in a quick
  // and unreliable database id. In a real app, the id should be generated
  // by the database itself (or you can use UUIDs).
  //save nft to firebase
  let id = uuidv4()
  let imagePath = await uploadFile(offerImage, id)

  //delay until image is registered in firebase
  await new Promise(resolve => setTimeout(resolve, 2000))

  try {
    const url = await getDownloadURL(ref(storage, imagePath))

    const docRef = await addDoc(offersCollection, {
      userName: auth.currentUser.displayName,
      itemName: itemName,
      description: description,
      price: price,
      offerImage: url,
      imageName: id,
      date: new Date(),
      latitude: latitude,
      longitude: longitude
    })
    return { id: docRef.id, itemName, description, price, offerImage: url, imageName: id, date: new Date() }
  } catch (error) {
    console.error('Error from firebase: ', error)
    alert('Error occurred saving image or doc: ' + error.message)
    throw error // Re-throw the error if you want to handle it elsewhere
  }
}

export async function deleteOffer(offerID) {
  try {
    await deleteDoc(doc(db, 'offers', offerID))
  } catch (e) {
    alert('Error removing document: ', e)
    return false
  }
  return true
}
