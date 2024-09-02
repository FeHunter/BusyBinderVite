import { useState, useEffect } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import style from "./AboutMe.module.css";
import { firebaseRoutes, loadFromtFirebase } from "../assets/Firebase";
import { SliderShow } from "../components/SliderShow/SliderShow";
import { loadFromStorage, loadSliderImages, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";
import { Loading } from "../assets/Loading";

export function AboutMe() {

    const [gallery, setGallery] = useState([])
    const [aboutMeText, setAboutMeText] = useState(null)
    const defaultImage = "./src/Images/no-image.png"

    useEffect(() => {
        loadAboutMeText()
        loadProductImage()
    }, []);

    // Carrega o texto da seção "About Me"
    async function loadAboutMeText() {
        try {
            const data = await loadFromtFirebase(firebaseRoutes.aboutMeTxt, false);
            setAboutMeText(data);
        } catch (error) {
            console.error("Erro ao carregar o texto sobre mim:", error);
        }
    }

    // Carrega a imagem padrão do Firebase Storage
    const [aboutMeImage, setAboutMeImage] = useState(null)
    async function loadProductImage() {
        try {
            const urlImgage = await loadFromStorage(storageLoadRoutes.aboutMeImage);
            console.log(urlImgage)
            setAboutMeImage(urlImgage);
        } catch (error) {
            console.error("Error loading default image:", error);
            return null
        }
    }

    return (
        <>
            <Header />
            <section className={style.aboutMe}>
                <div className={style.presentationContent}>
                    {aboutMeImage ? (
                        <img
                            className={style.presentationImage}
                            src={aboutMeImage ? aboutMeImage : defaultImage}
                            alt="About Me"
                        />
                    ) : (
                        <Loading />
                    )}
                    <div className={style.presentationTextContent}>
                        <h2>A few words about me</h2>
                        {aboutMeText ? (
                            <p style={{ whiteSpace: 'pre-wrap' }}>{aboutMeText.description}</p>
                        ) : (
                            <p><i className="fa-solid fa-gear"></i> working on that...</p>
                        )}
                    </div>
                </div>
                <div className={style.sliderContent}>
                    <h2>Photo Gallery</h2>
                    <SliderShow gallery={true} contentToShow={gallery} />
                </div>
            </section>
            <Footer />
        </>
    );
}
