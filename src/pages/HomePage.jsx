import titleText, { contentText } from "../assets/SiteText";
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
// import { ContactMeForm } from "../components/Forms/AboutMeForm"

/*
LAYOUT:
- Imagens e frase de apresentação
- Produção do autor
- Slider de images
- Avaliações
- Entrar em contato (Perguntas)
*/

export function HomePage (){

    const navigation = useNavigate()
    const [highlightsProducts, setHighlightsProducts] = useState([])

    useEffect(()=>{
        loadCartItems()
        loadHomePage()
    },[])

    // Load Itens from firebase - debugging load from local
    async function loadCartItems () {
        const data = await loadFromtFirebase(firebaseRoutes.products, true)
        // GET ONLY FOUR PRODUCTS
        const highlight = []
        for (let i=0; i < 3; i ++){
            highlight.push(data[i])
        }
        setHighlightsProducts(highlight)
    }

    const [homePage, setHomePage] = useState()
    async function loadHomePage (){
        const data = await loadFromtFirebase(firebaseRoutes.homePage, false)
        setHomePage(data)
    }

    return (
        <>
        <Header/>
        <section className={style.homePage}>
            <PageTitle title={titleText.pageTitle} />
            
            {/* Cover content - ABOUT */}
            <section>
                <div className={style.aboutUsContent}>
                    <div className={style.aboutUsImages}>
                        <ImagesContent src={"./src/Images/no-image.png"} alt={"About us image"} />
                        <ImagesContent src={"./src/Images/no-image.png"} alt={"About us image"} />
                        <ImagesContent src={"./src/Images/no-image.png"} alt={"About us image"} />
                    </div>
                    <div className={style.aboutUsContentText}>
                        <p>{homePage ? homePage.briefPresentation : <></>}</p>
                    </div>
                </div>
            </section>

            {/* highlightsProducts */}
            <section className={style.sliderShowContent}>
                {
                    highlightsProducts ? 
                        highlightsProducts.map((item, index ) => {
                            <ProdcutCard item={item} key={`Product_HightLight_${index}`}  />
                        })
                    :
                        <>loading...</>
                }
            </section>

            {/* My works */}
            <section className={style.highlightsProducts}>
                <div className={style.myWorkContent}>
                    <div className={style.myWorkPhoto}>
                        <img src="./src/Images/no-image.png" />
                    </div>
                    <div className={style.myWorkText}>
                        <h2>My art work</h2>
                        <p>{homePage ? homePage.briefAboutMe  : '...'}</p>
                        <button onClick={()=>{navigation(PagesRoutes.AboutMe)}}>Read more</button>
                    </div>
                    <div className={style.myWorkGallery}>
                        <SliderShow
                            contentToShow={["https://i.pinimg.com/originals/6b/e7/d5/6be7d50e8f41712cb4ba00b6146f83e3.jpg",
                            "https://www.shutterstock.com/shutterstock/photos/44528956/display_1500/stock-vector-collection-of-mexican-stickers-isolated-on-white-44528956.jpg",
                            "/src/Images/aux_book_3.png",
                            "https://tse1.mm.bing.net/th/id/OIP.qrhPfwVDWRGPW0l6zIrH7AHaHa?rs=1&pid=ImgDetMain",
                            "/src/Images/aux_book_2.png",
                            "https://tse2.mm.bing.net/th/id/OIP.j5bVjUSlcHcCYkLjZFzvGwAAAA?rs=1&pid=ImgDetMain"]}
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
        <Footer/>
        </>
    );
}
