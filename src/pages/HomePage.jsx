import Slider from "react-slick";
import titleText, { contentText } from "../assets/SiteText";
import { Header } from "../components/Header/Header";
import { ImagesContent } from "../components/ImagesContent/ImagesContent";
import { PageTitle } from "../components/PageTitle/PageTitle";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import style from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { SliderShow } from "../components/SliderShow/SliderShow";

export function HomePage (){

    const [allItems, setAllItems] = useState([])
    const [cartItems, setCartItems] = useState([])

    useEffect(()=>{
        loadCartItems()
    },[])

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/RegisterItems.json")
        .then(response => response.json())
        .then(json => setAllItems(json));
    }

    // Add item to the cart
    const addItemToCart = (item) => {
        let update = [cartItems];
        // Item obj
        const newItem = {
            id: item.id,
            type: item.type,
            name: item.name,
            price: item.price,
            img: item.img,
        }
        update.push(newItem)
        setCartItems(update)
    }

    return (
        <>
        <Header/>
        <section className={style.homePage}>
            <PageTitle title={titleText.pageTitle} />
            
            {/* Cover content - ABOUT */}
            <section>
                <div className={style.aboutUsContent}>
                    <ImagesContent src={"./src/Images/About_Pic.jpg"} alt={"About us image"} />
                    <p>{contentText.aboutUS}</p>
                </div>
            </section>

            {/* products Highlights */}
            <section className={style.highlightsProducts}>
                {
                    allItems ?
                        allItems.map((item, index) => {
                            return <ProdcutCard
                                key={`Product_Card_${index}`}
                                item={item}
                                addToCartFunc={()=>{addItemToCart(item)}}
                            />
                        })
                    :
                    <></>
                }
            </section>

            {/* My works */}
            <section className={style.highlightsProducts}>
                <div className={style.myWorkContent}>
                    <div className={style.myWorkPhoto}>
                        <img src="./src/Images/About_Pic.jpg" />
                    </div>
                    <div className={style.myWorkText}>
                        <h2>My art work</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio esse odit non ad blanditiis illo quidem tenetur culpa deleniti, voluptates corporis ullam ea minus eos odio, nesciunt nisi unde quisquam.</p>
                    </div>
                    <div className={style.myWorkGallery}>
                        <p>fotos</p>
                    </div>
                </div>
            </section>

            {/* Slider Show */}
            <section className={style.sliderShowContent}>
                {
                    allItems ? 
                        <SliderShow contentToShow={allItems}/>
                    :
                        <></>
                }
            </section>

        </section>
        <Footer/>
        </>
    );
}
