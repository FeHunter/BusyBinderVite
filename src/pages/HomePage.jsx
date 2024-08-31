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
import { loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";

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

    useEffect(() => {
        loadCartItems();
        loadHomePage();
        loadDefaultImage();
    }, []);

    // Load Items from Firebase
    async function loadCartItems() {
        const data = await loadFromtFirebase(firebaseRoutes.products, true);
        const highlight = data.slice(0, 3); // Get only the first 3 products
        setHighlightsProducts(highlight);
    }

    // Load Home Page Data
    async function loadHomePage() {
        const data = await loadFromtFirebase(firebaseRoutes.homePage, false);
        setHomePage(data);
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
                            <ImagesContent src={storageImages.presentationImage1 ? storageImages.presentationImage1 : defaultImage} alt={"BusyBinder image 1"} />
                            <ImagesContent src={storageImages.presentationImage2 ? storageImages.presentationImage2 : defaultImage} alt={"BusyBinder image 2"} />
                            <ImagesContent src={storageImages.presentationImage3 ? storageImages.presentationImage3 : defaultImage} alt={"BusyBinder image 3"} />
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
                        <>loading...</>
                    )}
                </section>

                {/* My Works */}
                <section className={style.highlightsProducts}>
                    <div className={style.myWorkContent}>
                        <div className={style.myWorkPhoto}>
                            <img src={storageImages.myWorkCoverImage ? storageImages.myWorkCoverImage : defaultImage} alt="My Work image" />
                        </div>
                        <div className={style.myWorkText}>
                            <h2>My art work</h2>
                            <p>{homePage ? homePage.briefAboutMe : '...'}</p>
                            <button onClick={() => navigate(PagesRoutes.AboutMe)}>Read more</button>
                        </div>
                        <div className={style.myWorkGallery}>
                            <SliderShow
                                contentToShow={[
                                    "https://i.pinimg.com/originals/6b/e7/d5/6be7d50e8f41712cb4ba00b6146f83e3.jpg",
                                    "https://www.shutterstock.com/shutterstock/photos/44528956/display_1500/stock-vector-collection-of-mexican-stickers-isolated-on-white-44528956.jpg",
                                    "/src/Images/aux_book_3.png",
                                    "https://tse1.mm.bing.net/th/id/OIP.qrhPfwVDWRGPW0l6zIrH7AHaHa?rs=1&pid=ImgDetMain",
                                    "/src/Images/aux_book_2.png",
                                    "https://tse2.mm.bing.net/th/id/OIP.j5bVjUSlcHcCYkLjZFzvGwAAAA?rs=1&pid=ImgDetMain"
                                ]}
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
