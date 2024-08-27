import { useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
export const app = initializeApp(firebaseConfig);

// Define Firebase routes
const root = "https://testes-2998d-default-rtdb.firebaseio.com/"
// busyBinder: https://busybinder-b494f-default-rtdb.firebaseio.com/
// test: https://testes-2998d-default-rtdb.firebaseio.com/

export const firebaseRoutes = {
    products: `${root}ProductsList.json`,
    aboutMeTxt: `${root}AboutMeText.json`,
    instagramLink: `${root}InstagramLink.json`,
    facebookLink: `${root}FacebookLink.json`,
    tiktokLink: `${root}TiktokLink.json`,
    phones: `${root}Phones.json`,
    email: `${root}Email.json`,
};

// DEFAULT LOAD PRODUCTS
export async function loadProducts () {
  const responde = await fetch(firebaseRoutes.products, {method: 'GET'});
  const data = await responde.json()
  return convertData(data)

  // const responde = await fetch(firebaseRoutes.products, {method: 'GET'})
  // .then(res => res.json())
  // .then(products =>  setReturnProducts(convertData(products)))
}

/* CONVERT DATA FROM FIREBASE TO ARRAY OF OBJECTS */
function convertData(data) {
  const ids = Object.keys(data);
  const objs = Object.values(data);
  return objs.map((obj, i) => {
    return { id: ids[i], ...obj };
  });
}