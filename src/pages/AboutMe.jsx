import { useState } from "react"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import style from "./AboutMe.module.css"
import { firebaseRoutes, loadFromtFirebase } from "../assets/Firebase"
import { useEffect } from "react"
import { SliderShow } from "../components/SliderShow/SliderShow"
import { loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad"
import { Loading } from "../assets/Loading"

export function AboutMe (){

    const [storageImages, setStorageImages] = useState({});
    const [gallery, setGallery] = useState([])

    useEffect(()=>{
        loadAboutMeText()
        loadDefaultImage()
    },[])

    // ABOUT ME TEXT
    const [aboutMeText, setAboutMeText] = useState(null)
    async function loadAboutMeText (){
        const data = await loadFromtFirebase(firebaseRoutes.aboutMeTxt, false)
        setAboutMeText(data)
    }

    // Load default image from Firebase Storage
    const defaultImage = "./src/Images/no-image.png"
    async function loadDefaultImage() {
        try {
            const aboutMeImage = await loadFromStorage(storageLoadRoutes.aboutMeImage);
            setStorageImages((prev) => ({ ...prev, aboutMeImage: aboutMeImage }));
        } catch (error) {
            console.error("Error loading default image:", error);
        }
    }


    return (
        <>
            <Header/>
            <section className={style.aboutMe}>
                <div className={style.presentationContent}>
                    {storageImages.aboutMeImage ? <img className={style.presentationImage} src={storageImages.aboutMeImage ? storageImages.aboutMeImage : defaultImage} alt="busy binder image" /> : <Loading/>}
                    <div className={style.presentationTextContent}>
                        <h2>A few words about me</h2>
                        {
                            aboutMeText ?
                                <p style={{ whiteSpace: 'pre-wrap' }}>{aboutMeText.description}</p>
                            :
                                <p><i class="fa-solid fa-gear"></i> working on that...</p>
                        }
                    </div>
                </div>
                <div className={style.sliderContent}>
                    <h2>Photo Gallery</h2>
                    <SliderShow gallery={true} contentToShow={gallery} />
                </div>
            </section>
            <Footer/>
        </>
    )
}