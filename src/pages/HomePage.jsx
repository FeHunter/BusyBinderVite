import { Header } from "../components/Header/Header";
import { ImagesContent } from "../components/ImagesContent/ImagesContent";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import style from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { SliderShow } from "../components/SliderShow/SliderShow";
import { firebaseRoutes, loadFromtFirebase } from "../assets/Firebase";
import { GetInTouchForm } from "../components/Forms/GetInTouchForm/GetInTouchForm";
import PagesRoutes from "../assets/PagesRoutes";
import { useNavigate } from "react-router-dom";
import { loadAllImagesFromFolder, loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";
import { Loading } from "../assets/Loading";

/*
LAYOUT:
- Imagens e frase de apresentação
- Produção do autor
- Slider de images
- Avaliações
- Entrar em contato (Perguntas)
*/

export function HomePage() {
    
    const navigate = useNavigate();

    const [highlightsProducts, setHighlightsProducts] = useState([]);
    const [storageImages, setStorageImages] = useState({});
    const [homePage, setHomePage] = useState();
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        loadCartItems()
        loadHomePage()
        loadDefaultImage()
        loadGallary()
    }, []);

    // Load Items from Firebase
    async function loadCartItems() {
        const data = await loadFromtFirebase(firebaseRoutes.products, true);
        if (data){
            const highlight = data.slice(0, 3); // Get only the first 3 products
            setHighlightsProducts(highlight);
        }
    }

    // Load Home Page Data
    async function loadHomePage() {
        const data = await loadFromtFirebase(firebaseRoutes.homePage, false);
        setHomePage(data);
    }

    // load slider gallery
    async function loadGallary(params) {
        try {
            const data = await loadAllImagesFromFolder(storageLoadRoutes.sliderHomePage);
            // Extrai apenas os caminhos dos objetos recebidos
            const paths = data.map(item => item.url);
            console.log(paths)
            // Define o estado com os caminhos extraídos
            setGallery(paths);
        } catch (error) {
            console.error("Erro ao carregar galeria:", error);
        }
    }

    // Load default image from Firebase Storage
    const defaultImage = "./src/Images/no-image.png"
    async function loadDefaultImage() {
        try {
            const urlImg1 = await loadFromStorage(storageLoadRoutes.presentationImage1);
            const urlImg2 = await loadFromStorage(storageLoadRoutes.presentationImage2);
            const urlImg3 = await loadFromStorage(storageLoadRoutes.presentationImage3);
            const myWorkCoverImage = await loadFromStorage(storageLoadRoutes.myWorkCoverImage);
            setStorageImages((prev) => ({ ...prev, presentationImage1: urlImg1, presentationImage2: urlImg2, presentationImage3: urlImg3, myWorkCoverImage: myWorkCoverImage }));
        } catch (error) {
            console.error("Error loading default image:", error);
        }
    }

    return (
        <>
            <Header />
            <section className={style.homePage}>
                <PageTitle title={"Busy Binder"} />
                {/* Cover content - ABOUT */}
                <section>
                    <div className={style.aboutUsContent}>
                        <div className={style.aboutUsImages}>
                            <ImagesContent src={storageImages.length > 0 ? storageImages.presentationImage1 : defaultImage} alt={"BusyBinder image 1"} />
                            <ImagesContent src={storageImages.length > 0 ? storageImages.presentationImage2 : defaultImage} alt={"BusyBinder image 2"} />
                            <ImagesContent src={storageImages.length > 0 ? storageImages.presentationImage3 : defaultImage} alt={"BusyBinder image 3"} />
                        </div>
                        <div className={style.aboutUsContentText}>
                            <p>{homePage ? homePage.briefPresentation : <></>}</p>
                        </div>
                    </div>
                </section>

                {/* Highlights Products */}
                <section className={style.highlightsProducts}>
                    {highlightsProducts.length > 0 ? (
                        highlightsProducts.map((item, index) => (
                            <ProdcutCard item={item} key={`Product_HighLight_${index}`} />
                        ))
                    ) : (
                        <Loading/>
                    )}
                </section>

                {/* My Works */}
                <section className={style.highlightsProducts}>
                    <div className={style.myWorkContent}>
                        <div className={style.myWorkPhoto}>
                            <img src={storageImages.length > 0 ? storageImages.myWorkCoverImage : defaultImage} alt="My Work image" />
                        </div>
                        <div className={style.myWorkText}>
                            <h2>My art work</h2>
                            <p>{homePage ? homePage.briefAboutMe : '...'}</p>
                            <button onClick={() => navigate(PagesRoutes.AboutMe)}>Read more</button>
                        </div>
                        <div className={style.myWorkGallery}>
                            <SliderShow
                                contentToShow={gallery}
                                gallery={true}
                            />
                        </div>
                    </div>
                </section>

                {/* Ask a Question */}
                <section className={style.GetInTouchArea}>
                    <GetInTouchForm />
                </section>
            </section>
            <Footer />
        </>
    );
}
