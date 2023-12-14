import { db } from '../firebaseConfig.js'
import { Offer } from '../Class/Offer.js'
import { uploadFile } from './uploadFileService.js'
import { v4 as uuidv4 } from 'uuid'
import { auth, storage } from '../firebaseConfig.js'
import { ref, getDownloadURL } from 'firebase/storage'
import { collection, getDocs, addDoc, orderBy, deleteDoc, doc } from 'firebase/firestore'

/**
 * Handles the offers
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
  return Object.entries(allOffers).map(([id, data]) => ({ id, ...data }))
}

const offersCollection = collection(db, 'offers')
export async function createOffer(itemName, description, price, offerImage, latitude, longitude) {
  let id = uuidv4()
  let imagePath = await uploadFile(offerImage, id)

  // Need to add a delay until image is registered in storage
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
    alert('Error occurred saving image or doc: ' + error.message)
    throw error
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
