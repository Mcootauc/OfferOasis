import { storage } from '../firebaseConfig.js'
import { ref, uploadBytesResumable } from 'firebase/storage'

/**
 * Handles uploading files to Storage
 */

export async function uploadFile(file, id) {
  const metadata = {
    contentType: 'image/jpeg'
  }

  let imagePath = 'images/' + id
  const storageRef = ref(storage, imagePath)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  uploadTask.on(
    'state_changed',
    snapshot => {
      // Gets the task progress, including the number of bytes uploaded and the
      // total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          console.log('Upload is running')
          break
      }
    },
    error => {
      switch (error.code) {
        case 'storage/unauthorized':
          break
        case 'storage/canceled':
          break
        case 'storage/unknown':
          break
      }
    }
  )
  return imagePath
}
