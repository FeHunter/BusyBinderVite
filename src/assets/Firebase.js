// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQfTeBCoSZLbMNOEsitbOfZSSKM-hbmuk",
  authDomain: "busybinder-b494f.firebaseapp.com",
  projectId: "busybinder-b494f",
  storageBucket: "busybinder-b494f.appspot.com",
  messagingSenderId: "901115992266",
  appId: "1:901115992266:web:74d835c51f76b9c103fc33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/*
Create datebase:
https://busybinder-b494f-default-rtdb.firebaseio.com/
*/

const root = "https://busybinder-b494f-default-rtdb.firebaseio.com/"

export const firebaseRoutes = {
    products: root+'ProductsList',
    aboutMeTxt: root+'AboutMeText',
    instagramLink: root+'InstagramLink',
    facebookLink: root+'FacebookLink',
    tiktokLink: root+'TiktokLink',
    phone1: root+'Phone1',
    phone2: root+'Phone2',
    email: root+'Email',
}