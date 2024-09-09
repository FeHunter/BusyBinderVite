// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-2Tk85fwpl1hcf4cboQjFWQ-f_a2UUR0",
  authDomain: "testes-2998d.firebaseapp.com",
  databaseURL: "https://testes-2998d-default-rtdb.firebaseio.com",
  projectId: "testes-2998d",
  storageBucket: "testes-2998d.appspot.com",
  messagingSenderId: "368784317342",
  appId: "1:368784317342:web:9b6406fdcf56aa8168548f"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Define Firebase routes
const root = "https://testes-2998d-default-rtdb.firebaseio.com/"
// busyBinder: https://busybinder-b494f-default-rtdb.firebaseio.com/
// test: https://testes-2998d-default-rtdb.firebaseio.com/

export const firebaseRoutes = {
    homePage: `${root}HomePageInformations.json`,
    products: `${root}ProductsList.json`,
    aboutMeTxt: `${root}AboutMeText.json`,
    socialNetworks: `${root}SocialNetworks.json`,
    contacts: `${root}Contacts.json`,
};


// Inicialize o Storage
const storage = getStorage(app);
export { storage };


// DEFAULT LOAD PRODUCTS
export async function loadProducts () {
  const responde = await fetch(firebaseRoutes.products, {method: 'GET'});
  const data = await responde.json()
  if (responde.ok){
    return convertData(data)
  }
  return null
}

// GET - LOAD SOCIAL NETWORKS
export async function getSocialNetWorks () {
  const response = await fetch(firebaseRoutes.socialNetworks, {method: 'GET'});
  const data = await response.json()
  if (response.ok){
    return data
  }
  return null
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
  if (response.ok){
    if (callConvertData){
      return convertData(data)
    }
    return data
  }
  return null
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
        toast("Something went wrong, try again!")
        throw new Error(data.status)
    }else {
      toast("Success!")
    }
})
}

/* CONVERT DATA FROM FIREBASE TO ARRAY OF OBJECTS */
function convertData(data) {
  if (data){
    const ids = Object.keys(data);
    const objs = Object.values(data);
    return objs.map((obj, i) => {
      return { id: ids[i], ...obj };
    });
  }
}