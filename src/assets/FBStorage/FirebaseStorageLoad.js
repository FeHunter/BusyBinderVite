import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase';

const rootUrl = "gs://testes-2998d.appspot.com/"
export const storageUploaddRoutes = {
    defaultFolder: `${rootUrl}Default`,
    pagesImages: `${rootUrl}ImagesForPages`,
}
export const storageLoadRoutes = {
    defaultImage: `${rootUrl}Default/no-image.png`,
    presentationImage1: `${storageUploaddRoutes.pagesImages}/HomePageImg1.jpeg`,
    presentationImage2: `${storageUploaddRoutes.pagesImages}/HomePageImg2.jpeg`,
    presentationImage3: `${storageUploaddRoutes.pagesImages}/HomePageImg3.jpeg`,
    myWorkCoverImage: `${storageUploaddRoutes.pagesImages}/MyWorkCoverImage.jpeg`,
    aboutMeImage: `${storageUploaddRoutes.pagesImages}/AboutMePageImage.jpeg`,
}

/* LOAD STORAGE IMAGES */
export async function loadFromStorage(route) {
    const imageRef = ref(storage, route);
    try {
      const url = await getDownloadURL(imageRef);
    //   console.log("loaded URL: " + url);
      return url
    } catch (error) {
      console.error("Erro to donwload: ", error);
      return null
    }
}

/* UPLOAD IMAGE TO STORAGE */
export async function uploadToStorage(file, fileName, route) {
    try {
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
    }catch(error){
        console.log("Erro to upload: " + error)
    }
}

