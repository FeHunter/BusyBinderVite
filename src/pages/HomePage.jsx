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

    const [allItems, setAllItems] = useState(null);
    const [cartItems, setCartItems] = useState(null);

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

            {/* Slider Show */}
            <section className={style.sliderShowContent}>
                <SliderShow contentToShow={allItems}/>
            </section>

        </section>
        <Footer/>
        </>
    );
}
