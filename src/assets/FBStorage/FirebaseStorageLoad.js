import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase';
import { useEffect } from 'react';

const rootUrl = "gs://testes-2998d.appspot.com/"
export const storageUploaddRoutes = {
    defaultFolder: `${rootUrl}Default`,
    pagesImages: `${rootUrl}ImagesForPages`,
    productsImages: `${rootUrl}ProductsImages`,
}
export const storageLoadRoutes = {
    defaultImage: `${rootUrl}Default/no-image.png`,
    presentationImage1: `${storageUploaddRoutes.pagesImages}/HomePageImg1.png`,
    presentationImage2: `${storageUploaddRoutes.pagesImages}/HomePageImg2.png`,
    presentationImage3: `${storageUploaddRoutes.pagesImages}/HomePageImg3.png`,
    myWorkCoverImage: `${storageUploaddRoutes.pagesImages}/MyWorkCoverImage.png`,
    aboutMeImage: `${storageUploaddRoutes.pagesImages}/AboutMePageImage.png`,
    productsImages: `${storageUploaddRoutes.productsImages}/`,
    sliderHomePage: `${storageUploaddRoutes.pagesImages}/HomePageSlider`,
    sliderAboutMe: `${storageUploaddRoutes.pagesImages}/AboutMeSlider`,
}

/* LOAD STORAGE */
export async function loadFromStorage(route) {
    const imageRef = ref(storage, route);
    const localStorageUrl = localStorage.getItem(route);

    // if localstorage was the file return it
    if (localStorageUrl) {
        return localStorageUrl;
    }
    // if not load from serve
    if (!localStorageUrl){
        const url = await getDownloadURL(imageRef);
        try {
            localStorage.setItem(route, url);
            return url;
        } catch (error) {
            return null;
        }
    }
}

/* UPLOAD IMAGE TO */
export async function uploadToStorage(file, fileName, route) {
    try {
        if (file) {
            const storageRef = ref(storage, `${route}/${fileName}.png`)
            await uploadBytes(storageRef, file, { contentType: 'image/png' })
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

/* LOAD IMAGES TO SLIDER */
export async function loadSliderImages(route) {
    const refload = ref(storage, storageLoadRoutes.sliderAboutMe)

    const url = await getDownloadURL(refload)
    console.log(url)
}

