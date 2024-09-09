import { useState, useEffect } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import style from "./AboutMe.module.css";
import { firebaseRoutes, loadFromtFirebase } from "../assets/Firebase";
import { SliderShow } from "../components/SliderShow/SliderShow";
import { loadAllImagesFromFolder, loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";
import { Loading } from "../assets/Loading";

export function AboutMe() {

    const [gallery, setGallery] = useState([])
    const [aboutMeText, setAboutMeText] = useState(null)
    const defaultImage = "./src/Images/no-image.png"

    useEffect(() => {
        loadAboutMeText()
        loadProductImage()
        loadGallary()
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
    async function loadGallary(params) {
        try {
            const data = await loadAllImagesFromFolder(storageLoadRoutes.sliderAboutMe);
            // Extrai apenas os caminhos dos objetos recebidos
            const paths = data.map(item => item.url);
            console.log(paths)
            // Define o estado com os caminhos extraídos
            setGallery(paths);
        } catch (error) {
            console.error("Erro ao carregar galeria:", error);
        }
    }

    // Carrega a imagem padrão do Firebase Storage
    const [aboutMeImage, setAboutMeImage] = useState(null)
    async function loadProductImage() {
        try {
            const urlImage = await loadFromStorage(storageLoadRoutes.aboutMeImage)
            if (urlImage){
                setAboutMeImage(urlImage)
            }
        } catch (error) {
            console.error("Error loading default image:", error)
        }
    }

    return (
        <>
            <Header />
            <section className={style.aboutMe}>
                <div className={style.presentationContent}>
                    <img
                        className={style.presentationImage}
                        src={aboutMeImage ? aboutMeImage : defaultImage}
                        alt="Busy binder About Me Image"
                    />
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
