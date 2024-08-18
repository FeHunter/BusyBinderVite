import style from "./ProductPage.module.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ButtonToBuy } from "../components/Buttons/Buttons";
import { useEffect, useState } from "react";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import { useParams } from "react-router-dom";

export function ProductPage (){

    const { id } = useParams();

    const [allItems, setAllItems] = useState(null)
    const [product, setProduct] = useState({})

    useEffect(()=>{
        loadProduct()
        loadSimilarProducts()
    },[])

    // Load Requested product
    const loadProduct = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(p => setProduct(p[id-1]))
    }

    // Load Similar products - only 4 Itens from firebase - debugging load from local
    const loadSimilarProducts = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(json => {
            const randomStart = Math.floor(Math.random() * (json.length - 4)); 
            let onlyFor = []
            for (let i= randomStart; i < randomStart + 4; i++){
                onlyFor.push(json[i])
            }
            setAllItems(onlyFor)
        })
    }

    return (
        <>
            <Header/>
            <section className={style.productPage}>
                {/* Product Informations */}
                <div className={style.headerInformations}>
                    <img
                        className={style.productImage}
                        src={product.img}
                        alt={`${product.name}_imagem`} 
                    />
                    <div className={style.productInformation}>
                        <div>
                            <p>{product.type}</p>
                            <p>{product.name}</p>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                        </div>
                        <div className={style.productActionsContent}>
                            <input type="number" min="1" placeholder="amt" />
                            <ButtonToBuy label={"Buy"} />
                        </div>
                    </div>
                    
                </div>
                {/* Product Images */}
                <div className={style.imagesContent}>
                    <div className={style.allImagesContent}>
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
                        width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`nome_do_produto_imagem`} 
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