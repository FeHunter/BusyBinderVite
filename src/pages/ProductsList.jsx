import { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import style from "./ProductsList.module.css";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";

export function ProductsList (){

    const MAXTOSHOW = 8;
    const [listPosition, setListPosition] = useState(0);
    const [loadedList, setLoadedList] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(()=>{
        loadCartItems()
    },[])

    useEffect(()=>{
        if (loadedList != null){
            showProducts()
        }
    },[loadedList])

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(json => setLoadedList(json))
        .finally (()=> showProducts)
    }

    const showProducts = () =>{
        let toShow = [];
        for (let i=listPosition; i < (listPosition+MAXTOSHOW); i++){
            toShow.push(loadedList[i]);
        }
        setProducts(toShow);
    }

    return (
        <>
            <Header/>
            <section className={style.productsList}>
                {/* Header - Filter params */}
                <div className={style.headerContent}>
                    <h2>Albums</h2>
                </div>
                {/* Product List */}
                <div className={style.listContent}>
                {
                    products ?
                        products.map((item, index) => {
                            return <ProdcutCard
                                key={`Product_Card_${index}`}
                                item={item}
                                addToCartFunc={()=>{addItemToCart(item)}}
                            />
                        })
                    :
                    <></>
                }
                </div>
                {/* List Control */}
                <div>

                </div>
            </section>
            <Footer/>
        </>
    )
}