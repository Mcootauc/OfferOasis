import { v4 as uuidv4 } from 'uuid'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebaseConfig.js'

/**
 * Function uploads file to firebase storage.
 * @param {*} file : the file to upload
 * @param {*} setDownloadUrl : a function that sets the download url
 * @param {*} setUploadError: useState function that sets the error, if any, that
 * occured during upload
 */
export async function uploadFile(file, id) {
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg'
  }

  let imagePath = 'images/' + id
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, imagePath)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break
        case 'storage/canceled':
          // User canceled the upload
          break

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break
      }
    }
  )
  return imagePath
}
