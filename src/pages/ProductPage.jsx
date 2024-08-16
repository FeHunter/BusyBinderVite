import style from "./ProductPage.module.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ButtonToBuy } from "../components/Buttons/Buttons";
import { useEffect, useState } from "react";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";

export function ProductPage (){

    const [allItems, setAllItems] = useState(null);

    useEffect(()=>{
        loadCartItems()
    },[])

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/RegisterItems.json")
        .then(response => response.json())
        .then(json => setAllItems(json))
        .then(r => limitedProducts(4))
    }

    const limitedProducts = (maxItems) => {
        let onlyFor = [];
        for (let i=0; i < maxItems; i++){
            onlyFor.push(allItems[i]);
        }
        setAllItems(onlyFor);
    }

    return (
        <>
            <Header/>
            <section className={style.productPage}>
                {/* Product Informations */}
                <div className={style.headerInformations}>
                    <img
                        className={style.productImage}
                        src="./src/Images/aux_book_1.png"
                        alt={`nome_do_produto_imagem`} 
                    />
                    <div className={style.productInformation}>
                        <p>Type</p>
                        <p>$50</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, provident! Consectetur accusantium ratione quod ullam voluptate nobis fugiat temporibus quos. Ad expedita illo, nam dolorem dolore nihil omnis alias ipsam?
                        </p>
                        <div>
                            <input type="number" min={'1'} />
                            <ButtonToBuy label={"Buy"} />
                        </div>
                    </div>
                    
                </div>
                {/* Product Images */}
                <div className={style.imagesContent}>
                    <div className={style.allImagesContent}>
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="./src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                    </div>
                </div>
                {/* Similar Products */}
                <div className={style.similarProductsContent}>
                    <h2>Similar Products</h2>
                    <div className={style.productsContent}>
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
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}