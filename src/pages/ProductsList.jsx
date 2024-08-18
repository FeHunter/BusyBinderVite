import { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import style from "./ProductsList.module.css";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import { ButtonListChange } from "../components/Buttons/Buttons";

export function ProductsList (){

    const MAXTOSHOW = 8;
    const [listPosition, setListPosition] = useState(0);
    const [loadedList, setLoadedList] = useState([]);
    const [products, setProducts] = useState([]);

    const [filter, setFilter] = useState("default");

    useEffect(() => {
        loadCartItems();
    }, []);

    useEffect(() => {
        if (loadedList.length > 0) {
            showProducts();
        }
    }, [loadedList]);

    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(json => setLoadedList(json))
        .finally(() => showProducts());
    }

    const showProducts = () => {
        let toShow = [];
        for (let i = listPosition; i < listPosition + MAXTOSHOW && i < loadedList.length; i++) {
            toShow.push(loadedList[i]);
        }
        setProducts(toShow);
    }

    useEffect(() => {
        applyFilter(filter);
    }, [filter]);

    const applyFilter = (term) => {
        let toFilter = [...loadedList]; // clone the list of products

        if (term.toLowerCase() === "lastpost") {
            toFilter = toFilter.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        } else if (term.toLowerCase() === "highprice") {
            toFilter = toFilter.sort((a, b) => b.price - a.price);
        } else if (term.toLowerCase() === "lowprice") {
            toFilter = toFilter.sort((a, b) => a.price - b.price);
        } 

        if (term !== "default") {
            setProducts(toFilter.slice(0, MAXTOSHOW));
        } else {
            showProducts();
        }
    };

    return (
        <>
            <Header/>
            <section className={style.productsList}>
                {/* Header - Filter params */}
                <div className={style.headerContent}>
                    <h2>Albums</h2>
                    <select className={style.selectionButton} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="popularity">Popularity</option>
                        <option value="lastpost">Last post</option>
                        <option value="lowprice">Low price</option>
                        <option value="highprice">High price</option>
                    </select>
                </div>
                {/* Product List */}
                <div className={style.listContent}>
                {
                    products.length > 0 ?
                        products.map((item, index) => {
                            return <ProdcutCard
                                key={`Product_Card_${index}`}
                                item={item}
                                addToCartFunc={() => addItemToCart(item)}
                            />
                        })
                    :
                    <></>
                }
                </div>
                {/* List Control */}
                <div className={style.listNavegationButtons}>
                    <ButtonListChange label={"1"} />
                    <ButtonListChange label={"2"} />
                    <ButtonListChange label={"3"} />
                </div>
            </section>
            <Footer/>
        </>
    )
}
