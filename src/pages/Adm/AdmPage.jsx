import {  useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./AdmPage.module.css";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { SocialMediaForm } from "../../components/Forms/SocialMediaForm/SocialMediaForm";
import { AboutMeForm } from "../../components/Forms/AboutMeForm/AboutMeForm";
import { ButtonAdmHeader } from "../../components/Buttons/Buttons";
import { firebaseRoutes, loadFromtFirebase, uploadToFirebase } from "../../assets/Firebase";
import { ContactsForm } from "../../components/Forms/ContactsForm/ContactsForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PagesRoutes from "../../assets/PagesRoutes";

export function AdmPage() {

    const navigate = useNavigate()
    const [visible, setVisible] = useState(0);

    useEffect(()=>{
        loadAboutMeText()
        socialNetworksLinks()
        loadContacts()
    }, [visible])

    // SAVE ON FIREBASE NEW ITEM
    async function addNewProduct (product) {
        try {
            await fetch(firebaseRoutes.products, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(product)
            })
            .then ((data)=> {
                if (!data.ok){
                    toast("Something went wrong, try again!")
                    throw new Error(data.status)
                }
                data.json()
                toast("Success!")
            })
            .finally (() => {
                setTimeout(() => {
                    navigate(PagesRoutes.ProductsList)
                }, 1000);
            })
        }catch (erro){
            console.log(erro)
        }
    }

    // SOCIAL MEDIA LINKS
    const [socialNetworks, setSocialNetworks] = useState()
    async function socialNetworksLinks (){
        const data = await loadFromtFirebase(firebaseRoutes.socialNetworks, false)
        setSocialNetworks(data)
    }
    function uploadSocialNetworks (values){
        uploadToFirebase(firebaseRoutes.socialNetworks, 'PUT', values)
    }

    // ABOUT ME TEXT
    const [aboutMeText, setAboutMeText] = useState()
    async function loadAboutMeText (){
        const data = await loadFromtFirebase(firebaseRoutes.aboutMeTxt, false)
        setAboutMeText(data)
    }
    function uploadAboutMeText (values){
        uploadToFirebase(firebaseRoutes.aboutMeTxt, 'PUT', values)
    }

    // CONTACTS
    const [contacts, setContacts] = useState()
    async function loadContacts () {
        const data = await loadFromtFirebase(firebaseRoutes.contacts, false)
        setContacts(data)
    }
    async function uploadContacts (values){
        uploadToFirebase(firebaseRoutes.contacts, 'PUT', values)
    }
    
    return (
        <>
            <ToastContainer/>
            <Header />
            <section className={style.admPage}>
                <div className={style.buttonArea}>
                    <ButtonAdmHeader onClick={() => setVisible(0)} label={<><i class="fa-solid fa-house"></i>Home Page</>} />
                    <ButtonAdmHeader onClick={() => setVisible(1)} label={<><i class="fa-solid fa-bag-shopping"></i>Add new Product</>} />
                    <ButtonAdmHeader onClick={() => setVisible(2)} label={<><i class="fa-solid fa-share-nodes"></i>Social Links</>} />
                    <ButtonAdmHeader onClick={() => setVisible(3)} label={<><i class="fa-regular fa-address-card"></i>About me</>} />
                    <ButtonAdmHeader onClick={() => setVisible(4)} label={<><i class="fa-regular fa-envelope"></i>Contacts</>} />
                </div>
                <div className={style.formsArea}>
                    {visible === 0 && (
                        <>
                            <p className={style.formTitle}><i class="fa-solid fa-house"></i> Register new product</p>
                            <h2>Home page settings</h2>
                            <p>Fotos Inicias</p>
                            <p>Texto apresentação</p>
                            <p>Images sobre o autor</p>
                            <p>Texto sobre o autor</p>
                        </>
                    )}
                    {visible === 1 && (
                        <>
                            <p className={style.formTitle}><i class="fa-solid fa-bag-shopping"></i> Register new product</p>
                            <AddItemForm addNewProduct={addNewProduct} />
                        </>
                    )}
                    {visible === 2 && (
                        <>
                            <p className={style.formTitle}><i class="fa-solid fa-share-nodes"></i> Social Links</p>
                            <SocialMediaForm
                                initialValues={socialNetworks ? {instagram: socialNetworks.instagram, facebook: socialNetworks.facebook, tiktok: socialNetworks.tiktok} : {instagram: '', facebook: '', tiktok: ''}}
                                getValues={uploadSocialNetworks}
                            />
                        </>
                    )}
                    {visible === 3 && (
                        <>
                            <p className={style.formTitle}><i class="fa-regular fa-address-card"></i> About Me</p>
                            <AboutMeForm
                                initialValues={aboutMeText ? { description: aboutMeText.description, photosGallery: aboutMeText.photosGallery } : { description: '', photosGallery: [] }}
                                readValues={uploadAboutMeText}
                            />
                        </>
                    )}
                    {visible === 4 && (
                        <>
                            <p className={style.formTitle}><i class="fa-regular fa-envelope"></i> Contacts</p>
                            <ContactsForm
                                initialValues={contacts ? { email: contacts.email, phone1: contacts.phone1, phone2: contacts.phone2 } : { email: '', phone1: '', phone2: '' }}
                                readValues={uploadContacts}
                            />
                        </>
                    )}
                </div>
            </section>
            <Footer/> 
        </>
    );
}
