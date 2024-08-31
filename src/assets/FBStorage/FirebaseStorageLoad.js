import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase';

const rootUrl = "gs://testes-2998d.appspot.com/"
export const storageUploaddRoutes = {
    defaultFolder: `${rootUrl}Default`,
    HomePageFolder: `${rootUrl}HomePageImages`,
}
export const storageLoadRoutes = {
    defaultImage: `${rootUrl}Default/no-image.png`,
    presentationImage1: `${rootUrl}${storageUploaddRoutes.HomePageFolder}/HomePageImg1`,
    presentationImage2: `${rootUrl}${storageUploaddRoutes.HomePageFolder}/HomePageImg2`,
    presentationImage3: `${rootUrl}${storageUploaddRoutes.HomePageFolder}/HomePageImg3`,
}

/* LOAD STORAGE IMAGES */
export async function loadFromStorage(route) {
    const imageRef = ref(storage, route);
    try {
      const url = await getDownloadURL(imageRef);
    //   console.log("loaded URL: " + url);
      return url
    } catch (error) {
      console.error("Erro ao carregar a URL: ", error);
      throw error
    }
}

/* UPLOAD IMAGE TO STORAGE */
export async function uploadToStorage(file, fileName, route) {
    if (file) {
        const storageRef = ref(storage, `${route}/${fileName}.jpeg`)
        await uploadBytes(storageRef, file, { contentType: 'image/jpeg' })
        .then((snapshot) => {
            console.log('Uploaded a blob or file!');
        })
        .catch(error => {
            console.log("Error: " + error)
        })
    }
}

