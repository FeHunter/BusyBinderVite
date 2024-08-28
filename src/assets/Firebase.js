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
    socialNetworks: `${root}SocialNetworks.json`,
    contacts: `${root}Contacts.json`,
};

// DEFAULT LOAD PRODUCTS
export async function loadProducts () {
  const responde = await fetch(firebaseRoutes.products, {method: 'GET'});
  const data = await responde.json()
  return convertData(data)
}

// GET - LOAD SOCIAL NETWORKS
export async function getSocialNetWorks () {
  const responde = await fetch(firebaseRoutes.socialNetworks, {method: 'GET'});
  const data = await responde.json()
  return data
  // return convertData(data)
}
// POST - UPDATE SOCIAL NETWORKS
export async function postSocialNetwork (values){
  await fetch(firebaseRoutes.socialNetworks, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(values) 
  }).then ((data)=> {
      if (!data.ok){
          throw new Error(data.status)
      }
  })
  // Reload Page
  setTimeout(() => {
    location.reload()
  }, 1000);
}



// GET - LOAD ABOUT ME TEXT
export async function loadFromtFirebase (routeUrl, callConvertData){
  const response = await fetch(routeUrl)
  const data = await response.json()
  if (callConvertData){
    return convertData(data)
  }
  return data

}
// POST - UPDATE ABOUT ME TEXT
export async function uploadToFirebase (routeUrl, method, values){
  await fetch(routeUrl, {
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(values)
  }).then ((data)=> {
    if (!data.ok){
        throw new Error(data.status)
    }
})
// Reload Page
setTimeout(() => {
  location.reload()
}, 100);
}

/* CONVERT DATA FROM FIREBASE TO ARRAY OF OBJECTS */
function convertData(data) {
  const ids = Object.keys(data);
  const objs = Object.values(data);
  return objs.map((obj, i) => {
    return { id: ids[i], ...obj };
  });
}